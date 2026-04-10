function getKingMoves(
  board,
  row,
  col,
  piece
) {
  const moves = [];

  const isWhite =
    piece === piece.toUpperCase();

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  for (const [directionRow, directionCol] of directions) {
    const newRow =
      row + directionRow;

    const newCol =
      col + directionCol;

    if (
      newRow < 0 ||
      newRow >= 8 ||
      newCol < 0 ||
      newCol >= 8
    ) {
      continue;
    }

    const target =
      board[newRow][newCol];

    if (!target) {
      moves.push({
        row: newRow,
        col: newCol
      });
      continue;
    }

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
  getKingMoves;
