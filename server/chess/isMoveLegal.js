const parseFEN = require("./boardParser");
const movePiece = require("./movePiece");
const isKingInCheck = require("./isKingInCheck");

function isMoveLegal(fen, fromRow, fromCol, toRow, toCol) {
  const board = parseFEN(fen);
  const piece = board[fromRow][fromCol];

  if (piece === null) {
    return false;
  }

  const color = piece === piece.toUpperCase() ? "white" : "black";

  try {
    const updatedFEN = movePiece(fen, fromRow, fromCol, toRow, toCol);

    return !isKingInCheck(updatedFEN, color);
  } catch (error) {
    return false;
  }
}

module.exports = isMoveLegal;
