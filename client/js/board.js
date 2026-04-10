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

    const label = document.createElement("span");
    label.classList.add("coord-label");
    label.textContent = toSquareName(row, col);
    square.appendChild(label);

    square.addEventListener("click", () => {
      handleSquareClick(row, col);
    });

    board.appendChild(square);
  }
}

function toSquareName(row, col) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return `${files[col]}${8 - row}`;
}

async function handleSquareClick(row, col) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const squareName = `${files[col]}${8 - row}`;
  console.log("Clicked square:", squareName, "row:", row, "col:", col);

  const piece =
    getPieceFromBoard(row, col);

  // FIRST CLICK - SELECT PIECE
  if (!selectedSquare) {
    if (!piece) return;

    if (!isPlayersPiece(piece)) return;

    selectedSquare = {
      row,
      col
    };

    await fetchLegalMoves(
      row,
      col
    );
    return;
  }

  // SECOND CLICK - MOVE PIECE
  const fromRow =
    selectedSquare.row;

  const fromCol =
    selectedSquare.col;

  selectedSquare = null;

  clearHighlights();

  await sendMoveToBackend(
    fromRow,
    fromCol,
    row,
    col
  );
}

function clearBoard() {
  const squares = document.querySelectorAll(".square");

  for (const square of squares) {
    const label =
      square.querySelector(".coord-label");

    square.textContent = "";

    if (label) {
      square.appendChild(label);
    }
  }
}

function clearHighlights() {
  const squares = document.querySelectorAll(".square");

  for (const square of squares) {
    square.classList.remove("legal");
  }
}

function highlightLegalMoves(moves) {
  clearHighlights();

  moves.forEach((move) => {
    const square =
      document.querySelector(
        `[data-row="${move.row}"][data-col="${move.col}"]`
      );

    square.classList.add("legal");
  });
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
        const label =
          square.querySelector(".coord-label");

        square.textContent = pieces[char];

        if (label) {
          square.appendChild(label);
        }

        col++;
      }
    }
  }
}

async function fetchLegalMoves(row, col) {
  try {
    const response =
      await fetch(
        `http://localhost:3000/api/games/${gameId}/legal-moves?row=${row}&col=${col}`
      );

    const data =
      await response.json();

    console.log(
      "Legal moves received:",
      data.moves
    );

    highlightLegalMoves(
      data.moves
    );
  } catch (error) {
    console.error(
      "Legal move fetch failed:",
      error
    );
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

    if (data.status === "finished") {
      let message = "";

      if (data.winner === "draw") {
        message = "Game Drawn (Stalemate)";
      } else {
        message =
          "Checkmate! " +
          data.winner +
          " wins";
      }

      setTimeout(() => {
        alert(message);
      }, 100);
    }

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
