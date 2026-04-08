Create validateRookMove.js inside server/chess.

Implement:

validateRookMove(board, fromRow, fromCol, toRow, toCol)

Rules:

Rook moves:

- Horizontally (same row)
OR
- Vertically (same column)

Movement Rules:

1. Move must be straight line
   (row OR column changes, not both)

2. Path between start and destination
   must be clear.

3. Rook cannot jump over pieces.

Implementation:

Check:

If moving horizontally:

Loop through columns between fromCol and toCol
Ensure squares are empty

If moving vertically:

Loop through rows between fromRow and toRow
Ensure squares are empty

Return:

true → valid move  
false → invalid move

Export:

module.exports = validateRookMove;