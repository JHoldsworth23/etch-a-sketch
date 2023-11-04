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

    // for (let i = 0; i < size; i++) {
    //     const gridRow = document.createElement("div");
    //     gridRow.classList.add("grid-row");
    //     grid.appendChild(gridRow);

    //     for (let j = 0; j < size; j++) {
    //         const gridElement = document.createElement("div");
    //         gridElement.classList.add("grid-element");
    //         gridElement.style.width = gridWidth / size + "px";
    //         gridElement.style.height = gridWidth / size + "px";
            
    //         gridElement.addEventListener("mouseover", (event) => {
    //             if (event.type === 'mouseover' && !mouseDown) {
    //                 return;
    //             } else {
    //                 gridElement.style.backgroundColor = "#000000";
    //             }
    //         });
    //         gridElement.addEventListener("mousedown", (event) => {
    //             if (event.type === 'mouseover' && !mouseDown) {
    //                 return;
    //             } else {
    //                 gridElement.style.backgroundColor = "#000000";
    //             }
    //         });
    //         gridRow.appendChild(gridElement);
    //     }
    // }
}

createGrid(DEFAULTSIZE);

gridSize.addEventListener("change", () => {
    let size = gridSize.value;

    grid.innerHTML = "";

    createGrid(size);
});
