const COLS = 7;
const ROWS = 6;
const CELL_SIZE = 80;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let selectedColumn = null;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

function drawSlot(column, row) {
  // Center each circular slot within its grid cell.
  const centerX = column * CELL_SIZE + CELL_SIZE / 2;
  const centerY = row * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE * 0.36;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#1a1a1a";
  ctx.fill();
  ctx.closePath();
}

function drawBoard(selectedColumnIndex) {
  // Clear the full canvas before redrawing the board.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paint the board background first.
  ctx.fillStyle = "#0047ab";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Highlight the selected column before drawing the empty slots.
  if (selectedColumnIndex !== null && selectedColumnIndex >= 0 && selectedColumnIndex < COLS) {
    ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
    ctx.fillRect(selectedColumnIndex * CELL_SIZE, 0, CELL_SIZE, canvas.height);
  }

  // Draw all empty board slots.
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLS; column += 1) {
      drawSlot(column, row);
    }
  }
}

canvas.addEventListener("click", (event) => {
  // Convert the mouse position into canvas coordinates.
  const canvasBounds = canvas.getBoundingClientRect();
  const mouseX = event.clientX - canvasBounds.left;

  // Map the click position to a board column.
  const clickedColumn = Math.floor(mouseX / CELL_SIZE);

  if (clickedColumn >= 0 && clickedColumn < COLS) {
    selectedColumn = clickedColumn;
    console.log(`Column clicked: ${clickedColumn}`);
    drawBoard(selectedColumn);
  }
});

drawBoard(selectedColumn);
