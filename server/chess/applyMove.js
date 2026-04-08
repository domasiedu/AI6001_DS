const movePiece = require("./movePiece");
const isKingInCheck = require("./isKingInCheck");
const isCheckmate = require("./isCheckmate");
const isStalemate = require("./isStalemate");

function applyMove(game, fromRow, fromCol, toRow, toCol) {
  const currentFEN = game.boardState;
  const currentPlayer = game.turn || "white";
  const opponentColor = currentPlayer === "white" ? "black" : "white";
  const newFEN = movePiece(currentFEN, fromRow, fromCol, toRow, toCol);

  if (!Array.isArray(game.moves)) {
    game.moves = [];
  }

  game.moves.push({
    fromRow,
    fromCol,
    toRow,
    toCol,
  });

  game.boardState = newFEN;
  game.turn = opponentColor;

  const opponentInCheck = isKingInCheck(newFEN, opponentColor);

  if (opponentInCheck && isCheckmate(newFEN, opponentColor)) {
    game.status = "checkmate";
    game.winner = currentPlayer;

    return game;
  }

  if (isStalemate(newFEN, opponentColor)) {
    game.status = "stalemate";
    game.winner = null;

    return game;
  }

  game.status = "active";
  game.winner = null;

  return game;
}

module.exports = applyMove;
