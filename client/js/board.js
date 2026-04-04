const COLS = 7;
const ROWS = 6;
const CELL_SIZE = 80;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

function drawBoard() {
  // Clear the full canvas before redrawing the board.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paint the board background first.
  ctx.fillStyle = "#0047ab";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw all empty board slots.
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLS; column += 1) {
      drawSlot(column, row);
    }
  }
}

drawBoard();
