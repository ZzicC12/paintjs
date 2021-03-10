const canvas = document.querySelector("#jsCanvas");
const color = document.querySelector("#jsColors");
const range = document.querySelector("input");

const color_array = Array.from(document.querySelectorAll(".controls__color"));

const btns = document.querySelector(".controls__btns");
const paint = document.querySelector("#jsPaint");
const fill = document.querySelector("#jsFill");

const ctx = canvas.getContext("2d");

let painting = false;
let status = "paint";

const changeMode = (event) => {
  switch (event.target.textContent) {
    case "Paint":
      status = "paint";
      event.target.style.opacity = 1;
      fill.style.opacity = 0.5;
      color_array.forEach((item) => (item.style.transform = "scale(1)"));
      break;
    case "Fill":
      status = "fill";
      event.target.style.opacity = 1;
      paint.style.opacity = 0.5;
      color_array.forEach((item) => (item.style.transform = "scale(1)"));
      break;
    case "Save":
      const URL = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = URL;
      link.download = "canvas";
      link.click();
      console.log(event.target);
      break;
  }
};

const handleInput = (event) => {
  const {
    target: { value },
  } = event;
  ctx.lineWidth = value;
};

const paintEnd = () => {
  painting = false;
};

const drawing = (event) => {
  if (painting) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const paintStart = () => {
  if (status === "paint") {
    ctx.beginPath();
    painting = true;
  }
};

const handleColor = (event) => {
  const {
    target: {
      dataset: { number },
      style: { backgroundColor },
    },
  } = event;
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;
  if (status === "fill") {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  color_array.forEach((item) => {
    if (item.dataset.number != number) {
      item.style.transform = "scale(1)";
    } else {
      item.style.transform = "scale(1.5)";
    }
  });
};

function init() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  color_array[0].style.transform = "scale(1.5)";
  fill.style.opacity = 0.5;
  color_array.forEach((item) => item.addEventListener("click", handleColor));
  btns.addEventListener("click", changeMode);
  range.addEventListener("input", handleInput);
  canvas.addEventListener("mousedown", paintStart);
  canvas.addEventListener("mousemove", drawing);
  canvas.addEventListener("mouseup", paintEnd);
  canvas.addEventListener("mouseleave", paintEnd);
}

init();
