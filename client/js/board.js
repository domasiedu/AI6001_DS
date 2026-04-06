const COLS = 7;
const ROWS = 6;
const CELL_SIZE = 80;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let selectedColumn = null;
let board = createBoard();
let currentPlayer = 1;
let gameOver = false;
let winningCells = [];
let aiMoveTimeout = null;

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

function copyBoard(originalBoard) {
  return originalBoard.map((row) => [...row]);
}

function getNextOpenRow(simBoard, column) {
  for (let row = ROWS - 1; row >= 0; row -= 1) {
    if (simBoard[row][column] === 0) {
      return row;
    }
  }

  return null;
}

function simulateDrop(simBoard, row, column, player) {
  simBoard[row][column] = player;
}

function countConnectedSimulated(
  simBoard,
  startRow,
  startColumn,
  rowStep,
  columnStep,
  player
) {
  let count = 0;
  let row = startRow + rowStep;
  let column = startColumn + columnStep;

  while (
    row >= 0 &&
    row < ROWS &&
    column >= 0 &&
    column < COLS &&
    simBoard[row][column] === player
  ) {
    count += 1;
    row += rowStep;
    column += columnStep;
  }

  return count;
}

function checkWinSimulated(simBoard, row, column, player) {
  const horizontal =
    1 +
    countConnectedSimulated(simBoard, row, column, 0, -1, player) +
    countConnectedSimulated(simBoard, row, column, 0, 1, player);

  if (horizontal >= 4) {
    return true;
  }

  const vertical =
    1 +
    countConnectedSimulated(simBoard, row, column, -1, 0, player) +
    countConnectedSimulated(simBoard, row, column, 1, 0, player);

  if (vertical >= 4) {
    return true;
  }

  const diagonal1 =
    1 +
    countConnectedSimulated(simBoard, row, column, -1, -1, player) +
    countConnectedSimulated(simBoard, row, column, 1, 1, player);

  if (diagonal1 >= 4) {
    return true;
  }

  const diagonal2 =
    1 +
    countConnectedSimulated(simBoard, row, column, 1, -1, player) +
    countConnectedSimulated(simBoard, row, column, -1, 1, player);

  if (diagonal2 >= 4) {
    return true;
  }

  return false;
}

function countConnectedPieces(startRow, startColumn, rowStep, columnStep) {
  // Count matching pieces in one direction until the chain breaks.
  const player = board[startRow][startColumn];
  let connectedPieces = 0;
  let row = startRow + rowStep;
  let column = startColumn + columnStep;

  while (
    row >= 0 &&
    row < ROWS &&
    column >= 0 &&
    column < COLS &&
    board[row][column] === player
  ) {
    connectedPieces += 1;
    row += rowStep;
    column += columnStep;
  }

  return connectedPieces;
}
function collectConnectedCells(startRow, startColumn, rowStep, columnStep) {
  // Collect matching piece positions in one direction until the chain breaks.
  const player = board[startRow][startColumn];
  const cells = [];
  let row = startRow + rowStep;
  let column = startColumn + columnStep;

  while (
    row >= 0 &&
    row < ROWS &&
    column >= 0 &&
    column < COLS &&
    board[row][column] === player
  ) {
    cells.push({ row, column });
    row += rowStep;
    column += columnStep;
  }

  return cells;
}

function findWinningCells(row, column) {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal \
    [1, -1],  // diagonal /
  ];

  for (const [rowStep, columnStep] of directions) {
    const backwardCells = collectConnectedCells(row, column, -rowStep, -columnStep).reverse();
    const forwardCells = collectConnectedCells(row, column, rowStep, columnStep);

    const lineCells = [
      ...backwardCells,
      { row, column },
      ...forwardCells,
    ];

    if (lineCells.length >= 4) {
      return lineCells.slice(0, 4);
    }
  }

  return [];
}

function checkWin(row, column) {
  // Combine left and right checks to detect horizontal connections of four.
  const horizontalCount =
    1 +
    countConnectedPieces(row, column, 0, -1) +
    countConnectedPieces(row, column, 0, 1);

  if (horizontalCount >= 4) {
    winningCells = findWinningCells(row, column);
    return true;
  }

  // Combine upward and downward checks to detect vertical connections of four.
  const verticalCount =
    1 +
    countConnectedPieces(row, column, -1, 0) +
    countConnectedPieces(row, column, 1, 0);

  if (verticalCount >= 4) {
    winningCells = findWinningCells(row, column);
    return true;
  }

  // Combine top-left and bottom-right checks for "\" diagonal wins.
  const downwardDiagonalCount =
    1 +
    countConnectedPieces(row, column, -1, -1) +
    countConnectedPieces(row, column, 1, 1);

  if (downwardDiagonalCount >= 4) {
    winningCells = findWinningCells(row, column);
    return true;
  }

  // Combine bottom-left and top-right checks for "/" diagonal wins.
  const upwardDiagonalCount =
    1 +
    countConnectedPieces(row, column, 1, -1) +
    countConnectedPieces(row, column, -1, 1);

  if (upwardDiagonalCount >= 4) {
    winningCells = findWinningCells(row, column);
    return true;
  }

  winningCells = [];
  return false;
}

function checkDraw() {
  // If the top row is full, no more valid moves remain.
  for (let column = 0; column < COLS; column += 1) {
    if (board[0][column] === 0) {
      return false;
    }
  }

  return true;
}

function getValidColumns(targetBoard = board) {
  const validColumns = [];

  for (let column = 0; column < COLS; column += 1) {
    if (targetBoard[0][column] === 0) {
      validColumns.push(column);
    }
  }

  return validColumns;
}

function getRandomColumn() {
  const validColumns = getValidColumns();

  if (validColumns.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * validColumns.length);

  return validColumns[randomIndex];
}

function evaluateBoard(simBoard, player) {
  const opponent = player === 1 ? 2 : 1;
  let score = 0;

  // Favor center control because it creates more connection opportunities.
  const centerColumn = Math.floor(COLS / 2);
  let centerCount = 0;
  let opponentCenterCount = 0;

  for (let row = 0; row < ROWS; row += 1) {
    if (simBoard[row][centerColumn] === player) {
      centerCount += 1;
    } else if (simBoard[row][centerColumn] === opponent) {
      opponentCenterCount += 1;
    }
  }

  score += centerCount * 3;
  score -= opponentCenterCount * 3;

  return score;
}

function minimax(simBoard, depth, maximizingPlayer) {
  const validColumns = getValidColumns(simBoard);

  if (depth === 0 || validColumns.length === 0) {
    return {
      score: evaluateBoard(simBoard, 2),
    };
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    let bestColumn = validColumns[0];

    for (const column of validColumns) {
      const tempBoard = copyBoard(simBoard);
      const row = getNextOpenRow(tempBoard, column);

      if (row === null) {
        continue;
      }

      simulateDrop(tempBoard, row, column, 2);

      if (checkWinSimulated(tempBoard, row, column, 2)) {
        return {
          column,
          score: Infinity,
        };
      }

      const evaluation = minimax(tempBoard, depth - 1, false).score;

      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestColumn = column;
      }
    }

    return {
      column: bestColumn,
      score: maxEval,
    };
  }

  let minEval = Infinity;

  for (const column of validColumns) {
    const tempBoard = copyBoard(simBoard);
    const row = getNextOpenRow(tempBoard, column);

    if (row === null) {
      continue;
    }

    simulateDrop(tempBoard, row, column, 1);

    if (checkWinSimulated(tempBoard, row, column, 1)) {
      return {
        score: -Infinity,
      };
    }

    const evaluation = minimax(tempBoard, depth - 1, true).score;
    minEval = Math.min(minEval, evaluation);
  }

  return {
    score: minEval,
  };
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function processTurn(row, column) {
  if (checkWin(row, column)) {
    gameOver = true;
    drawBoard(selectedColumn);
    alert(`Player ${currentPlayer} wins!`);
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    drawBoard(selectedColumn);
    alert("Game is a draw!");
    return;
  }

  switchPlayer();
  console.log(`Current Player: ${currentPlayer}`);
  drawBoard(selectedColumn);

  if (currentPlayer === 2) {
    aiMoveTimeout = setTimeout(aiMove, 500);
  }
}

function dropPiece(column) {
  if (gameOver) {
    return;
  }

  const availableRow = getAvailableRow(column);

  selectedColumn = column;

  if (availableRow === -1) {
    drawBoard(selectedColumn);
    return;
  }

  // Place the current player's piece in the lowest open slot of the column.
  board[availableRow][column] = currentPlayer;
  processTurn(availableRow, column);
}

function aiMove() {
  aiMoveTimeout = null;

  if (gameOver || currentPlayer !== 2) {
    return;
  }

  const result = minimax(board, 3, true);
  const column = result.column;

  if (column !== null) {
    dropPiece(column);
  }
}

function resetGame() {
  if (aiMoveTimeout !== null) {
    clearTimeout(aiMoveTimeout);
    aiMoveTimeout = null;
  }

  board = createBoard();
  currentPlayer = 1;
  gameOver = false;
  winningCells = [];
  selectedColumn = null;
  drawBoard();
}

function drawSlot(column, row, pieceValue) {
  // Center each circular slot within its grid cell.
  const centerX = column * CELL_SIZE + CELL_SIZE / 2;
  const centerY = row * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE * 0.36;
  const safeWinningCells = Array.isArray(winningCells) ? winningCells : [];
  const isWinningCell = safeWinningCells.some(
    (cell) => cell.row === row && cell.column === column
  );

  let slotColor = "#1a1a1a";

  if (pieceValue === 1) {
    slotColor = "#ff0000";
  } else if (pieceValue === 2) {
    slotColor = "#ffff00";
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = slotColor;
  ctx.fill();
  ctx.closePath();

  if (isWinningCell) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
  }
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
  if (gameOver || currentPlayer !== 1) {
    return;
  }

  // Convert the mouse position into canvas coordinates.
  const canvasBounds = canvas.getBoundingClientRect();
  const mouseX = event.clientX - canvasBounds.left;

  // Map the click position to a board column.
  const clickedColumn = Math.floor(mouseX / CELL_SIZE);

  if (clickedColumn >= 0 && clickedColumn < COLS) {
    dropPiece(clickedColumn);
  }
});

document
  .getElementById("restartButton")
  .addEventListener("click", resetGame);

drawBoard(selectedColumn);
