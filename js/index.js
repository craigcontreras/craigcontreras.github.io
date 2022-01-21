// load the header animation
lottie.loadAnimation({
  container: document.querySelector("#introAnim"),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://assets5.lottiefiles.com/packages/lf20_ftnubpoc.json'
})

const header = document.querySelector("header");
const img = document.querySelector("#header-img");
const div = document.querySelector("#introAnim");

// create image element
header.addEventListener("mouseenter", (e) => {
  const paths = ["img/img-1.png", "img/img-2.jpg", "img/img-3.jpg", "img/img-4.jpg", "img/img-5.jpg"];
  const randomImg = paths[Math.floor(Math.random() * paths.length)];
  img.src = randomImg;
  // set mouse cursor to the mouse pointer's position by using margin
  img.style.left = e.clientX + "px";
  img.style.top = e.clientY + "px";

  const random = (Math.random() * -25 + 1) + (Math.random() * 25 + 1);

  img.style.transform = `rotate(${random}deg) translate(-50%, -50%)`;
  img.classList.remove("hidden");
});

// when it leaves header hide the image
header.addEventListener("mouseleave", () => {
  img.classList.add("hidden");
});

// on mouse move update image position
header.addEventListener("mousemove", (e) => {
  // set mouse cursor to the mouse pointer's position by using margin
  img.style.left = e.clientX + "px";
  img.style.top = e.clientY + "px";
});

// using intersection observer to see when elements enter the viewport
let delay = 0;

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
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

const allParagraphs = document.querySelectorAll(".paragraph-animation");
allParagraphs.forEach((element) => {
  observer.observe(element);
})

/* 3d modelling using three js */