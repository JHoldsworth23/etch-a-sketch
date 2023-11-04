const grid = document.querySelector("#grid-container");

const DEFAULTSIZE = 16;
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
        grid.appendChild(square);
    }

    const allSquares = document.querySelectorAll(".grid-element");

    allSquares.forEach((square) => {
        square.addEventListener("mouseover", (event) => {
            if (event.type === "mouseover" && !mouseDown) {
                return;
            } else {
                square.style.backgroundColor = "rgb(0, 0, 0)";
            }
        });

        square.addEventListener("mousedown", (event) => {
            if (event.type === "mouseover" && !mouseDown) {
                return;
            } else {
                square.style.backgroundColor = "rgb(0, 0, 0)";
            }
        });
    });
}

createGrid(DEFAULTSIZE);

gridSize.addEventListener("change", () => {
    let size = gridSize.value;

    grid.innerHTML = "";

    createGrid(size);
});
