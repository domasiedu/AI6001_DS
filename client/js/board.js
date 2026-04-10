const board = document.getElementById("board");
let selectedSquare = null;
let gameId = null;
let currentTurn = "white";
let currentFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const pieces = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙"
};

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");

    square.classList.add("square");

    if ((row + col) % 2 === 0) {
      square.classList.add("light");
    } else {
      square.classList.add("dark");
    }

    square.dataset.row = row;
    square.dataset.col = col;
    square.addEventListener("click", () => {
      handleSquareClick(square);
    });

    board.appendChild(square);
  }
}

function handleSquareClick(square) {
  if (selectedSquare === null) {
    const row = Number(square.dataset.row);
    const col = Number(square.dataset.col);
    const piece =
      getPieceFromBoard(row, col);

    if (!isPlayersPiece(piece)) {
      console.log(
        "Not your turn piece"
      );

      return;
    }

    selectedSquare = square;
    square.classList.add("selected");
    return;
  }

  const fromRow = Number(selectedSquare.dataset.row);
  const fromCol = Number(selectedSquare.dataset.col);
  const toRow = Number(square.dataset.row);
  const toCol = Number(square.dataset.col);

  sendMoveToBackend(fromRow, fromCol, toRow, toCol);

  selectedSquare.classList.remove("selected");
  selectedSquare = null;
}

function clearBoard() {
  const squares = document.querySelectorAll(".square");

  for (const square of squares) {
    square.textContent = "";
  }
}

function getPieceFromBoard(row, col) {
  const rows = currentFEN.split("/");
  let currentCol = 0;

  for (const char of rows[row]) {
    if (!isNaN(char)) {
      currentCol += Number(char);
    } else {
      if (currentCol === col) {
        return char;
      }

      currentCol++;
    }
  }

  return null;
}

function isPlayersPiece(piece) {
  if (!piece) return false;

  if (currentTurn === "white") {
    return piece === piece.toUpperCase();
  }

  if (currentTurn === "black") {
    return piece === piece.toLowerCase();
  }

  return false;
}

function renderBoardFromFEN(fen) {
  const rows = fen.split("/");

  for (let row = 0; row < 8; row++) {
    let col = 0;

    for (const char of rows[row]) {
      if (!isNaN(char)) {
        col += Number(char);
      } else {
        const square =
          document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
          );

        square.textContent = pieces[char];

        col++;
      }
    }
  }
}

async function sendMoveToBackend(
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  try {
    const response =
      await fetch(
        `http://localhost:3000/api/games/${gameId}/move`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fromRow,
            fromCol,
            toRow,
            toCol
          })
        }
      );

    const data =
      await response.json();

    if (!data.boardState) {
      console.error(
        "Invalid move response:",
        data
      );

      return;
    }

    currentFEN =
      data.boardState;
    currentTurn = data.turn;

    clearBoard();

    renderBoardFromFEN(
      currentFEN
    );
  } catch (error) {
    console.error(
      "Move failed:",
      error
    );
  }
}

async function createNewGame() {
  try {
    const response =
      await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "69d640b123c255e292d9cab7",
          boardState:
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        })
      });

    const data =
      await response.json();

    if (!data.boardState) {
      console.error("Invalid game response:", data);
      return;
    }

    gameId = data._id;

    currentFEN =
      data.boardState;
    currentTurn = data.turn;

    clearBoard();

    renderBoardFromFEN(currentFEN);

    console.log("Game created:", gameId);
  } catch (error) {
    console.error("Game creation failed:", error);
  }
}

createNewGame();
