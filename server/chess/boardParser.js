function parseFEN(fen) {
  const rows = fen.split("/");

  if (rows.length !== 8) {
    throw new Error("FEN board must contain exactly 8 rows");
  }

  const board = rows.map((row) => {
    const parsedRow = [];

    for (const char of row) {
      const emptySquares = Number(char);

      if (!Number.isNaN(emptySquares) && emptySquares > 0) {
        for (let i = 0; i < emptySquares; i += 1) {
          parsedRow.push(null);
        }
      } else {
        parsedRow.push(char);
      }
    }

    if (parsedRow.length !== 8) {
      throw new Error("Each FEN row must contain exactly 8 squares");
    }

    return parsedRow;
  });

  return board;
}

module.exports = parseFEN;
