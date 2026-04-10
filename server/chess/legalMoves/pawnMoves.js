function getPawnMoves(board, row, col) {
  const moves = [];

  const piece =
    board[row][col];

  const isWhite =
    piece === piece.toUpperCase();

  const direction =
    isWhite ? -1 : 1;

  const startRow =
    isWhite ? 6 : 1;

  const nextRow =
    row + direction;

  // Forward 1
  if (
    board[nextRow] &&
    !board[nextRow][col]
  ) {
    moves.push({
      row: nextRow,
      col: col
    });

    // Forward 2
    if (row === startRow) {
      const twoStep =
        row + direction * 2;

      if (
        board[twoStep] &&
        !board[twoStep][col]
      ) {
        moves.push({
          row: twoStep,
          col: col
        });
      }
    }
  }

  // Capture Left
  if (
    board[nextRow] &&
    board[nextRow][col - 1] &&
    board[nextRow][col - 1]
  ) {
    moves.push({
      row: nextRow,
      col: col - 1
    });
  }

  // Capture Right
  if (
    board[nextRow] &&
    board[nextRow][col + 1] &&
    board[nextRow][col + 1]
  ) {
    moves.push({
      row: nextRow,
      col: col + 1
    });
  }

  return moves;
}

module.exports =
  getPawnMoves;
