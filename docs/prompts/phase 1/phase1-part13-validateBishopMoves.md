Create validateBishopMove.js inside server/chess.

Implement:

validateBishopMove(board, fromRow, fromCol, toRow, toCol)

Rules:

Bishop moves diagonally.

Valid move condition:

Absolute row difference == absolute column difference

Meaning:

abs(toRow - fromRow) === abs(toCol - fromCol)

Blocking Rules:

Bishop cannot jump over pieces.

Implementation:

Determine direction:

rowStep:
+1 or -1

colStep:
+1 or -1

Then:

Loop through diagonal squares
between start and destination

Check:

Each square must be empty

If any square contains piece:

return false

Return:

true → valid move  
false → invalid move

Export:

module.exports = validateBishopMove;