function validateRookMove(board, fromRow, fromCol, toRow, toCol) {
  const sameRow = fromRow === toRow;
  const sameCol = fromCol === toCol;

  if ((sameRow && sameCol) || (!sameRow && !sameCol)) {
    return false;
  }

  if (sameRow) {
    const step = toCol > fromCol ? 1 : -1;

    for (let col = fromCol + step; col !== toCol; col += step) {
      if (board[fromRow][col] !== null) {
        return false;
      }
    }

    return true;
  }

  const step = toRow > fromRow ? 1 : -1;

  for (let row = fromRow + step; row !== toRow; row += step) {
    if (board[row][fromCol] !== null) {
      return false;
    }
  }

  return true;
}

module.exports = validateRookMove;
