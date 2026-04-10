function getRookMoves(
  board,
  row,
  col,
  piece
) {
  const moves = [];

  const isWhite =
    piece === piece.toUpperCase();

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  for (const [directionRow, directionCol] of directions) {
    let newRow =
      row + directionRow;

    let newCol =
      col + directionCol;

    while (
      newRow >= 0 &&
      newRow < 8 &&
      newCol >= 0 &&
      newCol < 8
    ) {
      const target =
        board[newRow][newCol];

      if (!target) {
        moves.push({
          row: newRow,
          col: newCol
        });
      } else {
        const targetIsWhite =
          target === target.toUpperCase();

        if (isWhite !== targetIsWhite) {
          moves.push({
            row: newRow,
            col: newCol
          });
        }

        break;
      }

      newRow += directionRow;
      newCol += directionCol;
    }
  }

  return moves;
}

module.exports =
  getRookMoves;
