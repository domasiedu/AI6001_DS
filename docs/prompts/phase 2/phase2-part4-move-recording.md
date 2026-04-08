# Prompt 1
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


# Prompt 2

Create a new file:

server/chess/rebuildBoard.js

Function name:

rebuildBoardFromMoves(moves)

Requirements:

1. Import:

getInitialBoard from initialBoard.js  
movePiece from movePiece.js  

2. Start with:

let boardState = getInitialBoard();

3. Loop through moves:

For each move:

boardState = movePiece(
  boardState,
  move.fromRow,
  move.fromCol,
  move.toRow,
  move.toCol
);

4. Return final boardState.

Export:

module.exports = rebuildBoardFromMoves;

# Prompt 3

Create server/chess/testReplay.js

Test rebuildBoardFromMoves.

Steps:

1. Import:

rebuildBoardFromMoves
getInitialBoard
applyMove

2. Create mock game:

let game = {
  boardState: getInitialBoard(),
  moves: [],
  turn: "white",
  status: "active"
};

3. Apply moves:

applyMove(game, 6, 4, 4, 4); // e2 → e4
applyMove(game, 1, 4, 3, 4); // e7 → e5

4. Rebuild board:

const rebuilt = rebuildBoardFromMoves(game.moves);

5. Print:

console.log("Original:", game.boardState);
console.log("Rebuilt:", rebuilt);

6. If equal:

console.log("Replay Test: PASSED");
Else:

console.log("Replay Test: FAILED");