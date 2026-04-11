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
const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0
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
  if (
    document
      .getElementById("game-over-banner")
      .textContent !== ""
  ) {
    return;
  }

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

function highlightLastMove(move) {
  if (!move) return;

  const fromSquare =
    document.querySelector(
      `[data-row="${move.fromRow}"][data-col="${move.fromCol}"]`
    );

  const toSquare =
    document.querySelector(
      `[data-row="${move.toRow}"][data-col="${move.toCol}"]`
    );

  if (fromSquare)
    fromSquare.classList.add("last-move");

  if (toSquare)
    toSquare.classList.add("last-move");
}

function clearLastMoveHighlight() {
  const squares =
    document.querySelectorAll(".last-move");

  squares.forEach((square) => {
    square.classList.remove("last-move");
  });
}

function highlightKingInCheck(color) {
  const rows =
    currentFEN.split("/");

  for (let row = 0; row < 8; row++) {
    let col = 0;

    for (const char of rows[row]) {
      if (!isNaN(char)) {
        col += Number(char);
      } else {
        if (
          (color === "white" && char === "K") ||
          (color === "black" && char === "k")
        ) {
          const kingSquare =
            document.querySelector(
              `[data-row="${row}"][data-col="${col}"]`
            );

          if (kingSquare) {
            kingSquare.classList.add(
              "king-in-check"
            );
          }
        }

        col++;
      }
    }
  }
}

function clearCheckHighlight() {
  document
    .querySelectorAll(".king-in-check")
    .forEach((square) => {
      square.classList.remove(
        "king-in-check"
      );
    });
}

function showGameOverBanner(message) {
  const banner =
    document.getElementById(
      "game-over-banner"
    );

  banner.textContent =
    message;

  banner.classList.remove(
    "hidden"
  );
}

function showAIThinking() {
  document
    .getElementById("ai-thinking")
    .classList.remove("hidden");
}

function hideAIThinking() {
  document
    .getElementById("ai-thinking")
    .classList.add("hidden");
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

function updateMoveHistory(moves) {
  const history =
    document.getElementById(
      "move-history"
    );

  history.innerHTML = "";

  moves.forEach((move) => {
    const item =
      document.createElement("li");

    item.textContent =
      move.notation;

    history.appendChild(item);
  });
}

function updateCapturedPieces(moves) {
  const whiteBox =
    document.getElementById(
      "white-captures"
    );

  const blackBox =
    document.getElementById(
      "black-captures"
    );

  whiteBox.innerHTML = "";
  blackBox.innerHTML = "";

  moves.forEach((move) => {
    if (move.captured) {
      const pieceSymbol =
        pieces[move.captured];

      const span =
        document.createElement("span");

      span.textContent =
        pieceSymbol;

      if (
        move.captured ===
        move.captured.toLowerCase()
      ) {
        whiteBox.appendChild(span);
      } else {
        blackBox.appendChild(span);
      }
    }
  });
}

function updateMaterialScore(moves) {
  let whiteScore = 0;
  let blackScore = 0;

  moves.forEach((move) => {
    if (move.captured) {
      const value =
        pieceValues[
          move.captured.toLowerCase()
        ];

      if (
        move.captured ===
        move.captured.toLowerCase()
      ) {
        whiteScore += value;
      } else {
        blackScore += value;
      }
    }
  });

  document
    .getElementById("white-material")
    .textContent =
      `White Material: +${whiteScore}`;

  document
    .getElementById("black-material")
    .textContent =
      `Black Material: +${blackScore}`;
}

async function fetchLegalMoves(row, col) {
  try {
    const response =
      await fetch(
        `http://localhost:3000/api/games/${gameId}/legal-moves?row=${row}&col=${col}`
      );

    const data =
      await response.json();
    console.log("Legal moves response:", data);

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
    showAIThinking();

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
      if (data.winner === "white") {
        showGameOverBanner(
          "CHECKMATE — WHITE WINS"
        );
      } else if (data.winner === "black") {
        showGameOverBanner(
          "CHECKMATE — BLACK WINS"
        );
      } else {
        showGameOverBanner(
          "STALEMATE — DRAW"
        );
      }

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

    if (data.status === "finished") {
      console.log("GAME OVER:", data.winner);
      alert(
        "Game Over — Winner: " +
          data.winner
      );
      isBoardLocked = true;
    }

    clearCheckHighlight();

    if (data.check) {
      highlightKingInCheck(
        data.turn
      );
    }

    clearLastMoveHighlight();

    const lastMove =
      data.moves[
        data.moves.length - 1
      ];

    highlightLastMove(
      lastMove
    );

    updateMoveHistory(
      data.moves
    );

    updateCapturedPieces(
      data.moves
    );

    updateMaterialScore(
      data.moves
    );
  } catch (error) {
    console.error(
      "Move failed:",
      error
    );
  } finally {
    hideAIThinking();
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

document
  .getElementById("restart-game-btn")
  .addEventListener("click", async () => {
    selectedSquare = null;
    clearHighlights();
    clearLastMoveHighlight();
    clearCheckHighlight();

    const banner =
      document.getElementById("game-over-banner");
    banner.textContent = "";
    banner.classList.add("hidden");

    await createNewGame();

    const history =
      document.getElementById("move-history");
    if (history) history.innerHTML = "";

    const whiteCaptures =
      document.getElementById("white-captures");
    if (whiteCaptures) whiteCaptures.innerHTML = "";

    const blackCaptures =
      document.getElementById("black-captures");
    if (blackCaptures) blackCaptures.innerHTML = "";

    updateMaterialScore([]);
  });

document
  .getElementById("undo-btn")
  .addEventListener("click", async () => {
    try {
      const response =
        await fetch(
          `http://localhost:3000/api/games/${gameId}/undo`,
          { method: "PUT" }
        );

      const data =
        await response.json();

      currentFEN =
        data.boardState;

      currentTurn =
        data.turn;

      clearBoard();

      renderBoardFromFEN(
        currentFEN
      );

      updateMoveHistory(
        data.moves
      );

      updateCapturedPieces(
        data.moves
      );

      updateMaterialScore(
        data.moves
      );
    } catch (error) {
      console.error(
        "Undo failed:",
        error
      );
    }
  });
