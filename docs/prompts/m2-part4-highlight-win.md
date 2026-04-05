# Milestone 2 — Part 4  
## Highlight Winning Tiles

**Objective**

When a player wins, highlight the four connected winning tiles visually.

Do NOT change overall game logic.

Modify ONLY:

client/js/board.js

---

## PROJECT CONTEXT

The game currently:

- Detects wins correctly
- Shows alert message
- Stops gameplay
- Draws pieces correctly

Now we want:

Visual confirmation of winning tiles.

---

## TASK 1 — Create winningCells Storage

Add global variable:

let winningCells = [];

This will store:

{ row, column }

positions of winning tiles.

---

## TASK 2 — Modify checkWin()

Instead of only returning true/false:

When a win is detected:

Store coordinates of the 4 winning cells inside:

winningCells

You must detect:

Horizontal  
Vertical  
Diagonal (\)  
Diagonal (/)

Store all winning positions.

Return:

true if win detected.

---

## TASK 3 — Modify drawSlot()

If current slot exists inside:

winningCells

Draw special highlight.

Implementation:

Draw a ring around the winning piece.

Use:

ctx.strokeStyle = "#00ff00";
ctx.lineWidth = 5;

Draw circular outline.

---

## TASK 4 — Preserve Existing Rendering

Ensure:

Normal pieces still render correctly.

Winning pieces should:

Have green outline.

---

## TASK 5 — Clear winningCells on New Game

If board resets later:

winningCells must reset to empty.

(Just prepare structure.)

---

## EXPECTED RESULT

When player wins:

The 4 winning tiles:

Are outlined in green.

Game still shows:

alert("Player X wins!")

Gameplay stops.

---

END OF TASK