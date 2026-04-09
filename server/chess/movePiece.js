const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");
const validatePawnMove = require("./validatePawnMove");
const validateKnightMove = require("./validateKnightMove");
const validateRookMove = require("./validateRookMove");
const validateBishopMove = require("./validateBishopMove");
const validateQueenMove = require("./validateQueenMove");
const validateKingMove = require("./validateKingMove");
const isKingInCheck = require("./isKingInCheck");

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

  if ((piece === "Q" || piece === "q")
    && !validateQueenMove(board, fromRow, fromCol, toRow, toCol)) {
    throw new Error("Invalid queen move");
  }

  if (piece === "K" || piece === "k") {
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;
    const isNormalKingMove = validateKingMove(fromRow, fromCol, toRow, toCol);
    const isCastlingMove = rowDiff === 0 && Math.abs(colDiff) === 2;

    if (!isNormalKingMove && !isCastlingMove) {
      throw new Error("Invalid king move");
    }
  }

  const color = piece === piece.toUpperCase() ? "white" : "black";

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  const updatedFEN = generateFEN(board);

  if (isKingInCheck(updatedFEN, color)) {
    throw new Error("Illegal move: king would remain in check");
  }

  return updatedFEN;
}

module.exports = movePiece;
