let time = 1500;

setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.querySelector("h1").innerText =
    minutes + ":" + seconds.toString().padStart(2, "0");
  time--;
}, 1000);

