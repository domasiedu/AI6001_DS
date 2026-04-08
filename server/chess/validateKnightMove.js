function validateKnightMove(fromRow, fromCol, toRow, toCol) {
  const rowDifference = Math.abs(toRow - fromRow);
  const colDifference = Math.abs(toCol - fromCol);

  return (rowDifference === 2 && colDifference === 1)
    || (rowDifference === 1 && colDifference === 2);
}

module.exports = validateKnightMove;
