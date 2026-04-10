const parseFEN = require("./boardParser");

function isKingInCheck(board, color) {
  const boardState =
    typeof board === "string"
      ? parseFEN(board)
      : board;

  let kingRow = null;
  let kingCol = null;

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece =
        boardState[row][col];

      if (piece !== "k" && piece !== "K") {
        continue;
      }

      const pieceColor =
        piece === piece.toUpperCase()
          ? "white"
          : "black";

      if (pieceColor === color) {
        kingRow = row;
        kingCol = col;
      }
    }
  }

  console.log(
    "KING FOUND:",
    kingRow,
    kingCol
  );

  const opponent =
    color === "white"
      ? "black"
      : "white";

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece =
        boardState[row][col];

      if (!piece) {
        continue;
      }

      const pieceColor =
        piece === piece.toUpperCase()
          ? "white"
          : "black";

      if (pieceColor !== opponent) {
        continue;
      }

      const moves =
        require("./getLegalMoves")(
          boardState,
          row,
          col,
          piece,
          {
            skipKingSafety: true
          }
        );

      const attacksKing =
        moves.some((move) => (
          move.row === kingRow &&
          move.col === kingCol
        ));

      if (attacksKing) {
        return true;
      }
    }
  }

  return false;
}

module.exports =
  isKingInCheck;
