// ✅ Use your own local images (recommended for assignment)
// Put images in same folder like: images/1.jpg ... images/10.jpg
// Then use: "images/1.jpg" etc.
//
// If you don't have images, you can use online URLs (needs internet).

const images = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1520975869018-0a1b54c7b84a?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=60"
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
