Create queen legal move generator.

File:

server/chess/legalMoves/queenMoves.js

Export function:

getQueenMoves(
  board,
  row,
  col,
  piece
)

Implementation:

Queen moves are a combination of:

• Bishop moves
• Rook moves

Import both:

const getBishopMoves =
  require("./bishopMoves");

const getRookMoves =
  require("./rookMoves");

Inside function:

Call both:

const bishopMoves =
  getBishopMoves(
    board,
    row,
    col,
    piece
  );

const rookMoves =
  getRookMoves(
    board,
    row,
    col,
    piece
  );

Combine:

const moves = [

  ...bishopMoves,
  ...rookMoves

];

Return:

moves;
