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

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

colourBtn.addEventListener("click", () => {setCurrentMode("colour")});
rainbowBtn.addEventListener("click", () => {setCurrentMode("rainbow")});
eraseBtn.addEventListener("click", () => {setCurrentMode("erase")});
darkenBtn.addEventListener("click", () => {setCurrentMode("darken")});
lightenBtn.addEventListener("click", () => {setCurrentMode("lighten")});
clearBtn.addEventListener("click", () => {clearGrid()});

slider.addEventListener("mousemove", (event) => {sizeValue.innerHTML = `${event.target.value} x ${event.target.value}`});
slider.addEventListener("change", () => {clearGrid()});

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
        square.classList.add("grid-element");
        square.addEventListener("mouseover", draw);
        square.addEventListener("mousedown", draw);
        grid.appendChild(square);
    }
}

function shadeColour(rgbColor, percent) {
    rgbColorValue = rgbColor.substring(4, rgbColor.length - 1).split(",");
    let red = parseInt(rgbColorValue[0]);
    let green = parseInt(rgbColorValue[1]);
    let blue = parseInt(rgbColorValue[2]);

    red = parseInt(red * (100 + percent) / 100);
    green = parseInt(green * (100 + percent) / 100);
    blue = parseInt(blue * (100 + percent) / 100);

    red = (red < 255) ? red : 255;
    green = (green < 255) ? green : 255;
    blue = (blue < 255) ? blue : 255;

    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

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
        event.target.style.backgroundColor = shadeColour(currentRGBColor, -10);
    } else if (mode === "lighten") {
        const currentRGBColor = event.target.style.backgroundColor;
        event.target.style.backgroundColor = shadeColour(currentRGBColor, 10);
    } else if (mode === "erase") {
        event.target.style.backgroundColor = "#FFFFFF";
    }
}

createGrid(DEFAULT_SIZE);
