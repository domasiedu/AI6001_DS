const getInitialBoard = require("./initialBoard");
const movePiece = require("./movePiece");

function rebuildBoardFromMoves(moves) {
  let boardState = getInitialBoard();

  for (const move of moves) {
    boardState = movePiece(
      boardState,
      move.fromRow,
      move.fromCol,
      move.toRow,
      move.toCol
    );
  }

  return boardState;
}

module.exports = rebuildBoardFromMoves;
