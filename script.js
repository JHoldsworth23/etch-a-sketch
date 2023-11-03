// Create a 16 x 16 grid
const grid = document.querySelector('#grid');
const block = document.createElement('div');

block.classList.add('block');

for (let i = 0; i < 16; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
}