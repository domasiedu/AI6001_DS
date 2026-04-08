Create a JavaScript module called validatePawnMove.js inside server/chess.

Requirements:

Implement function:

validatePawnMove(board, piece, fromRow, fromCol, toRow, toCol)

Inputs:

- board: 2D chess board array
- piece: string ("P" or "p")
- fromRow, fromCol: starting coordinates
- toRow, toCol: destination coordinates

Rules to support:

1. White pawns ("P"):
   - Move upward (row decreases)
   - Can move 1 square forward if empty
   - Can move 2 squares forward from starting row (row 6)
   - Cannot jump over pieces

2. Black pawns ("p"):
   - Move downward (row increases)
   - Can move 1 square forward if empty
   - Can move 2 squares forward from starting row (row 1)
   - Cannot jump over pieces

Return:

true → if move valid  
false → if move invalid

Do not implement capture yet.

Export:

module.exports = validatePawnMove;