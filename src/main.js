import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const localPreview = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const motionPreview = localPreview || new URLSearchParams(location.search).has("motion-preview");
const allowsMotion = !prefersReducedMotion || motionPreview;
if (motionPreview) document.documentElement.classList.add("motion-preview");
const isMobile = window.matchMedia("(max-width: 800px)");
const frameCount = 72;
const frames = new Array(frameCount);
const canvas = document.querySelector(".film__canvas");
const context = canvas.getContext("2d", { alpha: false });
const loaderCount = document.querySelector(".loader__count");
const loaderLine = document.querySelector(".loader__line span");
const filmProgress = document.querySelector(".film__progress");
let loadedFrames = 0;
let currentFrame = 0;
let siteEntered = false;

document.querySelector("#year").textContent = new Date().getFullYear();

const lenis = new Lenis({
  duration: 1.25,
  smoothWheel: allowsMotion,
  wheelMultiplier: 0.88,
  touchMultiplier: 1.1,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

function framePath(index) {
  return `/assets/sequence/frame-${String(index).padStart(3, "0")}.webp`;
}

function updateLoadProgress() {
  const percent = Math.round((loadedFrames / frameCount) * 100);
  if (!siteEntered) {
    loaderCount.textContent = String(percent).padStart(3, "0");
    gsap.to(loaderLine, { width: `${percent}%`, duration: .2, overwrite: true });
  }
}

function loadFrame(index) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = image.onerror = () => {
      loadedFrames += 1;
      if (index === 0 || index === currentFrame) renderFrame(currentFrame);
      updateLoadProgress();
      resolve();
    };
    frames[index] = image;
    image.src = framePath(index);
  });
}

function preloadFrames() {
  const heroImage = document.querySelector(".hero__media img");
  const heroReady = heroImage?.complete ? Promise.resolve() : new Promise((resolve) => {
    if (!heroImage) { resolve(); return; }
    heroImage.addEventListener("load", resolve, { once: true });
    heroImage.addEventListener("error", resolve, { once: true });
  });

  Promise.race([
    heroReady,
    new Promise((resolve) => window.setTimeout(resolve, 320)),
  ]).then(enterSite);

  const prepareFilm = () => loadFrame(0).then(() => {
    const film = document.querySelector(".film");
    let sequenceStarted = false;
    const startSequence = () => {
      if (sequenceStarted) return;
      sequenceStarted = true;
      const queue = Array.from({ length: frameCount - 1 }, (_, index) => index + 1);
      const loadWorker = async () => {
        while (queue.length) {
          const index = queue.shift();
          await loadFrame(index);
        }
      };
      Promise.all(Array.from({ length: 4 }, loadWorker));
    };

    if (!("IntersectionObserver" in window) || !film) {
      window.setTimeout(startSequence, 2500);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      startSequence();
    }, { rootMargin: "175% 0px" });
    observer.observe(film);
  });

  if (document.readyState === "complete") window.setTimeout(prepareFilm, 0);
  else window.addEventListener("load", prepareFilm, { once: true });
}

function drawCover(image) {
  if (!image?.naturalWidth) return;
  const ratio = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const width = image.naturalWidth * ratio;
  const height = image.naturalHeight * ratio;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(canvas.clientWidth * ratio);
  canvas.height = Math.floor(canvas.clientHeight * ratio);
  renderFrame(currentFrame);
}

function renderFrame(index) {
  currentFrame = Math.max(0, Math.min(frameCount - 1, Math.round(index)));
  let image = frames[currentFrame];
  if (!image?.naturalWidth) {
    for (let offset = 1; offset < frameCount; offset += 1) {
      const previous = frames[currentFrame - offset];
      const next = frames[currentFrame + offset];
      if (previous?.naturalWidth) { image = previous; break; }
      if (next?.naturalWidth) { image = next; break; }
    }
  }
  drawCover(image);
}

function enterSite() {
  if (siteEntered) return;
  siteEntered = true;
  const progress = { value: Math.round((loadedFrames / frameCount) * 100) };
  const timeline = gsap.timeline({ defaults: { ease: "power4.inOut" } });
  timeline
    .to(progress, {
      value: 100,
      duration: .28,
      ease: "power2.out",
      onUpdate: () => {
        loaderCount.textContent = String(Math.round(progress.value)).padStart(3, "0");
        gsap.set(loaderLine, { width: `${progress.value}%` });
      },
    })
    .to(".loader__meta", { y: -16, opacity: 0, duration: .34 })
    .to(".loader__word", { yPercent: 16, opacity: 0, duration: .42 }, "<")
    .to(".loader", { clipPath: "inset(0 0 100% 0)", duration: .72 })
    .from(".hero__media img", { scale: 1.24, duration: 1.15 }, "-=.58")
    .from(".hero-line i", { yPercent: 115, duration: .78, stagger: .085 }, "-=.92")
    .from(".hero .eyebrow span, .hero__topline, .scroll-cue, .hero__arabic", { opacity: 0, y: 13, duration: .52, stagger: .045 }, "-=.52")
    .set(".loader", { display: "none" })
    .call(() => ScrollTrigger.refresh());
}

preloadFrames();
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const progressBar = document.querySelector(".page-progress span");
ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
});

if (allowsMotion) {
  gsap.to(".hero__media img", {
    scale: 1.2,
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero__copy", {
    yPercent: 32,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "78% top", scrub: true },
  });

  gsap.utils.toArray(".split-reveal").forEach((element) => {
    gsap.from(element, {
      y: 70,
      opacity: 0,
      duration: 1.25,
      ease: "power4.out",
      scrollTrigger: { trigger: element, start: "top 84%" },
    });
  });

  gsap.to(".expand-media", {
    width: "100vw",
    height: "100svh",
    borderRadius: "0% 0% 0% 0%",
    ease: "none",
    scrollTrigger: { trigger: ".expand-media", start: "center bottom", end: "center center", scrub: 1 },
  });
  gsap.to(".expand-media img", {
    scale: 1,
    ease: "none",
    scrollTrigger: { trigger: ".expand-media", start: "top bottom", end: "bottom top", scrub: 1 },
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

  gsap.utils.toArray(".service-list article").forEach((item) => {
    gsap.from(item, { x: 70, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%" } });
  });

  const frameState = { frame: 0 };
  const scenes = gsap.utils.toArray(".film-scene");
  const filmTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".film",
      start: "top top",
      end: "bottom bottom",
      scrub: .35,
      onUpdate: (self) => {
        const nextFrame = Math.round(self.progress * (frameCount - 1));
        if (nextFrame !== currentFrame) renderFrame(nextFrame);
        filmProgress.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
      },
    },
  });
  scenes.forEach((scene, index) => {
    const start = index * 1.15;
    filmTimeline
      .fromTo(scene, { opacity: 0, yPercent: 16 }, { opacity: 1, yPercent: -50, duration: .28 }, start)
      .to(scene, { opacity: 0, yPercent: -68, duration: .28 }, start + .67);
  });
  filmTimeline.to(frameState, { frame: frameCount - 1, duration: scenes.length * 1.15, ease: "none" }, 0);

  const craftShots = gsap.utils.toArray(".craft-shot img");
  craftShots.forEach((image) => {
    gsap.to(image, { scale: 1, yPercent: -4, ease: "none", scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 1 } });
  });
  gsap.from(".craft__stat strong", { textContent: 0, duration: 2, snap: { textContent: 1 }, scrollTrigger: { trigger: ".craft__stat", start: "top 80%" } });

  gsap.to(".contact__backdrop img", { scale: 1, yPercent: 5, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.from(".contact h2 span", { yPercent: 110, opacity: 0, duration: 1.1, stagger: .12, ease: "power4.out", scrollTrigger: { trigger: ".contact h2", start: "top 82%" } });

  const footer = document.querySelector(".site-footer");
  const footerWord = footer.querySelector(".footer__word--reveal");
  const footerTrailNear = footer.querySelector(".footer__word--trail-near");
  const footerTrailFar = footer.querySelector(".footer__word--trail-far");
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

  gsap.from(".footer__grid > *, .footer__bottom > *", {
    y: 28,
    opacity: 0,
    duration: .9,
    stagger: .055,
    ease: "power3.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 76%" },
  });
}

function createProjectScroll() {
  ScrollTrigger.getById("project-scroll")?.kill();
  gsap.set(".projects-track", { clearProps: "transform" });
  if (isMobile.matches) return;
  const track = document.querySelector(".projects-track");
  const stage = document.querySelector(".projects-stage");
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      id: "project-scroll",
      trigger: stage,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(".projects-stage__progress span", { scaleX: self.progress }),
    },
  });
}

createProjectScroll();
isMobile.addEventListener("change", () => {
  createProjectScroll();
  ScrollTrigger.refresh();
});

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
