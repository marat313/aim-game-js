const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeL = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;
const colors = [
  "#85144b",
  "#39CCCC",
  "#001f3f",
  "#F012BE",
  "#01FF70",
  "#7FDBFF",
  "#F012BE",
];

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreesTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreesTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeL.innerHTML = `00:${value}`;
}

function finishGame() {
  timeL.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(20, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.classList.add("angle");
  circle.classList.add("cube");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;

  const color = getRandomColor();
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color} 0 0 10px ${color}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
