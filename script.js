// Timer starten: 25 Minuten
let time = 25 * 60;
let timerEl = document.querySelector("h1");

setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  time--;
}, 1000);

