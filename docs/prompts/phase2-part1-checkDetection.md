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

# prompt 4

Create isMoveLegal.js inside server/chess.

Imports:

movePiece
isKingInCheck

Implement:

isMoveLegal(fen, fromRow, fromCol, toRow, toCol)

Behavior:

1. Determine whose turn it is based on the piece at source square.
   - Uppercase piece = white
   - Lowercase piece = black

2. Simulate the move using movePiece(...)

3. After move, check if that same color king is still in check.

4. If own king is in check after move:
   return false

5. Otherwise:
   return true

Important:

- If movePiece throws an error, return false
- This function is only for legality checking after movement validation

Export:

module.exports = isMoveLegal;


# prompt 5

Create getAllPossibleMoves.js inside server/chess.

Imports:

parseFEN
movePiece

Implement:

getAllPossibleMoves(fen, color)

color:

"white"
OR
"black"

Behavior:

1. Parse FEN into board

2. Loop through all squares

3. For each piece belonging to color:

Try moving it to every square on board.

Use:

movePiece(...)

If move succeeds:

Add move to list.

If move fails:

Ignore.

Return:

Array of legal moves.

Each move should include:

{
  fromRow,
  fromCol,
  toRow,
  toCol
}

Export:

module.exports = getAllPossibleMoves;

# prompt 6

Create isCheckmate.js inside server/chess.

Imports:

isKingInCheck
getAllPossibleMoves

Implement:

isCheckmate(fen, color)

Steps:

1. Check if king is currently in check:

isKingInCheck(fen, color)

If false:

return false

(Not checkmate)

2. Get all legal moves:

getAllPossibleMoves(fen, color)

3. If no moves exist:

return true

(Checkmate)

Otherwise:

return false

Export:

module.exports = isCheckmate;