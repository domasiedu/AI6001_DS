const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");
const validatePawnMove = require("./validatePawnMove");
const validateKnightMove = require("./validateKnightMove");
const validateRookMove = require("./validateRookMove");
const validateBishopMove = require("./validateBishopMove");

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

  if ((piece === "N" || piece === "n")
    && !validateKnightMove(fromRow, fromCol, toRow, toCol)) {
    throw new Error("Invalid knight move");
  }

  if ((piece === "R" || piece === "r")
    && !validateRookMove(board, fromRow, fromCol, toRow, toCol)) {
    throw new Error("Invalid rook move");
  }

  if ((piece === "B" || piece === "b")
    && !validateBishopMove(board, fromRow, fromCol, toRow, toCol)) {
    throw new Error("Invalid bishop move");
  }

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  return generateFEN(board);
}

module.exports = movePiece;
