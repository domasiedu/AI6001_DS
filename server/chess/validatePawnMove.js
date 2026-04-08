function validatePawnMove(board, piece, fromRow, fromCol, toRow, toCol) {
  const isWhitePawn = piece === "P";
  const isBlackPawn = piece === "p";

  if (!isWhitePawn && !isBlackPawn) {
    return false;
  }

  if (fromCol !== toCol) {
    return false;
  }

  const direction = isWhitePawn ? -1 : 1;
  const startRow = isWhitePawn ? 6 : 1;
  const rowDifference = toRow - fromRow;

  if (board[toRow][toCol] !== null) {
    return false;
  }

  if (rowDifference === direction) {
    return true;
  }

  if (fromRow === startRow && rowDifference === direction * 2) {
    const middleRow = fromRow + direction;

    if (board[middleRow][fromCol] !== null) {
      return false;
    }

    return true;
  }

  return false;
}

module.exports = validatePawnMove;
