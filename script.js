// --- Test, ob JS geladen wird
console.log("JS funktioniert!");

// --- Pomodoro Timer ---
let focusTime = 25 * 60; // 25 Minuten
let breakTime = 5 * 60;  // 5 Minuten
let time = focusTime;

let isRunning = false;
let isFocus = true;
let timerInterval = null;

const timerEl = document.querySelector("h1");
const stateEl = document.querySelector("p");

function updateTimerDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  stateEl.textContent = isFocus ? "FOCUS" : "BREAK";
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  } else {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      } else {
        isFocus = !isFocus;
        time = isFocus ? focusTime : breakTime;
        updateTimerDisplay();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isFocus = true;
  time = focusTime;
  updateTimerDisplay();
}

// Buttons verbinden
document.getElementById("startPause").onclick = startPauseTimer;
document.getElementById("reset").onclick = resetTimer;

// Initiales Update
updateTimerDisplay();

// --- Boid Animation ---
const canvas = document.getElementById("boidsCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const boids = [];
const boidCount = 30;

class Boid {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * 1.5 - 0.75;
    this.vy = Math.random() * 1.5 - 0.75;
    this.size = 3 + Math.random() * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#7DD3FC";
    ctx.fill();
  }
}

for (let i = 0; i < boidCount; i++) {
  boids.push(new Boid());
}

function animateBoids() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boids.forEach(b => {
    b.update();
    b.draw();
  });
  requestAnimationFrame(animateBoids);
}

animateBoids();

