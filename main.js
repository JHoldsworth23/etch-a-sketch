const grid = document.querySelector("#grid");
const gridStyle = window.getComputedStyle(grid);
const gridWidth = gridStyle.getPropertyValue("width").split("p")[0];

let defaultSize = 16;

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

function createGrid(defaultSize) {
    for (let i = 0; i < defaultSize; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        grid.appendChild(gridRow);

        for (let j = 0; j < defaultSize; j++) {
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridElement.style.width = gridWidth / defaultSize + "px";
            gridElement.style.height = gridWidth / defaultSize + "px";
            
            gridElement.addEventListener("mouseover", (event) => {
                if (event.type === 'mouseover' && !mouseDown) {
                    return;
                } else {
                    gridElement.style.backgroundColor = "#000000";
                }
            });
            gridElement.addEventListener("mousedown", () => {
                console.log("this function works")
            });
            gridRow.appendChild(gridElement);
        }
    }
}

createGrid(defaultSize);