// load the header animation
lottie.loadAnimation({
  container: document.querySelector("#introAnim"),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://assets5.lottiefiles.com/packages/lf20_ftnubpoc.json'
})

const letsTalk = lottie.loadAnimation({
  container: document.querySelector("#letsTalk"),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: "json/letstalk.json"
});

const letsTalkContainer = document.querySelector("#letsTalk");
letsTalkContainer.addEventListener("mouseenter", e => {
  e.stopPropagation();
  letsTalk.play();
  letsTalk.loop = true;
})

letsTalkContainer.addEventListener("mouseleave", e => {
  letsTalk.loop = false;
})

letsTalkContainer.addEventListener("click", e => {
  open("mailto:craigcontreras@protonmail.com");
});

const header = document.querySelector("header");
const headerImg = document.querySelector("#header-img");
const div = document.querySelector("#introAnim");

// create image element
header.addEventListener("mouseenter", (e) => {
  const paths = ["img/img-1.png", "img/img-2.jpg", "img/img-3.jpg", "img/img-4.jpg", "img/img-5.jpg"];
  const randomImg = paths[Math.floor(Math.random() * paths.length)];
  headerImg.src = randomImg;
  // set mouse cursor to the mouse pointer's position by using margin
  headerImg.style.left = e.clientX + "px";
  headerImg.style.top = e.clientY + "px";

  const random = (Math.random() * -25 + 1) + (Math.random() * 25 + 1);

  headerImg.style.transform = `rotate(${random}deg) translate(-50%, -50%)`;
  headerImg.classList.remove("hidden");
});

// when it leaves header hide the image
header.addEventListener("mouseleave", () => {
  headerImg.classList.add("hidden");
});

// on mouse move update image position
header.addEventListener("mousemove", (e) => {
  // set mouse cursor to the mouse pointer's position by using margin
  headerImg.style.left = e.clientX + "px";
  headerImg.style.top = e.clientY + "px";
});

// using intersection observer to see when elements enter the viewport
let delay = 0;

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.remove("not-visible");
        entry.target.classList.add("slide-in-animation");
        delay += 5;
      }, delay * 20);
    } else {
      delay = 0;
      entry.target.classList.add("not-visible");
      entry.target.classList.remove("slide-in-animation");
    }
  });
});

const slideAnimations = document.querySelectorAll(".slide-animation");
slideAnimations.forEach((element) => {
  observer.observe(element);
});

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(element => {
  element.addEventListener("mouseenter", e => {
    document.querySelector("#main").classList.remove("blur-animation-reverse");
    setTimeout(() => {
      document.querySelector("#main").classList.add("blur-animation");
    }, 5);
  });
});

const nav = document.querySelector("nav");
nav.addEventListener("mouseleave", e => {
  e.stopImmediatePropagation();
  setTimeout(() => {
    document.querySelector("#main").classList.remove("blur-animation");
    document.querySelector("#main").classList.add("blur-animation-reverse");
  }, 5);
})