const parseFEN = require("./boardParser");
const findKing = require("./findKing");
const isSquareAttacked = require("./isSquareAttacked");

function isKingInCheck(fen, color) {
  const board = parseFEN(fen);
  const kingSymbol = color === "white" ? "K" : "k";
  const attackerColor = color === "white" ? "black" : "white";
  const kingPosition = findKing(board, kingSymbol);

  return isSquareAttacked(
    board,
    kingPosition.row,
    kingPosition.col,
    attackerColor,
  );
}

module.exports = isKingInCheck;
