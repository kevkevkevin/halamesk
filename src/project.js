import "./style.css";
import "./project.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { galleryImage, getProject, projects } from "./project-data.js";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const searchParams = new URLSearchParams(location.search);
const localPreview = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const motionPreview = localPreview || searchParams.has("motion-preview");
const allowsMotion = !prefersReducedMotion || motionPreview;
if (motionPreview) document.documentElement.classList.add("motion-preview");

const project = getProject(searchParams.get("project"));
const projectIndex = projects.findIndex((item) => item.slug === project.slug);
const nextProject = projects[(projectIndex + 1) % projects.length];
const heroImage = galleryImage(project.slug, 1);

document.title = `${project.name} — Halamesk`;
document.querySelector('meta[name="description"]').content = project.description;
document.querySelector('meta[property="og:title"]').content = `${project.name} — Halamesk`;
document.querySelector('meta[property="og:description"]').content = project.description;
document.querySelector('meta[property="og:image"]').content = heroImage;
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-project-name]").forEach((element) => { element.textContent = project.name; });
document.querySelectorAll("[data-project-category]").forEach((element) => { element.textContent = project.category; });
document.querySelectorAll("[data-project-location]").forEach((element) => { element.textContent = project.location; });
document.querySelectorAll("[data-project-scope]").forEach((element) => { element.textContent = project.scope; });
document.querySelectorAll("[data-gallery-count]").forEach((element) => { element.textContent = String(project.galleryCount).padStart(2, "0"); });
document.querySelector("[data-project-description]").textContent = project.description;

const projectHero = document.querySelector("[data-project-hero]");
projectHero.src = heroImage;
projectHero.alt = `${project.name} by Halamesk`;

const gallery = document.querySelector("[data-project-gallery]");
const galleryLayouts = ["wide", "portrait", "offset", "large", "portrait", "wide"];
for (let index = 1; index <= project.galleryCount; index += 1) {
  const figure = document.createElement("figure");
  figure.className = `detail-gallery__item detail-gallery__item--${galleryLayouts[index - 1]}`;
  figure.dataset.cursor = "View";

  const media = document.createElement("div");
  media.className = "detail-gallery__media";
  const image = document.createElement("img");
  image.src = galleryImage(project.slug, index);
  image.alt = `${project.name} — selected view ${String(index).padStart(2, "0")}`;
  image.loading = index === 1 ? "eager" : "lazy";
  image.decoding = "async";
  media.append(image);

  const caption = document.createElement("figcaption");
  caption.innerHTML = `<span>${String(index).padStart(2, "0")} / ${String(project.galleryCount).padStart(2, "0")}</span><span>${project.category}</span>`;
  figure.append(media, caption);
  gallery.append(figure);
}

const nextLink = document.querySelector("[data-next-link]");
nextLink.href = `/project.html?project=${nextProject.slug}`;
document.querySelector("[data-next-name]").textContent = nextProject.name;
document.querySelector("[data-next-meta]").textContent = `${nextProject.category} · ${nextProject.location}`;
const nextImage = document.querySelector("[data-next-image]");
nextImage.src = galleryImage(nextProject.slug, 1);
nextImage.alt = `${nextProject.name} by Halamesk`;

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
  gsap.timeline({ defaults: { ease: "power4.inOut" } })
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
    .from(".detail-hero__media img", { scale: 1.24, duration: 1.15 }, "-=.58")
    .from(".detail-hero__copy h1", { y: 90, opacity: 0, duration: .82 }, "-=.92")
    .from(".detail-hero .eyebrow, .detail-hero__topline, .detail-hero__scroll", { opacity: 0, y: 16, duration: .52, stagger: .05 }, "-=.52")
    .set(".loader", { display: "none" })
    .call(() => ScrollTrigger.refresh());
}

const heroReady = projectHero.complete ? Promise.resolve() : new Promise((resolve) => {
  projectHero.addEventListener("load", resolve, { once: true });
  projectHero.addEventListener("error", resolve, { once: true });
});
Promise.race([heroReady, new Promise((resolve) => window.setTimeout(resolve, 420))]).then(enterSite);

ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (self) => gsap.set(".page-progress span", { scaleX: self.progress }),
});

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
    state.reveal += (state.revealTarget - state.reveal) * easeFrame(state.revealTarget ? .038 : .018);
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

setupFooterMotion();

if (allowsMotion) {
  gsap.to(".detail-hero__media img", {
    scale: 1.2,
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: ".detail-hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".detail-hero__copy", {
    yPercent: 28,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".detail-hero", start: "top top", end: "78% top", scrub: true },
  });
  gsap.from(".split-reveal", {
    y: 72,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: { trigger: ".split-reveal", start: "top 84%" },
  });
  gsap.from(".detail-intro__copy > *", {
    y: 32,
    opacity: 0,
    duration: .9,
    stagger: .1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".detail-intro__copy", start: "top 84%" },
  });

  gsap.utils.toArray(".detail-gallery__item").forEach((item) => {
    gsap.from(item, {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: item, start: "top 91%" },
    });
    gsap.fromTo(item.querySelector("img"), { yPercent: -4 }, {
      yPercent: 4,
      ease: "none",
      scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  });

  gsap.to(".detail-next__media img", {
    scale: 1,
    yPercent: 5,
    ease: "none",
    scrollTrigger: { trigger: ".detail-next", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.from(".detail-next__copy > *", {
    y: 58,
    opacity: 0,
    duration: 1,
    stagger: .1,
    ease: "power4.out",
    scrollTrigger: { trigger: ".detail-next__copy", start: "top 82%" },
  });

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
  document.querySelectorAll("[data-cursor]").forEach((target) => {
    target.addEventListener("pointerenter", () => {
      cursor.querySelector("span").textContent = target.dataset.cursor;
      gsap.to(cursor, { scale: 1, duration: .4, ease: "back.out(1.8)" });
    });
    target.addEventListener("pointerleave", () => gsap.to(cursor, { scale: .25, duration: .35 }));
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
