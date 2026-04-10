function getPawnMoves(
  board,
  row,
  col,
  piece,
  enPassantTarget = null
) {
  const moves = [];

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

  // En passant capture
  if (enPassantTarget) {
    const direction =
      piece === piece.toUpperCase()
        ? -1
        : 1;

    const targetRow =
      row + direction;

    const targetColLeft =
      col - 1;

    const targetColRight =
      col + 1;

    if (
      targetRow === enPassantTarget.row
    ) {
      if (
        targetColLeft ===
        enPassantTarget.col
      ) {
        moves.push({
          row: targetRow,
          col: targetColLeft,
          enPassant: true
        });
      }

      if (
        targetColRight ===
        enPassantTarget.col
      ) {
        moves.push({
          row: targetRow,
          col: targetColRight,
          enPassant: true
        });
      }
    }
  }

  return moves;
}

module.exports =
  getPawnMoves;
