function getKnightMoves(
  board,
  row,
  col,
  piece
) {
  const moves = [];

  const offsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1]
  ];

  for (const [rOffset, cOffset] of offsets) {
    const newRow =
      row + rOffset;

    const newCol =
      col + cOffset;

    if (
      newRow < 0 ||
      newRow >= 8 ||
      newCol < 0 ||
      newCol >= 8
    ) continue;

    const target =
      board[newRow][newCol];

    if (!target) {
      moves.push({
        row: newRow,
        col: newCol
      });
      continue;
    }

    const isWhite =
      piece === piece.toUpperCase();

    const targetIsWhite =
      target === target.toUpperCase();

    if (isWhite !== targetIsWhite) {
      moves.push({
        row: newRow,
        col: newCol
      });
    }
  }

  return moves;
}

module.exports =
  getKnightMoves;
