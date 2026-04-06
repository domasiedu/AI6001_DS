# Milestone 3 — Part 3B  
## Simulated Win Detection

**Objective**

Allow the AI to detect winning moves on simulated boards.

Modify ONLY:

client/js/board.js

Do not modify rendering logic.

Do not modify gameplay logic.

---

# PROJECT CONTEXT

The system currently supports:

- Random AI
- Structured turn flow
- Board simulation helpers
- Win detection on live board

Now we add:

Win detection on simulated boards.

---

# TASK 1 — Create countConnectedSimulated()

Add:

function countConnectedSimulated(
  simBoard,
  startRow,
  startColumn,
  rowStep,
  columnStep,
  player
) {

  let count = 0;

  let row = startRow + rowStep;
  let column = startColumn + columnStep;

  while (
    row >= 0 &&
    row < ROWS &&
    column >= 0 &&
    column < COLS &&
    simBoard[row][column] === player
  ) {

    count++;

    row += rowStep;
    column += columnStep;

  }

  return count;

}

---

# TASK 2 — Create checkWinSimulated()

Add:

function checkWinSimulated(
  simBoard,
  row,
  column,
  player
) {

  const horizontal =
    1 +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      0,
      -1,
      player
    ) +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      0,
      1,
      player
    );

  if (horizontal >= 4) return true;

  const vertical =
    1 +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      -1,
      0,
      player
    ) +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      1,
      0,
      player
    );

  if (vertical >= 4) return true;

  const diagonal1 =
    1 +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      -1,
      -1,
      player
    ) +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      1,
      1,
      player
    );

  if (diagonal1 >= 4) return true;

  const diagonal2 =
    1 +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      1,
      -1,
      player
    ) +
    countConnectedSimulated(
      simBoard,
      row,
      column,
      -1,
      1,
      player
    );

  if (diagonal2 >= 4) return true;

  return false;

}

---

# EXPECTED RESULT

Game behavior remains identical.

No visible change.

Internal AI capability improves.

---

# IMPORTANT

Do not change:

drawBoard()
dropPiece()
AI random logic
Rendering