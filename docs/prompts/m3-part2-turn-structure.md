# Milestone 3 — Part 2  
## Structured AI Turn Handling

**Objective**

Refactor the game flow to support structured AI turns.

This prepares the system for the upcoming Minimax algorithm.

Modify ONLY:

client/js/board.js

Do not create new files.

---

# PROJECT CONTEXT

The game currently supports:

- Human vs AI gameplay
- Random AI moves
- Win detection
- Restart functionality

Now we want:

A structured turn flow.

---

# TASK 1 — Create processTurn()

Create function:

function processTurn(row, column) {

  if (checkWin(row, column)) {
    gameOver = true;
    alert("Player " + currentPlayer + " wins!");
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    alert("Game is a draw!");
    return;
  }

  switchPlayer();

  if (currentPlayer === 2) {
    setTimeout(aiMove, 500);
  }
}

---

# TASK 2 — Create switchPlayer()

Add:

function switchPlayer() {
  currentPlayer =
    currentPlayer === 1 ? 2 : 1;
}

---

# TASK 3 — Update dropPiece()

Modify dropPiece() so that:

After placing piece:

Call:

processTurn(row, column);

Instead of handling win/draw logic inline.

---

# TASK 4 — Ensure AI Uses Same Flow

AI move should also call:

dropPiece(column);

So the same logic applies.

---

# EXPECTED RESULT

Game flow becomes:

Human Move  
→ processTurn()  
→ AI Move  
→ processTurn()

Clean and stable.

---

# IMPORTANT

Do not change:

Rendering logic  
Win detection logic  
Highlight logic  

Only restructure turn flow.