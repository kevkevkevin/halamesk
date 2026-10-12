import "./style.css";
import "./projects.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, Flip);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const searchParams = new URLSearchParams(location.search);
const localPreview = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const motionPreview = localPreview || searchParams.has("motion-preview");
const allowsMotion = !prefersReducedMotion || motionPreview;
if (motionPreview) document.documentElement.classList.add("motion-preview");

document.querySelector("#year").textContent = new Date().getFullYear();

const lenis = new Lenis({
  duration: 1.25,
  smoothWheel: allowsMotion,
  wheelMultiplier: .88,
  touchMultiplier: 1.1,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const loaderCount = document.querySelector(".loader__count");
const loaderLine = document.querySelector(".loader__line span");
let siteEntered = false;

function enterSite() {
  if (siteEntered) return;
  siteEntered = true;
  const progress = { value: 0 };
  const timeline = gsap.timeline({ defaults: { ease: "power4.inOut" } });

  timeline
    .to(progress, {
      value: 100,
      duration: .28,
      ease: "power2.inOut",
      onUpdate: () => {
        loaderCount.textContent = String(Math.round(progress.value)).padStart(3, "0");
        gsap.set(loaderLine, { width: `${progress.value}%` });
      },
    })
    .to(".loader__meta", { y: -16, opacity: 0, duration: .34 })
    .to(".loader__word", { yPercent: 16, opacity: 0, duration: .42 }, "<")
    .to(".loader", { clipPath: "inset(0 0 100% 0)", duration: .72 })
    .from(".projects-hero__media img", { scale: 1.24, duration: 1.15 }, "-=.58")
    .from(".projects-hero__copy h1 i", { yPercent: 115, duration: .78, stagger: .085 }, "-=.92")
    .from(".projects-hero .eyebrow, .projects-hero__topline, .projects-hero__arabic, .projects-hero__scroll", {
      opacity: 0,
      y: 16,
      duration: .52,
      stagger: .045,
    }, "-=.52")
    .set(".loader", { display: "none" })
    .call(() => ScrollTrigger.refresh());
}

const heroImage = document.querySelector(".projects-hero__media img");
const heroReady = heroImage?.complete ? Promise.resolve() : new Promise((resolve) => {
  if (!heroImage) { resolve(); return; }
  heroImage.addEventListener("load", resolve, { once: true });
  heroImage.addEventListener("error", resolve, { once: true });
});

Promise.race([
  heroReady,
  new Promise((resolve) => window.setTimeout(resolve, 320)),
]).then(enterSite);

ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (self) => gsap.set(".page-progress span", { scaleX: self.progress }),
});

const filterButtons = [...document.querySelectorAll(".project-filter__buttons button")];
const projectCards = [...document.querySelectorAll(".archive-card")];
const resultCount = document.querySelector(".project-filter__result span");
const validFilters = new Set(filterButtons.map((button) => button.dataset.filter));
let activeFilter = validFilters.has(searchParams.get("filter")) ? searchParams.get("filter") : "all";
let filterLocked = false;

function cardMatches(card, filter) {
  return filter === "all" || card.dataset.categories.split(" ").includes(filter);
}

function updateFilterUrl(filter) {
  const url = new URL(location.href);
  if (filter === "all") url.searchParams.delete("filter");
  else url.searchParams.set("filter", filter);
  history.replaceState({}, "", url);
}

function setFilter(filter, animate = true) {
  if (!validFilters.has(filter) || (filter === activeFilter && animate) || filterLocked) return;

  activeFilter = filter;
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.setAttribute("aria-pressed", String(selected));
  });

  const matchingCards = projectCards.filter((card) => cardMatches(card, filter));
  resultCount.textContent = String(matchingCards.length).padStart(2, "0");
  updateFilterUrl(filter);

  if (!animate || !allowsMotion) {
    projectCards.forEach((card) => {
      card.hidden = !cardMatches(card, filter);
      gsap.set(card, { clearProps: "opacity,transform" });
    });
    ScrollTrigger.refresh();
    return;
  }

  filterLocked = true;
  filterButtons.forEach((button) => { button.disabled = true; });
  const leavingCards = projectCards.filter((card) => !card.hidden && !cardMatches(card, filter));

  gsap.to(leavingCards, {
    opacity: 0,
    scale: .965,
    duration: .26,
    stagger: .018,
    ease: "power2.in",
    overwrite: true,
    onComplete: () => {
      const state = Flip.getState(projectCards);
      projectCards.forEach((card) => {
        card.hidden = !cardMatches(card, filter);
      });

      Flip.from(state, {
        targets: matchingCards,
        duration: .9,
        ease: "power4.inOut",
        absolute: true,
        scale: true,
        stagger: .018,
        onEnter: (elements) => gsap.fromTo(elements,
          { opacity: 0, scale: .94, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: .65, stagger: .035, ease: "power3.out" }),
        onComplete: () => {
          gsap.set(matchingCards, { clearProps: "opacity,transform" });
          filterButtons.forEach((button) => { button.disabled = false; });
          filterLocked = false;
          lenis.resize();
          ScrollTrigger.refresh();
        },
      });
    },
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

setFilter(activeFilter, false);

function setupFooterMotion() {
  const footer = document.querySelector(".site-footer");
  const footerWord = footer?.querySelector(".footer__word--reveal");
  const footerTrailNear = footer?.querySelector(".footer__word--trail-near");
  const footerTrailFar = footer?.querySelector(".footer__word--trail-far");
  if (!footer || !footerWord || !footerTrailNear || !footerTrailFar) return;

  const state = {
    reveal: 0,
    revealTarget: 0,
    insideWord: false,
    targetX: 0,
    targetY: 0,
    mainX: 0,
    mainY: 0,
    nearX: 0,
    nearY: 0,
    farX: 0,
    farY: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
  };

  gsap.set([footerWord, footerTrailNear, footerTrailFar], { xPercent: -50, yPercent: -50 });

  const update = (event) => {
    const bounds = footerWord.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const insideWord = localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height;

    if (insideWord) {
      if (!state.insideWord) {
        state.mainX = localX;
        state.mainY = localY;
        state.nearX = localX;
        state.nearY = localY;
        state.farX = localX;
        state.farY = localY;
        state.lastX = localX;
        state.lastY = localY;
      }
      state.velocityX = state.velocityX * .58 + (localX - state.lastX) * .42;
      state.velocityY = state.velocityY * .58 + (localY - state.lastY) * .42;
      state.targetX = localX;
      state.targetY = localY;
      state.lastX = localX;
      state.lastY = localY;
      state.revealTarget = 1;
    } else if (state.insideWord) {
      state.targetX += Math.max(-120, Math.min(120, state.velocityX * 9));
      state.targetY += Math.max(-72, Math.min(72, state.velocityY * 9));
      state.revealTarget = 0;
    }
    state.insideWord = insideWord;
  };

  footer.addEventListener("mouseenter", update);
  footer.addEventListener("mousemove", update);
  footer.addEventListener("mouseleave", () => {
    if (state.insideWord) {
      state.targetX += Math.max(-120, Math.min(120, state.velocityX * 9));
      state.targetY += Math.max(-72, Math.min(72, state.velocityY * 9));
    }
    state.insideWord = false;
    state.revealTarget = 0;
  });

  gsap.ticker.add(() => {
    if (!state.revealTarget && state.reveal < .001 && !state.insideWord) return;
    const frameRatio = gsap.ticker.deltaRatio(60);
    const easeFrame = (amount) => 1 - Math.pow(1 - amount, frameRatio);
    const revealEase = state.revealTarget ? .038 : .018;

    state.reveal += (state.revealTarget - state.reveal) * easeFrame(revealEase);
    state.mainX += (state.targetX - state.mainX) * easeFrame(.12);
    state.mainY += (state.targetY - state.mainY) * easeFrame(.12);
    state.nearX += (state.mainX - state.nearX) * easeFrame(.052);
    state.nearY += (state.mainY - state.nearY) * easeFrame(.052);
    state.farX += (state.nearX - state.farX) * easeFrame(.022);
    state.farY += (state.nearY - state.farY) * easeFrame(.022);
    state.velocityX *= .92;
    state.velocityY *= .92;

    footerWord.style.setProperty("--spot-x", `${state.mainX}px`);
    footerWord.style.setProperty("--spot-y", `${state.mainY}px`);
    footerTrailNear.style.setProperty("--spot-x", `${state.nearX}px`);
    footerTrailNear.style.setProperty("--spot-y", `${state.nearY}px`);
    footerTrailFar.style.setProperty("--spot-x", `${state.farX}px`);
    footerTrailFar.style.setProperty("--spot-y", `${state.farY}px`);
    footerWord.style.opacity = state.reveal * .27;
    footerTrailNear.style.opacity = state.reveal * .13;
    footerTrailFar.style.opacity = state.reveal * .065;
  });
}

if (allowsMotion) {
  gsap.to(".projects-hero__media img", {
    scale: 1.2,
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: ".projects-hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".projects-hero__copy", {
    yPercent: 30,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".projects-hero", start: "top top", end: "78% top", scrub: true },
  });

  gsap.utils.toArray(".split-reveal").forEach((element) => {
    gsap.from(element, {
      y: 72,
      opacity: 0,
      duration: 1.25,
      ease: "power4.out",
      scrollTrigger: { trigger: element, start: "top 84%" },
    });
  });
  gsap.from(".projects-intro__copy p", {
    y: 36,
    opacity: 0,
    duration: .95,
    stagger: .12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".projects-intro__copy", start: "top 84%" },
  });

  projectCards.forEach((card) => {
    gsap.from(card, {
      y: 64,
      opacity: 0,
      duration: 1.05,
      ease: "power4.out",
      scrollTrigger: { trigger: card, start: "top 91%" },
    });
    gsap.fromTo(card.querySelector("img"), { yPercent: -4 }, {
      yPercent: 4,
      ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  });

  gsap.to(".projects-closing__media img", {
    scale: 1,
    yPercent: 5,
    ease: "none",
    scrollTrigger: { trigger: ".projects-closing", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.from(".projects-closing h2 span", {
    yPercent: 110,
    opacity: 0,
    duration: 1.1,
    stagger: .12,
    ease: "power4.out",
    scrollTrigger: { trigger: ".projects-closing h2", start: "top 82%" },
  });

  setupFooterMotion();
  gsap.from(".footer__grid > *, .footer__bottom > *", {
    y: 28,
    opacity: 0,
    duration: .9,
    stagger: .055,
    ease: "power3.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 76%" },
  });
}

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.setAttribute("aria-hidden", String(!open));
  gsap.to(mobileMenu, { autoAlpha: open ? 1 : 0, duration: .55, ease: "power3.inOut" });
  if (open) lenis.stop(); else lenis.start();
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  mobileMenu.setAttribute("aria-hidden", "true");
  gsap.to(mobileMenu, { autoAlpha: 0, duration: .35 });
  lenis.start();
}));

const cursor = document.querySelector(".cursor");
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const moveX = gsap.quickTo(cursor, "x", { duration: .28, ease: "power3" });
  const moveY = gsap.quickTo(cursor, "y", { duration: .28, ease: "power3" });
  window.addEventListener("pointermove", (event) => {
    moveX(event.clientX);
    moveY(event.clientY);
    gsap.to(cursor, { opacity: 1, duration: .25 });
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
