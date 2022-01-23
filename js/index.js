let hamburgerEnabled;
let scrollEffect = 0;
let complete = false;

// load the header animation
const headerAnim = lottie.loadAnimation({
  container: document.querySelector("#introAnim"),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://assets5.lottiefiles.com/packages/lf20_ftnubpoc.json'
});

const hamburgerAnim = lottie.loadAnimation({
  container: document.querySelector("#hamburger-icon"),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets4.lottiefiles.com/packages/lf20_50hJPU.json'
});

let x = window.matchMedia("(max-width: 768px)");
let wcydAnim;
if (x.matches) {
  wcydAnim = lottie.loadAnimation({
    container: document.querySelector("#wcyd-anim"),
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'json/wcyd-animation-mobile.json'
  })
} else {
  wcydAnim = lottie.loadAnimation({
    container: document.querySelector("#wcyd-anim"),
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'json/wcyd-animation-desktop.json',
    rendererSettings : {
      preserveAspectRatio : 'xMidYMax slice'
    }
  })
};

document.addEventListener("scroll", endlessScroll);

function endlessScroll() {
  scrollEffect += 1;
  document.querySelector("#spacer").style.height = `${100 + (scrollEffect * 100)}vh`;

  if (complete) {
    document.removeEventListener("scroll", endlessScroll);
    document.querySelector("#spacer").style.display = "none";
    document.querySelector("#wcyd-anim").classList.remove("sticky");
    document.querySelector("#wcyd-anim").classList.add("hidden");
    document.querySelector("#project-section").classList.remove("hidden");
  }
}

window.onbeforeunload = () => window.scrollTo(0, 0);

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

  headerImg.style.transform = `rotate(${random}deg) translate(-50%)`;
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

const slideInObserver = new IntersectionObserver(entries => {
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
  slideInObserver.observe(element);
});

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(element => {
  element.addEventListener("mouseenter", e => {
    if (!hamburgerEnabled) {
      document.querySelector("#main").classList.remove("blur-animation-reverse");
      setTimeout(() => {
        document.querySelector("#main").classList.add("blur-animation");
      }, 5);
    }
  });
});

const nav = document.querySelector("nav");
nav.addEventListener("mouseleave", e => {
  e.stopImmediatePropagation();
  if (!hamburgerEnabled) {
    setTimeout(() => {
      document.querySelector("#main").classList.remove("blur-animation");
      document.querySelector("#main").classList.add("blur-animation-reverse");
    }, 5);
  }
})

const hamburger = document.querySelector("#hamburger");
let hamburgerMenuOpened;

hamburger.addEventListener("click", e => {
  e.preventDefault();
  if (!hamburgerMenuOpened) {
    hamburgerMenuOpened = true;
    hamburgerAnim.playSegments([0, 10], true);
    document.querySelector("#main").classList.add("no-events");
    document.querySelectorAll(".desktop-hyperlink").forEach(element => {
      element.style.display = "inline";
      document.querySelector("#main").classList.remove("blur-animation-reverse");
      setTimeout(() => {
        document.querySelector("#main").classList.add("blur-animation");
      }, 5);
    })  
  } else {
    hamburgerMenuOpened = false;
    hamburgerAnim.playSegments([10, 21], true);
    document.querySelector("#main").classList.remove("no-events");
    document.querySelectorAll(".desktop-hyperlink").forEach(element => {
      element.style.display = "none";
    });

    setTimeout(() => {
      document.querySelector("#main").classList.remove("blur-animation");
      setTimeout(() => {
        document.querySelector("#main").classList.add("blur-animation-reverse");
      }, 5);
    }, 5);  
  }
});

const hamburgerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hamburgerEnabled = true;
      document.querySelector("#main").classList.remove("blur-animation");
      document.querySelectorAll(".desktop-hyperlink").forEach(element => {
        element.style.display = "none";
        element.classList.remove("slide-in-right-animation");
      })
    } else {
      hamburgerEnabled = false;
      hamburgerMenuOpened = false;
      document.querySelector("#main").classList.remove("blur-animation");
      document.querySelector("#main").classList.remove("blur-animation-reverse");
      document.querySelector("#main").classList.remove("no-events");
      hamburgerAnim.playSegments([0, 1], true);
      document.querySelectorAll(".desktop-hyperlink").forEach(element => {
        element.style.display = "inline";
        element.classList.add("slide-in-right-animation");
      });
    }
  });
});

hamburgerObserver.observe(hamburger);

let animationStart = 0;

const wcydObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.addEventListener("scroll", playAnimation);
    } else {
      document.removeEventListener("scroll", playAnimation);
    }
  })
});

function playAnimation() {
  wcydAnim.playSegments([animationStart, animationStart + 1], true);
  if (animationStart >= 432) {
    complete = true;
  } else {
    animationStart++;
  }
}

wcydObserver.observe(document.querySelector("#wcyd-anim"));