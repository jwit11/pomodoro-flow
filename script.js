console.log("JS funktioniert!"); // Test ob JS geladen wird

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

// Buttons verbinden
document.getElementById("startPause").onclick = startPauseTimer;
document.getElementById("reset").onclick = resetTimer;

// Initiales Update
updateTimerDisplay();
