function validatePawnMove(board, piece, fromRow, fromCol, toRow, toCol) {
  const isWhitePawn = piece === "P";
  const isBlackPawn = piece === "p";

  if (!isWhitePawn && !isBlackPawn) {
    return false;
  }

  const direction = isWhitePawn ? -1 : 1;
  const startRow = isWhitePawn ? 6 : 1;
  const rowDifference = toRow - fromRow;
  const colDifference = toCol - fromCol;
  const targetSquare = board[toRow][toCol];

  if (colDifference === 0) {
    if (targetSquare !== null) {
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
  }

  if (rowDifference === direction && Math.abs(colDifference) === 1) {
    if (targetSquare === null) {
      return false;
    }

    if (isWhitePawn) {
      return targetSquare === targetSquare.toLowerCase();
    }

    return targetSquare === targetSquare.toUpperCase();
  }

  return false;
}

module.exports = validatePawnMove;
