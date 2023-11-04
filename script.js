// Create a 16 x 16 grid
const grid = document.querySelector("#grid");
const gridStyle = window.getComputedStyle(grid);
const gridWidth = gridStyle.getPropertyValue("width").split("p")[0];

let mousedown = false;
document.body.onmousedown = () => {mousedown = true}
document.body.onmouseup = () => {mousedown = false}

for (let i = 0; i < 16; i++) {
    const row = document.createElement("div");
    row.classList.add("grid-row");
    grid.appendChild(row);

    for (let j = 0; j < 16; j++) {
        const block = document.createElement("div");
        block.classList.add("grid-element");
        block.style.width = gridWidth / 16 + "px";
        block.style.height = gridWidth / 16 + "px";
        row.appendChild(block);
        
        block.addEventListener("mouseover", (event) => {
            event.preventDefault();
            block.style.backgroundColor = "rgb(0, 0, 0)";
            console.log("change the background color");
        });
    }
}