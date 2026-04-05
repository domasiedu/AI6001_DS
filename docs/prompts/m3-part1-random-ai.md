# Milestone 3 — Part 1  
## Random AI Move

**Objective**

Convert Player 2 into an AI that makes random valid moves.

Modify ONLY:

client/js/board.js

Do not create new files.

---

# PROJECT CONTEXT

The game currently supports:

- Player turns
- Piece dropping
- Win detection
- Winning highlight
- Restart button

Now we want:

Player 1 = Human  
Player 2 = AI

AI makes random moves.

---

# TASK 1 — Create getValidColumns()

Add function:

function getValidColumns() {
  const validColumns = [];

  for (let col = 0; col < COLS; col++) {
    if (board[0][col] === 0) {
      validColumns.push(col);
    }
  }

  return validColumns;
}

This returns columns that are not full.

---

# TASK 2 — Create getRandomColumn()

Add:

function getRandomColumn() {
  const validColumns = getValidColumns();

  if (validColumns.length === 0) return null;

  const randomIndex =
    Math.floor(Math.random() * validColumns.length);

  return validColumns[randomIndex];
}

---

# TASK 3 — Create aiMove()

Add:

function aiMove() {
  if (gameOver) return;

  const column = getRandomColumn();

  if (column !== null) {
    dropPiece(column);
  }
}

---

# TASK 4 — Trigger AI After Player Move

After Player 1 move:

If:

currentPlayer === 2

Then:

Call aiMove()

Use:

setTimeout(aiMove, 500);

This creates natural delay.

---

# TASK 5 — Prevent AI Looping

Ensure:

AI only runs when:

currentPlayer === 2

Human moves remain click-based.

---

# EXPECTED RESULT

Human clicks column.

Red piece drops.

After short delay:

Yellow piece drops automatically.

Game continues normally.

---

# IMPORTANT

Do not modify:

Win detection  
Draw logic  
Restart logic  

Only add AI movement.