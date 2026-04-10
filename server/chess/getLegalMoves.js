const getPawnMoves =
  require("./legalMoves/pawnMoves");
const getKnightMoves =
  require("./legalMoves/knightMoves");
const getBishopMoves =
  require("./legalMoves/bishopMoves");
const getRookMoves =
  require("./legalMoves/rookMoves");
const getQueenMoves =
  require("./legalMoves/queenMoves");
const getKingMoves =
  require("./legalMoves/kingMoves");
const isKingInCheck =
  require("./isKingInCheck");
const applyMove =
  require("./applyMove");

function getPieceMoves(
  board,
  row,
  col,
  piece
) {
  const pieceType =
    piece.toLowerCase();

  switch (pieceType) {
    case "p":
      return getPawnMoves(
        board,
        row,
        col,
        piece
      );

    case "n":
      return getKnightMoves(
        board,
        row,
        col,
        piece
      );

    case "b":
      return getBishopMoves(
        board,
        row,
        col,
        piece
      );

    case "r":
      return getRookMoves(
        board,
        row,
        col,
        piece
      );

    case "q":
      return getQueenMoves(
        board,
        row,
        col,
        piece
      );

    case "k":
      return getKingMoves(
        board,
        row,
        col,
        piece
      );

    default:
      return [];
  }
}

function getLegalMoves(
  board,
  row,
  col,
  piece,
  options = {}
) {
  const moves =
    getPieceMoves(
      board,
      row,
      col,
      piece
    );

  if (options.skipKingSafety) {
    return moves;
  }

  const safeMoves = [];

  for (const move of moves) {
    const boardCopy =
      JSON.parse(JSON.stringify(board));

    applyMove(
      boardCopy,
      row,
      col,
      move.row,
      move.col
    );

    const color =
      piece === piece.toUpperCase()
        ? "white"
        : "black";

    const inCheck =
      isKingInCheck(
        boardCopy,
        color
      );

    if (!inCheck) {
      safeMoves.push(move);
    }
  }

  return safeMoves;
}

module.exports =
  getLegalMoves;
