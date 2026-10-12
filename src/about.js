import "./style.css";
import "./about.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const localPreview = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const motionPreview = localPreview || new URLSearchParams(location.search).has("motion-preview");
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
    .from(".about-hero__media img", { scale: 1.24, duration: 1.15 }, "-=.58")
    .from(".about-hero__copy h1 i", { yPercent: 115, duration: .78, stagger: .085 }, "-=.92")
    .from(".about-hero .eyebrow, .about-hero__topline, .about-hero__arabic, .about-hero__scroll", {
      opacity: 0,
      y: 16,
      duration: .52,
      stagger: .045,
    }, "-=.52")
    .set(".loader", { display: "none" })
    .call(() => ScrollTrigger.refresh());
}

const heroImage = document.querySelector(".about-hero__media img");
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

function setupFooterMotion() {
  const footer = document.querySelector(".site-footer");
  const footerWord = footer?.querySelector(".footer__word--reveal");
  const footerTrailNear = footer?.querySelector(".footer__word--trail-near");
  const footerTrailFar = footer?.querySelector(".footer__word--trail-far");
  if (!footer || !footerWord || !footerTrailNear || !footerTrailFar) return;

  const footerMotion = {
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

  const updateFooterReveal = (event) => {
    const bounds = footerWord.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const insideWord = localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height;

    if (insideWord) {
      if (!footerMotion.insideWord) {
        footerMotion.mainX = localX;
        footerMotion.mainY = localY;
        footerMotion.nearX = localX;
        footerMotion.nearY = localY;
        footerMotion.farX = localX;
        footerMotion.farY = localY;
        footerMotion.lastX = localX;
        footerMotion.lastY = localY;
      }
      footerMotion.velocityX = footerMotion.velocityX * .58 + (localX - footerMotion.lastX) * .42;
      footerMotion.velocityY = footerMotion.velocityY * .58 + (localY - footerMotion.lastY) * .42;
      footerMotion.targetX = localX;
      footerMotion.targetY = localY;
      footerMotion.lastX = localX;
      footerMotion.lastY = localY;
      footerMotion.revealTarget = 1;
    } else if (footerMotion.insideWord) {
      footerMotion.targetX += Math.max(-120, Math.min(120, footerMotion.velocityX * 9));
      footerMotion.targetY += Math.max(-72, Math.min(72, footerMotion.velocityY * 9));
      footerMotion.revealTarget = 0;
    }

    footerMotion.insideWord = insideWord;
  };

  footer.addEventListener("mouseenter", updateFooterReveal);
  footer.addEventListener("mousemove", updateFooterReveal);
  footer.addEventListener("mouseleave", () => {
    if (footerMotion.insideWord) {
      footerMotion.targetX += Math.max(-120, Math.min(120, footerMotion.velocityX * 9));
      footerMotion.targetY += Math.max(-72, Math.min(72, footerMotion.velocityY * 9));
    }
    footerMotion.insideWord = false;
    footerMotion.revealTarget = 0;
  });

  gsap.ticker.add(() => {
    if (!footerMotion.revealTarget && footerMotion.reveal < .001 && !footerMotion.insideWord) return;

    const frameRatio = gsap.ticker.deltaRatio(60);
    const easeFrame = (amount) => 1 - Math.pow(1 - amount, frameRatio);
    const revealEase = footerMotion.revealTarget ? .038 : .018;

    footerMotion.reveal += (footerMotion.revealTarget - footerMotion.reveal) * easeFrame(revealEase);
    footerMotion.mainX += (footerMotion.targetX - footerMotion.mainX) * easeFrame(.12);
    footerMotion.mainY += (footerMotion.targetY - footerMotion.mainY) * easeFrame(.12);
    footerMotion.nearX += (footerMotion.mainX - footerMotion.nearX) * easeFrame(.052);
    footerMotion.nearY += (footerMotion.mainY - footerMotion.nearY) * easeFrame(.052);
    footerMotion.farX += (footerMotion.nearX - footerMotion.farX) * easeFrame(.022);
    footerMotion.farY += (footerMotion.nearY - footerMotion.farY) * easeFrame(.022);
    footerMotion.velocityX *= .92;
    footerMotion.velocityY *= .92;

    footerWord.style.setProperty("--spot-x", `${footerMotion.mainX}px`);
    footerWord.style.setProperty("--spot-y", `${footerMotion.mainY}px`);
    footerTrailNear.style.setProperty("--spot-x", `${footerMotion.nearX}px`);
    footerTrailNear.style.setProperty("--spot-y", `${footerMotion.nearY}px`);
    footerTrailFar.style.setProperty("--spot-x", `${footerMotion.farX}px`);
    footerTrailFar.style.setProperty("--spot-y", `${footerMotion.farY}px`);
    footerWord.style.opacity = footerMotion.reveal * .27;
    footerTrailNear.style.opacity = footerMotion.reveal * .13;
    footerTrailFar.style.opacity = footerMotion.reveal * .065;
  });
}

if (allowsMotion) {
  gsap.to(".about-hero__media img", {
    scale: 1.2,
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".about-hero__copy", {
    yPercent: 32,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".about-hero", start: "top top", end: "78% top", scrub: true },
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

  gsap.from(".about-intro__copy p", {
    y: 36,
    opacity: 0,
    duration: .95,
    stagger: .12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-intro__copy", start: "top 84%" },
  });
  gsap.from(".about-intro__signature span", {
    y: 22,
    opacity: 0,
    duration: .8,
    stagger: .08,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-intro__signature", start: "top 88%" },
  });

  gsap.to(".about-image-stage__frame", {
    width: "100vw",
    height: "100svh",
    ease: "none",
    scrollTrigger: { trigger: ".about-image-stage__frame", start: "center bottom", end: "center center", scrub: 1 },
  });
  gsap.to(".about-image-stage__frame img", {
    scale: 1,
    yPercent: 4,
    ease: "none",
    scrollTrigger: { trigger: ".about-image-stage__frame", start: "top bottom", end: "bottom top", scrub: 1 },
  });

  gsap.utils.toArray(".image-shift").forEach((wrap) => {
    const image = wrap.querySelector("img");
    const direction = wrap.dataset.direction === "right" ? 1 : -1;
    gsap.fromTo(image, { xPercent: direction * -10 }, {
      xPercent: direction * 5,
      ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  });

  gsap.from(".about-principles li", {
    x: 54,
    opacity: 0,
    duration: .9,
    stagger: .09,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-principles", start: "top 84%" },
  });

  gsap.to(".about-why__ticker span", {
    xPercent: -32,
    ease: "none",
    scrollTrigger: { trigger: ".about-why", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.utils.toArray(".about-reasons article").forEach((item, index) => {
    gsap.from(item, {
      x: index % 2 ? -64 : 64,
      opacity: 0,
      duration: .95,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 90%" },
    });
  });

  gsap.to(".about-factory__media img", {
    scale: 1,
    yPercent: 5,
    ease: "none",
    scrollTrigger: { trigger: ".about-factory__media", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.from("[data-count]", {
    textContent: 0,
    duration: 2,
    snap: { textContent: 1 },
    ease: "power2.out",
    scrollTrigger: { trigger: ".about-factory__overlay", start: "top 82%" },
  });
  gsap.from(".about-factory__facts span", {
    y: 24,
    opacity: 0,
    duration: .8,
    stagger: .09,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about-factory__facts", start: "top 90%" },
  });

  gsap.to(".about-closing__media img", {
    scale: 1,
    yPercent: 5,
    ease: "none",
    scrollTrigger: { trigger: ".about-closing", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.from(".about-closing h2 span", {
    yPercent: 110,
    opacity: 0,
    duration: 1.1,
    stagger: .12,
    ease: "power4.out",
    scrollTrigger: { trigger: ".about-closing h2", start: "top 82%" },
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
  document.querySelectorAll("[data-cursor]").forEach((target) => {
    target.addEventListener("pointerenter", () => {
      cursor.querySelector("span").textContent = target.dataset.cursor;
      gsap.to(cursor, { scale: 1, duration: .4, ease: "back.out(1.8)" });
    });
    target.addEventListener("pointerleave", () => gsap.to(cursor, { scale: .25, duration: .35 }));
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
