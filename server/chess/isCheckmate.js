const isKingInCheck = require("./isKingInCheck");
const parseFEN = require("./boardParser");

function isCheckmate(board, color) {
  const getLegalMoves =
    require("./getLegalMoves");

  const boardState =
    typeof board === "string"
      ? parseFEN(board)
      : board;

  if (!isKingInCheck(boardState, color)) {
    return false;
  }

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece =
        boardState[row][col];

      if (!piece) continue;

      const pieceColor =
        piece === piece.toUpperCase()
          ? "white"
          : "black";

      if (pieceColor !== color) continue;

      const moves =
        getLegalMoves(
          boardState,
          row,
          col,
          piece
        );

      if (moves.length > 0) {
        return false;
      }
    }
  }

  return true;
}

module.exports =
  isCheckmate;
