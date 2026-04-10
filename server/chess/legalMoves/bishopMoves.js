function getBishopMoves(
  board,
  row,
  col,
  piece
) {
  const moves = [];

  const isWhite =
    piece === piece.toUpperCase();

  const directions = [
    [-1, -1], // up-left
    [-1, 1],  // up-right
    [1, -1],  // down-left
    [1, 1]    // down-right
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

          console.log(
      "Checking square:",
      newRow,
      newCol,
      "value:",
      board[newRow][newCol]
    );

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

  if (piece === "q" && row === 0 && col === 3) {
    console.log("BISHOP MOVES FOR q@d8:", moves);
  }

  return moves;
}

module.exports =
  getBishopMoves;
