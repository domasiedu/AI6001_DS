const getRookMoves =
  require("./rookMoves");

const getBishopMoves =
  require("./bishopMoves");

function getQueenMoves(
  board,
  row,
  col,
  piece
) {
  const rookMoves =
    getRookMoves(
      board,
      row,
      col,
      piece
    );

  const bishopMoves =
    getBishopMoves(
      board,
      row,
      col,
      piece
    );

  if (piece === "q" && row === 0 && col === 3) {
    console.log("ROOK MOVES FOR q@d8:", rookMoves);
    console.log("BISHOP MOVES FOR q@d8 FROM QUEEN:", bishopMoves);
    console.log("QUEEN MOVES FOR q@d8:", [...rookMoves, ...bishopMoves]);
  }

  return [
    ...rookMoves,
    ...bishopMoves
  ];
}

module.exports =
  getQueenMoves;
