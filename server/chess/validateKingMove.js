function validateKingMove(fromRow, fromCol, toRow, toCol) {
  const rowDifference = Math.abs(toRow - fromRow);
  const colDifference = Math.abs(toCol - fromCol);

  if (rowDifference === 0 && colDifference === 0) {
    return false;
  }

  return rowDifference <= 1 && colDifference <= 1;
}

module.exports = validateKingMove;
