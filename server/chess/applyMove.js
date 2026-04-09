const movePiece = require("./movePiece");
const isKingInCheck = require("./isKingInCheck");
const isCheckmate = require("./isCheckmate");
const isStalemate = require("./isStalemate");
const parseFEN = require("./boardParser");

function applyMove(game, fromRow, fromCol, toRow, toCol) {
  const currentFEN = game.boardState;
  const currentPlayer = game.turn || "white";
  const opponentColor = currentPlayer === "white" ? "black" : "white";
  const board = parseFEN(currentFEN);
  const piece = board[fromRow][fromCol];

  if (!piece) {
    throw new Error("No piece at source square");
  }

  const pieceColor = piece === piece.toUpperCase() ? "white" : "black";

  if (pieceColor !== currentPlayer) {
    throw new Error("Invalid move: not your turn");
  }

  const movingPiece = board[fromRow][fromCol];

  if (!game.castlingRights) {
    game.castlingRights = {
      whiteKingMoved: false,
      whiteRookKingsideMoved: false,
      whiteRookQueensideMoved: false,
      blackKingMoved: false,
      blackRookKingsideMoved: false,
      blackRookQueensideMoved: false,
    };
  }

  if (movingPiece === "K") {
    game.castlingRights.whiteKingMoved = true;
  }

  if (movingPiece === "k") {
    game.castlingRights.blackKingMoved = true;
  }

  if (movingPiece === "R" && fromRow === 7 && fromCol === 0) {
    game.castlingRights.whiteRookQueensideMoved = true;
  }

  if (movingPiece === "R" && fromRow === 7 && fromCol === 7) {
    game.castlingRights.whiteRookKingsideMoved = true;
  }

  if (movingPiece === "r" && fromRow === 0 && fromCol === 0) {
    game.castlingRights.blackRookQueensideMoved = true;
  }

  if (movingPiece === "r" && fromRow === 0 && fromCol === 7) {
    game.castlingRights.blackRookKingsideMoved = true;
  }

  const newFEN = movePiece(currentFEN, fromRow, fromCol, toRow, toCol);

  if (!Array.isArray(game.moves)) {
    game.moves = [];
  }

  const capturedPiece = board[toRow][toCol] || null;

  const generateNotation = require("./notation");

  let notation = generateNotation(
    fromRow,
    fromCol,
    toRow,
    toCol,
    movingPiece,
    capturedPiece
  );

  game.boardState = newFEN;
  game.turn = opponentColor;

  const opponentInCheck = isKingInCheck(newFEN, opponentColor);

  if (opponentInCheck) {
    if (isCheckmate(newFEN, opponentColor)) {
      notation += "#";
    } else {
      notation += "+";
    }
  }

  game.moves.push({
    fromRow,
    fromCol,
    toRow,
    toCol,
    piece: movingPiece,
    captured: capturedPiece,
    notation,
    timestamp: new Date(),
  });

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
