const grid = document.querySelector("#grid");
const gridStyle = window.getComputedStyle(grid);
const gridWidth = gridStyle.getPropertyValue("width").split("p")[0];

let defaultSize = 16;

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
            
            gridElement.addEventListener("mouseover", () => {
                console.log("Change the color!")
            });
            gridRow.appendChild(gridElement);
        }
    }
}

createGrid(defaultSize);