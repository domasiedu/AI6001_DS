# Milestone 2 — Part 1  
## Drop Pieces Into Column

**Date:** 2026-04-04  
**Tool Used:** OpenAI Codex (VS Code Extension)

---

## Objective

Implement piece dropping functionality for the Connect Four game.

At this stage:

- Column click detection already works.
- Columns highlight when clicked.
- Board rendering works.

This step introduces:

- Internal board state
- Piece placement logic
- Rendering player pieces

No AI yet.  
No win detection yet.

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

The board already:

- Renders correctly
- Detects column clicks
- Highlights selected column

Now we want:

Dropping pieces into columns.

--------------------------------------------------

BOARD STRUCTURE:

Create a 2D array:

board[ROWS][COLS]

Initialize all values:

0

Meaning:

0 = empty  
1 = player piece  

--------------------------------------------------

TASK 1 — Initialize Board State

Create function:

createBoard()

This function:

- Creates 2D array
- Sets all cells to 0
- Returns board

Store board globally:

let board = createBoard();

--------------------------------------------------

TASK 2 — Find Lowest Empty Row

Create function:

getAvailableRow(column)

This function:

- Starts from bottom row
- Moves upward
- Finds first empty cell
- Returns row index
- Returns -1 if column full

--------------------------------------------------

TASK 3 — Drop Piece

Inside click handler:

When column clicked:

- Get available row
- If row != -1:

Set:

board[row][column] = 1

Then redraw board.

--------------------------------------------------

TASK 4 — Draw Player Pieces

Modify drawBoard() so it:

- Loops through board array
- Draws colored circles where value = 1

Player color:

red

Color code:

#ff0000

Empty cells remain dark.

--------------------------------------------------

TASK 5 — Maintain Column Highlight

Column highlight must still work.

Highlight must not remove pieces.

--------------------------------------------------

EXPECTED RESULT:

When clicking a column:

A red piece appears at:

lowest empty slot

Stacking behavior:

Pieces stack upward.

If column is full:

No piece added.

--------------------------------------------------

CODE QUALITY REQUIREMENTS:

- Keep constants:

COLS  
ROWS  
CELL_SIZE  

- Use readable function names.
- Add comments explaining logic.
- Keep code modular.

--------------------------------------------------

END OF TASK