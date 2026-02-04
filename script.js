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

// --- Canvas Setup ---
const canvas = document.getElementById("boidsCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Maus für Interaktion
const mouse = { x: canvas.width/2, y: canvas.height/2 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Sterne erzeugen
const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    glow: Math.random() * 2
  });
}

// Boid Klasse
class Boid {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * 1.5 - 0.75;
    this.vy = Math.random() * 1.5 - 0.75;
    this.size = 7 + Math.random() * 3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 150){
      this.vx -= dx * 0.0007;
      this.vy -= dy * 0.0007;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    const angle = Math.atan2(this.vy, this.vx);
    ctx.rotate(angle);

    // Netlight-Dreieck mit Glow
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size*0.6, this.size*0.8);
    ctx.lineTo(this.size*0.6, this.size*0.8);
    ctx.closePath();
    ctx.fillStyle = "#A855F7";
    ctx.shadowColor = "#A855F7";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }
}

const boids = [];
for(let i=0;i<30;i++){
  boids.push(new Boid());
}

// Animation Loop
function animate() {
  // Hintergrund + Sterne
  ctx.fillStyle = "#0E0F11";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Boids
  boids.forEach(b => b.update());
  boids.forEach(b => b.draw());

  requestAnimationFrame(animate);
}

animate();
