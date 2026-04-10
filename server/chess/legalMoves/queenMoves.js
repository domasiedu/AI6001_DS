const getBishopMoves =
  require("./bishopMoves");

const getRookMoves =
  require("./rookMoves");

function getQueenMoves(
  board,
  row,
  col,
  piece
) {
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

  const moves = [
    ...bishopMoves,
    ...rookMoves
  ];

  return moves;
}

module.exports =
  getQueenMoves;
