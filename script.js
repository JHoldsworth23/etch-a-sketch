// Create a 16 x 16 grid
const grid = document.querySelector("#grid");
const gridStyle = window.getComputedStyle(grid);
const gridWidth = gridStyle.getPropertyValue("width").split("p")[0];

let gridSize = document.querySelector("#grid-size");

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        grid.appendChild(gridRow);

        for (let j = 0; j < size; j++) {
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridElement.style.width = gridWidth / size + "px";
            gridElement.style.height = gridWidth / size + "px";
            
            gridElement.addEventListener("mouseover", (event) => {
                if (event.type === 'mouseover' && !mouseDown) {
                    return;
                } else {
                    gridElement.style.backgroundColor = "#000000";
                }
            });
            gridElement.addEventListener("mousedown", (event) => {
                if (event.type === 'mouseover' && !mouseDown) {
                    return;
                } else {
                    gridElement.style.backgroundColor = "#000000";
                }
            });
            gridRow.appendChild(gridElement);
        }
    }
}

createGrid(gridSize.value);