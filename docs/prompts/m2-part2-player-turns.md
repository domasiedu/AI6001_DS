# Milestone 2 — Part 2  
## Player Turn Switching

**Date:** 2026-04-04  
**Tool Used:** OpenAI Codex (VS Code Extension)

---

## Objective

Add turn switching logic to the Connect Four game.

At this stage:

- Pieces drop correctly
- Pieces stack correctly
- Board state exists
- Only one player currently exists

This step introduces:

- Two-player support
- Alternating turns
- Different colored pieces

No win detection yet.  
No AI yet.

---

## Prompt Sent to Codex

You are helping me build a Connect Four game step-by-step.

IMPORTANT:

Modify ONLY:

client/js/board.js

Do NOT create new files.  
Do NOT add AI logic yet.  
Do NOT add win detection yet.

--------------------------------------------------

PROJECT CONTEXT:

The game currently:

- Detects column clicks
- Drops pieces correctly
- Stores board state
- Displays red pieces

Now we want:

Turn-based gameplay between two players.

--------------------------------------------------

PLAYER DEFINITIONS:

Player 1:

Value = 1  
Color = red (#ff0000)

Player 2:

Value = 2  
Color = yellow (#ffff00)

--------------------------------------------------

TASK 1 — Add Current Player Tracking

Create variable:

let currentPlayer = 1;

This indicates whose turn it is.

--------------------------------------------------

TASK 2 — Update Piece Placement

Modify drop logic so that:

Instead of:

board[row][column] = 1

Use:

board[row][column] = currentPlayer

--------------------------------------------------

TASK 3 — Switch Player After Move

After placing a piece:

Switch player:

If currentPlayer === 1:

currentPlayer = 2

Else:

currentPlayer = 1

--------------------------------------------------

TASK 4 — Update Piece Rendering

Modify drawBoard() so that:

If board[row][column] == 1:

Draw red piece

If board[row][column] == 2:

Draw yellow piece

Empty cells remain dark.

--------------------------------------------------

TASK 5 — Console Feedback

After each move:

Print:

"Current Player: X"

Where X is next player.

Example:

Current Player: 2

--------------------------------------------------

EXPECTED RESULT:

Click column:

Red piece appears.

Click again:

Yellow piece appears.

Click again:

Red piece appears.

Alternating continues.

--------------------------------------------------

CODE QUALITY REQUIREMENTS:

- Keep constants:

COLS  
ROWS  
CELL_SIZE  

- Use clear variable names.
- Keep functions readable.
- Add comments explaining logic.

--------------------------------------------------

END OF TASK