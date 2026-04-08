const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");

function movePiece(fen, fromRow, fromCol, toRow, toCol) {
  const board = parseFEN(fen);
  const piece = board[fromRow][fromCol];

  if (piece === null) {
    throw new Error("Invalid move: No piece at source");
  }

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  return generateFEN(board);
}

module.exports = movePiece;
