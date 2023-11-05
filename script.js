const DEFAULT_SIZE = 24;
const DEFAULT_COLOUR = "rgb(0, 0, 0)";
const DEFAULT_MODE = "colour";

const grid = document.querySelector("#grid-container");
const gridSize = document.querySelector("#grid-size");
const gridText = document.querySelector(".grid-size-text");

const colourWheel = document.querySelector("#colour-wheel");
let colour = DEFAULT_COLOUR;

const colourMode = document.querySelector(".colour-mode");
const rainbowMode = document.querySelector(".rainbow-mode");
let mode = DEFAULT_MODE;

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-element");
        square.addEventListener("mouseover", drawGrid);
        square.addEventListener("mousedown", drawGrid);
        grid.appendChild(square);
    }
}

function drawGrid(event) {
    if (event.type === "mouseover" && !mouseDown) {
        return;
    } else if (mode === "colour") {
        event.target.style.backgroundColor = colour;
    } else if (mode === "rainbow") {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);

        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

createGrid(DEFAULT_SIZE);

colourWheel.addEventListener("change", () => {
    colour = colourWheel.value;
});

gridSize.addEventListener("change", () => {
    gridText.textContent = `Grid size: ${gridSize.value} x ${gridSize.value}`;
    grid.innerHTML = "";

    createGrid(gridSize.value);
});

colourMode.addEventListener("click", () => {
    mode = "colour"
});

rainbowMode.addEventListener("click", () => {
    mode = "rainbow";
});
