console.log("Timer Script geladen"); 
// --- Pomodoro Timer Logik ---

let focusTime = 25 * 60; // 25 Minuten
let breakTime = 5 * 60;  // 5 Minuten
let time = focusTime;

let isRunning = false;
let isFocus = true;
let timerInterval = null;

// Elemente aus HTML
const timerEl = document.querySelector("h1");
const stateEl = document.querySelector("p");

// Timer Update Funktion
function updateTimerDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  stateEl.textContent = i
