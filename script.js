// --- Pomodoro Timer ---
let focusTime = 25 * 60;
let breakTime = 5 * 60;
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

document.getElementById("startPause").onclick = startPauseTimer;
document.getElementById("reset").onclick = resetTimer;

updateTimerDisplay();

// --- Boid Animation mit Mausreaktion ---
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
const mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Boid {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * 1.5 - 0.75;
    this.vy = Math.random() * 1.5 - 0.75;
    this.size = 5 + Math.random() * 3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Grenzen
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // leichte Mausreaktion
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 100){
      this.vx -= dx * 0.0005;
      this.vy -= dy * 0.0005;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    const angle = Math.atan2(this.vy, this.vx);
    ctx.rotate(angle);

    // Dreieck
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size/2, this.size);
    ctx.lineTo(this.size/2, this.size);
    ctx.closePath();
    ctx.fillStyle = "#7DD3FC";
    ctx.fill();

    ctx.restore();
  }
}

for(let i=0;i<boidCount;i++){
  boids.push(new Boid());
}

function animateBoids(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  boids.forEach(b => { b.update(); b.draw(); });
  requestAnimationFrame(animateBoids);
}

animateBoids();
