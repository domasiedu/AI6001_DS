function validateBishopMove(board, fromRow, fromCol, toRow, toCol) {
  const rowDifference = toRow - fromRow;
  const colDifference = toCol - fromCol;

  if (Math.abs(rowDifference) !== Math.abs(colDifference) || rowDifference === 0) {
    return false;
  }

  const rowStep = rowDifference > 0 ? 1 : -1;
  const colStep = colDifference > 0 ? 1 : -1;
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow && currentCol !== toCol) {
    if (board[currentRow][currentCol] !== null) {
      return false;
    }

    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
}

module.exports = validateBishopMove;
