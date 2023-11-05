const DEFAULT_MODE = "colour";
const DEFAULT_COLOUR = "#000000";
const DEFAULT_SIZE = 24;

let colour = DEFAULT_COLOUR;
let mode = DEFAULT_MODE;

const grid = document.querySelector("#grid-container");
const sizeValue = document.querySelector("#grid-size-value");
const slider = document.querySelector("#slider");
const colourWheel = document.querySelector("#colour-wheel");

const colourBtn = document.querySelector(".colour-mode");
const rainbowBtn = document.querySelector(".rainbow-mode");
const eraseBtn = document.querySelector(".erase-mode");
const clearBtn = document.querySelector(".clear-mode");

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

colourBtn.addEventListener("click", () => {setCurrentMode("colour")});
rainbowBtn.addEventListener("click", () => {setCurrentMode("rainbow")});
eraseBtn.addEventListener("click", () => {setCurrentMode("erase")});
clearBtn.addEventListener("click", () => {clearGrid()});

slider.addEventListener("mousemove", (event) => {sizeValue.innerHTML = `${event.target.value} x ${event.target.value}`});
slider.addEventListener("change", () => {clearGrid()});

function setCurrentMode(currentMode) {
    mode = currentMode;
}

function clearGrid() {
    grid.innerHTML = "";
    createGrid(slider.value);
}

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-element");
        square.addEventListener("mouseover", draw);
        square.addEventListener("mousedown", draw);
        grid.appendChild(square);
    }
}

function draw(event) {
    if (event.type === "mouseover" && !mouseDown) {
        return;
    } else if (mode === "colour") {
        event.target.style.backgroundColor = colourWheel.value;
    } else if (mode === "rainbow") {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (mode === "erase") {
        event.target.style.backgroundColor = "#FFFFFF";
    }
}

createGrid(DEFAULT_SIZE);
