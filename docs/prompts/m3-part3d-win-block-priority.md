# Milestone 3 — Part 3D  
## Winning and Blocking Priority Logic

**Objective**

Improve AI intelligence by prioritizing immediate wins and blocking opponent wins before running Minimax.

Modify ONLY:

client/js/board.js

Do not modify rendering.

---

# PROJECT CONTEXT

The AI currently:

- Uses Minimax
- Evaluates positions
- Makes structured moves

Now we improve:

Tactical awareness.

---

# TASK 1 — Create findWinningMove()

Add:

function findWinningMove(player) {

  const validColumns = getValidColumns();

  for (const column of validColumns) {

    const tempBoard =
      copyBoard(board);

    const row =
      getNextOpenRow(
        tempBoard,
        column
      );

    simulateDrop(
      tempBoard,
      row,
      column,
      player
    );

    if (
      checkWinSimulated(
        tempBoard,
        row,
        column,
        player
      )
    ) {
      return column;
    }

  }

  return null;

}

---

# TASK 2 — Update aiMove()

Modify aiMove():

function aiMove() {

  if (gameOver) return;

  // 1 — Try winning move
  let column =
    findWinningMove(2);

  // 2 — Block opponent
  if (column === null) {

    column =
      findWinningMove(1);

  }

  // 3 — Otherwise use Minimax
  if (column === null) {

    const result =
      minimax(board, 3, true);

    column =
      result.column;

  }

  if (column !== null) {

    dropPiece(column);

  }

}

---

# EXPECTED RESULT

AI now:

Wins when possible  
Blocks player threats  
Uses Minimax otherwise  

Much stronger gameplay.