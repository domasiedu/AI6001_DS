Create validateKingMove.js inside server/chess.

Implement:

validateKingMove(fromRow, fromCol, toRow, toCol)

Rules:

King moves:

- Exactly 1 square
- Any direction

Valid movement:

abs(row difference) <= 1  
AND  
abs(column difference) <= 1  

But:

Move must not be zero movement
(fromRow === toRow AND fromCol === toCol → invalid)

Return:

true → valid move  
false → invalid move

Export:

module.exports = validateKingMove;