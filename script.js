const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = "rgb(0, 0, 0)";

const grid = document.querySelector("#grid-container");
const gridSize = document.querySelector("#grid-size");

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
    } else {
        event.target.style.backgroundColor = DEFAULT_COLOR;
    }
}

createGrid(DEFAULT_SIZE);

gridSize.addEventListener("change", () => {
    let size = gridSize.value;

    grid.innerHTML = "";

    createGrid(size);
});
