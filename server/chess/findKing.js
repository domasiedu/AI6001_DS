function findKing(board, kingSymbol) {
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (board[row][col] === kingSymbol) {
        return { row, col };
      }
    }
  }

  throw new Error("King not found");
}

module.exports = findKing;
