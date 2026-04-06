# Milestone 3 — Part 3A  
## Board Simulation for Minimax

**Objective**

Create helper functions that allow the AI to simulate moves on a copied board.

Modify ONLY:

client/js/board.js

Do not modify gameplay logic.

Do not change rendering.

---

# PROJECT CONTEXT

The game currently supports:

- Human vs AI
- Random AI
- Structured turn flow
- Win detection
- Restart functionality

Now we prepare for Minimax.

We need:

Board simulation functions.

---

# TASK 1 — Create copyBoard()

Add:

function copyBoard(originalBoard) {
  return originalBoard.map(row => [...row]);
}

This creates a deep copy.

---

# TASK 2 — Create getNextOpenRow()

Add:

function getNextOpenRow(simBoard, column) {

  for (let row = ROWS - 1; row >= 0; row--) {

    if (simBoard[row][column] === 0) {
      return row;
    }

  }

  return null;
}

---

# TASK 3 — Create simulateDrop()

Add:

function simulateDrop(simBoard, row, column, player) {

  simBoard[row][column] = player;

}

---

# EXPECTED RESULT

Game should behave exactly the same.

No visible change.

Only internal preparation.

---

# IMPORTANT

Do not modify:

AI logic  
dropPiece()  
processTurn()  
Rendering