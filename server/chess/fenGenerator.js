function generateFEN(board) {
  if (!Array.isArray(board) || board.length !== 8) {
    throw new Error("Board must contain exactly 8 rows");
  }

  const fenRows = board.map((row) => {
    if (!Array.isArray(row) || row.length !== 8) {
      throw new Error("Each board row must contain exactly 8 squares");
    }

    let fenRow = "";
    let emptySquares = 0;

    for (const square of row) {
      if (square === null) {
        emptySquares += 1;
      } else {
        if (emptySquares > 0) {
          fenRow += emptySquares;
          emptySquares = 0;
        }

        fenRow += square;
      }
    }

    if (emptySquares > 0) {
      fenRow += emptySquares;
    }

    return fenRow;
  });

  return fenRows.join("/");
}

module.exports = generateFEN;
