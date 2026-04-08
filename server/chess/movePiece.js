const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");
const validatePawnMove = require("./validatePawnMove");

function movePiece(fen, fromRow, fromCol, toRow, toCol) {
  const board = parseFEN(fen);
  const piece = board[fromRow][fromCol];

  if (piece === null) {
    throw new Error("Invalid move: No piece at source");
  }

  if ((piece === "P" || piece === "p")
    && !validatePawnMove(board, piece, fromRow, fromCol, toRow, toCol)) {
    throw new Error("Invalid pawn move");
  }

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  return generateFEN(board);
}

module.exports = movePiece;
