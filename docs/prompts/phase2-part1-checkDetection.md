# Prompt 1
Create findKing.js inside server/chess.

Implement:

findKing(board, kingSymbol)

Inputs:

board → 2D board array  
kingSymbol → "K" (white) OR "k" (black)

Behavior:

Loop through board rows and columns.

If square equals kingSymbol:

Return:

{
  row: rowIndex,
  col: colIndex
}

If king not found:

Throw error:

"King not found"

Export:

module.exports = findKing;

# Prompt 2
Create isSquareAttacked.js inside server/chess.

Imports:

validatePawnMove  
validateKnightMove  
validateRookMove  
validateBishopMove  
validateQueenMove  
validateKingMove  

Implement:

isSquareAttacked(board, targetRow, targetCol, attackerColor)

attackerColor:

"white"
OR
"black"

Behavior:

Loop through every square.

For each enemy piece:

Check if that piece can move to target square.

If yes:

return true

If no piece can attack:

return false

Export:

module.exports = isSquareAttacked;

# Prompt 3

Create isKingInCheck.js inside server/chess.

Imports:

parseFEN  
findKing  
isSquareAttacked  

Implement:

isKingInCheck(fen, color)

Steps:

1. Convert FEN → board
2. Determine king symbol:

If color === "white":

kingSymbol = "K"

If color === "black":

kingSymbol = "k"

3. Find king position

4. Call:

isSquareAttacked()

If attacked:

return true

Else:

return false

Export:

module.exports = isKingInCheck;