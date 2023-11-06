const DEFAULT_COLOUR = "#000000";
const DEFAULT_SIZE = 24;

let colour = DEFAULT_COLOUR;
let mode;

const grid = document.querySelector("#grid-container");
const sizeValue = document.querySelector("#grid-size-value");
const slider = document.querySelector("#slider");
const colourWheel = document.querySelector("#colour-wheel");

const colourBtn = document.querySelector(".colour-mode");
const rainbowBtn = document.querySelector(".rainbow-mode");
const eraseBtn = document.querySelector(".erase-mode");
const darkenBtn = document.querySelector(".darken-mode");
const lightenBtn = document.querySelector(".lighten-mode")
const clearBtn = document.querySelector(".clear-mode");
const gridToggleBtn = document.querySelector(".grid-toggle");

let mouseDown = true;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

let gridBorder = true;

colourBtn.addEventListener("click", () => {setCurrentMode("colour")});
rainbowBtn.addEventListener("click", () => {setCurrentMode("rainbow")});
eraseBtn.addEventListener("click", () => {setCurrentMode("erase")});
darkenBtn.addEventListener("click", () => {setCurrentMode("darken")});
lightenBtn.addEventListener("click", () => {setCurrentMode("lighten")});
clearBtn.addEventListener("click", () => {clearGrid()});
gridToggleBtn.addEventListener("click", () => {gridToggle()});

slider.addEventListener("mousemove", (event) => {sizeValue.innerHTML = `${event.target.value} x ${event.target.value}`});
slider.addEventListener("change", () => {
    clearGrid();
});

function gridToggle() {
    gridBorder = gridBorder === false ? true : false;
    let border = document.querySelectorAll(".grid-element");
    if (gridBorder) {
        border = document.querySelectorAll(".square");
        border.forEach((div) => {div.classList.add("grid-element")});
        gridToggleBtn.classList.remove("disabled");
        gridToggleBtn.classList.add("enabled");
        gridToggleBtn.textContent = "Grid toggle ON";
    } else if (gridBorder === false) {
        border.forEach((element) => {element.classList.remove("grid-element")});
        gridToggleBtn.classList.remove("enabled");
        gridToggleBtn.classList.add("disabled");
        gridToggleBtn.textContent = "Grid toggle OFF";
    }
}

function activateButton(newMode) {
    if (mode === "colour") {
        colourBtn.classList.remove("active");
    } else if (mode === "rainbow") {
        rainbowBtn.classList.remove("active");
    } else if (mode === "darken") {
        darkenBtn.classList.remove("active");
    } else if (mode === "lighten") {
        lightenBtn.classList.remove("active");
    } else if (mode === "erase") {
        eraseBtn.classList.remove("active");
    }

    if (newMode === "colour") {
        colourBtn.classList.add("active");
    } else if (newMode === "rainbow") {
        rainbowBtn.classList.add("active");
    } else if (newMode === "darken") {
        darkenBtn.classList.add("active");
    } else if (newMode === "lighten") {
        lightenBtn.classList.add("active");
    } else if (newMode === "erase") {
        eraseBtn.classList.add("active");
    }
}

function setCurrentMode(currentMode) {
    activateButton(currentMode);
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
        square.classList.add("square");
        if (gridBorder) square.classList.add("grid-element");
        square.addEventListener("mouseover", draw);
        square.addEventListener("mousedown", draw);
        grid.appendChild(square);
    }
}

function getColourValue(colour, percent) {
    colour = parseInt(colour * (100 + percent) / 100);
    colour = (colour < 255) ? colour : 255;
    return Math.round(colour)
}

function shadeColour(rgbColor, percent) {
    rgbColorValue = rgbColor.substring(4, rgbColor.length - 1).split(",");

    const red = getColourValue(parseInt(rgbColorValue[0]), percent)
    const green = getColourValue(parseInt(rgbColorValue[1]), percent)
    const blue = getColourValue(parseInt(rgbColorValue[2]), percent)

    const RR = ((red.toString(16).length == 1) ? "0"+red.toString(16) : red.toString(16));
    const GG = ((green.toString(16).length == 1) ? "0"+green.toString(16) : green.toString(16));
    const BB = ((blue.toString(16).length == 1) ? "0"+blue.toString(16) : blue.toString(16));

    return `#${RR}${GG}${BB}`;
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
    } else if (mode === "darken") {
        const currentRGBColor = event.target.style.backgroundColor;
        event.target.style.backgroundColor = shadeColour(currentRGBColor, -5);
    } else if (mode === "lighten") {
        const currentRGBColor = event.target.style.backgroundColor;
        event.target.style.backgroundColor = shadeColour(currentRGBColor, 5);
    } else if (mode === "erase") {
        event.target.style.backgroundColor = "#FFFFFF";
    }
}

createGrid(DEFAULT_SIZE);