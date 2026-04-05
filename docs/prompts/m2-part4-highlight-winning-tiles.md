# Milestone 2 — Part 4  
## Highlight Winning 4 Tiles (Safe Implementation)

**Objective**

Visually highlight the exact four tiles that caused a win.

Do NOT rewrite existing win logic.
Extend it safely.

Modify ONLY:

client/js/board.js

---

## PROJECT CONTEXT

The game currently:

- Drops pieces correctly
- Alternates players
- Detects wins correctly
- Displays alert on win

Now we want:

Highlight the exact four winning tiles.

---

# TASK 1 — Add winningCells Storage

Add global variable:

let winningCells = [];

Place it near:

let gameOver = false;

---

# TASK 2 — Create findWinningCells()

Create new function:

findWinningCells(row, column)

This function:

- Checks horizontal direction
- Checks vertical direction
- Checks diagonal (\)
- Checks diagonal (/)

When 4 connected pieces are found:

Store positions:

winningCells = [
  { row, column },
  { row, column },
  { row, column },
  { row, column }
]

Return true if found.

Return false otherwise.

IMPORTANT:

Reuse logic from checkWin().
Do not delete checkWin().

---

# TASK 3 — Update checkWin()

Inside checkWin():

Before returning true:

Call:

findWinningCells(row, column);

So winningCells gets populated.

---

# TASK 4 — Update drawSlot()

Modify drawSlot():

After drawing the piece:

Check:

if this slot exists inside winningCells

If true:

Draw green outline.

Use:

ctx.strokeStyle = "#00ff00";
ctx.lineWidth = 5;

Draw circular outline around the piece.

---

# TASK 5 — Ensure Board Still Draws Normally

All existing drawing must remain unchanged.

Only add highlight.

---

# EXPECTED RESULT

When a player wins:

Exactly 4 winning tiles:

Have green circular outline.

Game still shows:

alert("Player X wins!")

Game stops.

---

# IMPORTANT

Do not rewrite existing logic unnecessarily.

Extend only.

Minimal changes only.