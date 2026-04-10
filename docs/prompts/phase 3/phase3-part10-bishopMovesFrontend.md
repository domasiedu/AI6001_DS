Create bishop legal move generator.

File:

server/chess/legalMoves/bishopMoves.js

Export function:

getBishopMoves(
  board,
  row,
  col,
  piece
)

Rules:

Bishop moves diagonally in 4 directions:

↖ (-1,-1)  
↗ (-1,+1)  
↙ (+1,-1)  
↘ (+1,+1)

Continue moving until:

• Edge of board  
• Friendly piece (stop)
• Enemy piece (capture + stop)

Implementation:

Use directions array:

const directions = [

  [-1, -1],
  [-1,  1],
  [ 1, -1],
  [ 1,  1]

];

Loop each direction:

Move step-by-step:

newRow += directionRow  
newCol += directionCol  

Stop if:

Outside board

If empty:

Add move

If enemy piece:

Add move
Stop direction

If friendly piece:

Stop direction

Return:

moves array.
