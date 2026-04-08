Update applyMove.js to enhance move history recording.

Before calling movePiece():

1. Parse board using parseFEN.

2. Capture:

movingPiece = board[fromRow][fromCol]

capturedPiece = board[toRow][toCol] || null

Then update move storage:

Replace:

game.moves.push({
  fromRow,
  fromCol,
  toRow,
  toCol
});

With:

game.moves.push({
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece: movingPiece,
  captured: capturedPiece,
  timestamp: new Date()
});

Important:

Do NOT change move logic.
Only enhance move history structure.


