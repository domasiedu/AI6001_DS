function generateNotation(fromRow, fromCol, toRow, toCol, piece, captured) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const fromFile = files[fromCol];
  const toFile = files[toCol];
  const toRank = 8 - toRow;
  const isPawn = piece === "P" || piece === "p";

  if (isPawn && captured) {
    return fromFile + "x" + toFile + toRank;
  }

  if (isPawn) {
    return toFile + toRank;
  }

  const pieceLetter = piece.toUpperCase();

  if (captured) {
    return pieceLetter + "x" + toFile + toRank;
  }

  return pieceLetter + toFile + toRank;
}

module.exports = generateNotation;
