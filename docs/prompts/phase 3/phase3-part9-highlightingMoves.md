Create knight legal move generator.

File:

server/chess/legalMoves/knightMoves.js

Implementation:

Export function:

getKnightMoves(
  board,
  row,
  col,
  piece
)

Rules:

Knight moves in L-shape:

2 rows + 1 column
OR
1 row + 2 columns

Ignore blockers.

Allow move if:

• Square empty
• OR contains opponent piece

Block move if:

• Same color piece exists

Implementation:

const offsets = [

  [-2, -1],
  [-2,  1],
  [-1, -2],
  [-1,  2],
  [ 1, -2],
  [ 1,  2],
  [ 2, -1],
  [ 2,  1]

];

Loop offsets:

For each:

newRow = row + offsetRow  
newCol = col + offsetCol  

Check:

Inside board bounds:

0 ≤ newRow < 8  
0 ≤ newCol < 8  

If empty:

push move

If enemy piece:

push move

If friendly piece:

skip

Return:

moves array:

[
  { row, col }
]
