const isKingInCheck = require("./isKingInCheck");
const getAllPossibleMoves = require("./getAllPossibleMoves");

function isStalemate(fen, color) {
  if (isKingInCheck(fen, color)) {
    return false;
  }

  const legalMoves = getAllPossibleMoves(fen, color);

  return legalMoves.length === 0;
}

module.exports = isStalemate;
