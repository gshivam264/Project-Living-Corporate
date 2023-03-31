function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

gsap.from("#nav", {
  y: -100,
  opacity: 0,
  delay: 0.2,
  duration: 0.8,
});
gsap.from("#page1-left", {
  opacity: 0,
  delay: 1,
  duration: 1,
});
gsap.from("#page1-right-box", {
  scale: 0,
  opacity: 0,
  delay: 1,
  duration: 1,
});

gsap.from("#page1-right-line", {
  y: 200,
  opacity: 0,
  delay: 0.2,
  duration: 0.8,
});

var tl = gsap.timeline({
  repeat: -1,
});

tl.to(
  ".element",
  {
    scale: 1,
    duration: 2,
    stagger: 2,
    opacity: 1,
  },
  "a"
)
  .to(
    ".content h3",
    {
      top: 0,
      stagger: 2,
      opacity: 1,
    },
    "a"
  )
  .to(
    ".content h3",
    {
      top: "-100%",
      stagger: 2,
      delay: 2,
      opacity: 1,
    },
    "a"
  )
  .to(
    ".content h1",
    {
      top: "10%",
      stagger: 2,
      opacity: 1,
    },
    "a"
  )
  .to(
    ".content h1",
    {
      delay: 2,
      top: "-100%",
      stagger: 2,
      opacity: 1,
    },
    "a"
  );

var tl2 = gsap.timeline({
  repeat: -1,
});

tl2.to(
  "#page1-right-growth",
  {
    width: "100%",
    duration: 2,
    stagger: 2,
    delay: 0.1,
  },
  "b"
);

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 50%",
    end: "top 50%",
    scrub: 2,
  },
});
tl3.to(".page2-elem", {
  opacity: 1,
  stagger: 0.5,
});
var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
  },
});
tl4.to("page3-content h1", {
  onStart: function () {
    $("#page3-content h1").textillate({ in: { effect: "fadeInUp" } });
  },
});

var tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
  },
});
tl5.to("page6-content h1", {
  onStart: function () {
    $("#page6-content h1").textillate({ in: { effect: "fadeInUp" } });
  },
});

var tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page7",
    scroller: "#main",
    start: "top 95%",
    end: "top 50%",
  },
});
tl6.to("page7-nav h1", {
  onStart: function () {
    $("#page7-nav h1").textillate({ in: { effect: "fadeInRight" } });
  },
});

var tl7 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 80%",
    end: "top 50%",
  },
});
tl7.to("page4-left h1", {
  onStart: function () {
    $("#page4-left h1").textillate({ in: { effect: "fadeInRight" } });
  },
});

var menu = document.querySelector("#menu-nav");
var header = document.querySelector("#header");
var nav = document.querySelector("#nav");
var line1 = document.querySelector("#line1");
var line2 = document.querySelector("#line2");
var line3 = document.querySelector("#line3");
var flag = 0;

menu.addEventListener("click", function () {
  if (flag == 0) {
    header.style.top = "0%";
    nav.style.zIndex = 9999;
    nav.style.backgroundColor = "#000";
    nav.style.color = "#FEF9F3";
    line2.style.scale = 0;
    line3.style.backgroundColor = "#FEF9F3";
    line1.style.backgroundColor = "#FEF9F3";
    line1.style.rotate = "30deg";
    line3.style.rotate = "-38deg";
    flag = 1;
  } else {
    header.style.top = "-100%";
    nav.style.zIndex = 9;
    nav.style.backgroundColor = "#FEF9F3";
    nav.style.color = "#000";
    line2.style.scale = 1;
    line3.style.backgroundColor = "#000";
    line1.style.backgroundColor = "#000";
    line1.style.rotate = "0deg";
    line3.style.rotate = "0deg";
    flag = 0;
  }
});

var arr = document.querySelectorAll(".page5-element");
arr.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    elem.childNodes[3].style.scale = 1;
  });
  elem.addEventListener("mouseleave", function () {
    elem.childNodes[3].style.scale = 0;
  });
  elem.addEventListener("mousemove", function (dets) {
    elem.childNodes[3].style.left = `${dets.x / 1.5}px`;
  });
});
