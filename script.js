// ✅ Use your own local images (recommended for assignment)
// Put images in same folder like: images/1.jpg ... images/10.jpg
// Then use: "images/1.jpg" etc.
//
// If you don't have images, you can use online URLs (needs internet).

const images = [
  // Black Panther
  "./images/animal.jpg",

  // Night Sky
  "./images/sky.jpg",

  // Black Luxury Car
  "./images/car.jpg",

  // Black Suit / Formal
  "./images/suit.jpg",

  // Black Cat
  "./images/cat.jpg",

  // Black Rose
  "./images/rose.jpg",

  // Advocate / Court vibe
  "./images/advocate.jpg",

  // Black Fashion
  "./images/girl.jpg",

  // Dark Technology Setup
  "./images/tech.jpg",

  // Black Abstract Smoke
  "./images/smoke.jpg"
];


const slideA = document.querySelector(".slide-a");
const slideB = document.querySelector(".slide-b");
const blackWords = document.querySelectorAll(".word-black");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pauseBtn = document.getElementById("pauseBtn");

let index = 0;
let isAActive = true;
let isPaused = false;
let timer = null;

const colors = ["red", "lime", "yellow", "orange", "hotpink", "cyan", "violet", "gold", "springgreen", "deepskyblue"];

function colorizeBlackWords() {
  blackWords.forEach((el, i) => {
    el.style.color = colors[i % colors.length];
  });
}

function setInitial() {
  slideA.style.backgroundImage = `url('${images[index]}')`;
  slideB.style.backgroundImage = `url('${images[(index + 1) % images.length]}')`;
  colorizeBlackWords();
}

function goNext() {
  index = (index + 1) % images.length;
  swap("next");
}

function goPrev() {
  index = (index - 1 + images.length) % images.length;
  swap("prev");
}

function swap(direction) {
  const incoming = isAActive ? slideB : slideA;
  const outgoing = isAActive ? slideA : slideB;

  // Prepare incoming image
  incoming.style.backgroundImage = `url('${images[index]}')`;

  // Clear animations
  incoming.classList.remove("slide-in-right", "slide-out-left");
  outgoing.classList.remove("slide-in-right", "slide-out-left");

  // Trigger reflow
  void incoming.offsetWidth;

  // Animate
  incoming.classList.add("slide-in-right");
  outgoing.classList.add("slide-out-left");

  // Switch active layer
  isAActive = !isAActive;

  // Randomize colors slightly for “dangerous” vibe
  blackWords.forEach((el) => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    el.style.color = random;
  });
}

function startAuto() {
  stopAuto();
  timer = setInterval(() => {
    if (!isPaused) goNext();
  }, 3000); // slides every 3 seconds
}

function stopAuto() {
  if (timer) clearInterval(timer);
}

prevBtn.addEventListener("click", () => { goPrev(); startAuto(); });
nextBtn.addEventListener("click", () => { goNext(); startAuto(); });

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶ Play" : "⏸ Pause";
});

// Init
setInitial();
startAuto();

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const drawer = document.getElementById("rightDrawer");
const backdrop = document.getElementById("drawerBackdrop");

function openDrawer(){
  drawer.classList.add("open");
  backdrop.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer(){
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

openMenu.addEventListener("click", openDrawer);
closeMenu.addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);

// ESC key to close
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeDrawer();
});
