const validatePawnMove = require("./validatePawnMove");
const validateKnightMove = require("./validateKnightMove");
const validateRookMove = require("./validateRookMove");
const validateBishopMove = require("./validateBishopMove");
const validateQueenMove = require("./validateQueenMove");
const validateKingMove = require("./validateKingMove");

function isSquareAttacked(board, targetRow, targetCol, attackerColor) {
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const piece = board[row][col];

      if (piece === null) {
        continue;
      }

      if (attackerColor === "white" && piece !== piece.toUpperCase()) {
        continue;
      }

      if (attackerColor === "black" && piece !== piece.toLowerCase()) {
        continue;
      }

      if ((piece === "P" || piece === "p")
        && validatePawnMove(board, piece, row, col, targetRow, targetCol)) {
        return true;
      }

      if ((piece === "N" || piece === "n")
        && validateKnightMove(row, col, targetRow, targetCol)) {
        return true;
      }

      if ((piece === "R" || piece === "r")
        && validateRookMove(board, row, col, targetRow, targetCol)) {
        return true;
      }

      if ((piece === "B" || piece === "b")
        && validateBishopMove(board, row, col, targetRow, targetCol)) {
        return true;
      }

      if ((piece === "Q" || piece === "q")
        && validateQueenMove(board, row, col, targetRow, targetCol)) {
        return true;
      }

      if ((piece === "K" || piece === "k")
        && validateKingMove(row, col, targetRow, targetCol)) {
        return true;
      }
    }
  }

  return false;
}

module.exports = isSquareAttacked;
