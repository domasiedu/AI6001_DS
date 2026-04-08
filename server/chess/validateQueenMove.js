const validateRookMove = require("./validateRookMove");
const validateBishopMove = require("./validateBishopMove");

function validateQueenMove(board, fromRow, fromCol, toRow, toCol) {
  if (validateRookMove(board, fromRow, fromCol, toRow, toCol)) {
    return true;
  }

  if (validateBishopMove(board, fromRow, fromCol, toRow, toCol)) {
    return true;
  }

  return false;
}

module.exports = validateQueenMove;
