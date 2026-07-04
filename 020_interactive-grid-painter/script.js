let selectedColor = 'red';
let isDrawing = false;

function setColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll('#palette button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function clearGrid() {
  document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = 'white');
}

function createGrid(size) {
  const container = document.getElementById('grid-container');
  container.style.gridTemplateColumns = `repeat(${size}, 20px)`;
  container.style.gridTemplateRows = `repeat(${size}, 20px)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.addEventListener('click', () => {
      cell.style.backgroundColor = selectedColor;
    });

    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      cell.style.backgroundColor = 'white';
    });

    cell.addEventListener('mouseenter', () => {
      if (isDrawing) cell.style.backgroundColor = selectedColor;
    });

    container.appendChild(cell);
  }
}

document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('dragstart', (e) => e.preventDefault());

createGrid(16);