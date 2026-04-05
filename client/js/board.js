const COLS = 7;
const ROWS = 6;
const CELL_SIZE = 80;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let selectedColumn = null;
let board = createBoard();

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

function createBoard() {
  // Build a fresh board with every slot initialized as empty.
  const newBoard = [];

  for (let row = 0; row < ROWS; row += 1) {
    newBoard.push(Array(COLS).fill(0));
  }

  return newBoard;
}

function getAvailableRow(column) {
  // Search upward from the bottom to find the first empty slot.
  for (let row = ROWS - 1; row >= 0; row -= 1) {
    if (board[row][column] === 0) {
      return row;
    }
  }

  return -1;
}

function drawSlot(column, row, pieceValue) {
  // Center each circular slot within its grid cell.
  const centerX = column * CELL_SIZE + CELL_SIZE / 2;
  const centerY = row * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE * 0.36;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = pieceValue === 1 ? "#ff0000" : "#1a1a1a";
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

  // Draw every board slot, including any placed player pieces.
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLS; column += 1) {
      drawSlot(column, row, board[row][column]);
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
    const availableRow = getAvailableRow(clickedColumn);

    selectedColumn = clickedColumn;

    if (availableRow !== -1) {
      // Place the player's piece in the lowest open slot of the column.
      board[availableRow][clickedColumn] = 1;
    }

    drawBoard(selectedColumn);
  }
});

drawBoard(selectedColumn);
