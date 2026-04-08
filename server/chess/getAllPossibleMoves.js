const parseFEN = require("./boardParser");
const movePiece = require("./movePiece");

function getAllPossibleMoves(fen, color) {
  const board = parseFEN(fen);
  const moves = [];

  for (let fromRow = 0; fromRow < board.length; fromRow += 1) {
    for (let fromCol = 0; fromCol < board[fromRow].length; fromCol += 1) {
      const piece = board[fromRow][fromCol];

      if (piece === null) {
        continue;
      }

      if (color === "white" && piece !== piece.toUpperCase()) {
        continue;
      }

      if (color === "black" && piece !== piece.toLowerCase()) {
        continue;
      }

      for (let toRow = 0; toRow < board.length; toRow += 1) {
        for (let toCol = 0; toCol < board[toRow].length; toCol += 1) {
          try {
            movePiece(fen, fromRow, fromCol, toRow, toCol);

            moves.push({
              fromRow,
              fromCol,
              toRow,
              toCol,
            });
          } catch (error) {
            // Ignore invalid moves while collecting legal ones.
          }
        }
      }
    }
  }

  return moves;
}

module.exports = getAllPossibleMoves;
