# Milestone 1 — Part 2  
## Column Click Detection
You are helping me build a Connect Four game step-by-step.

IMPORTANT:

- Modify ONLY the existing file:

client/js/board.js

- Do NOT create new files.
- Do NOT add gameplay logic yet.
- Do NOT place pieces yet.
- This step is ONLY about detecting column clicks.

--------------------------------------------------

PROJECT CONTEXT:

The Connect Four board is already rendered using canvas.

Board dimensions:

7 columns  
6 rows  

Cell size:

80 pixels  

The board currently displays empty slots.

Now we want to detect which column the user clicks.

--------------------------------------------------

TASK:

Add click detection logic to the canvas.

--------------------------------------------------

REQUIREMENTS:

1. Detect mouse clicks on the canvas.

Use:

canvas.addEventListener("click", ...)

--------------------------------------------------

2. Determine clicked column.

Steps:

- Get mouse X coordinate relative to canvas.
- Divide X coordinate by CELL_SIZE.
- Use Math.floor() to determine column index.

Column range:

0 to 6

--------------------------------------------------

3. Console Logging

When user clicks:

Print:

"Column clicked: X"

Where X is column index.

Example:

Column clicked: 3

--------------------------------------------------

4. Column Highlighting

When user clicks a column:

Visually highlight that column.

Implementation:

- Redraw board
- Highlight selected column
- Use semi-transparent color overlay

Highlight color:

rgba(255, 255, 0, 0.3)

Highlight full column height.

--------------------------------------------------

5. Update drawBoard()

Modify drawBoard() so it:

- Accepts optional parameter:

selectedColumn

- If selectedColumn exists:

Draw highlight overlay for that column.

--------------------------------------------------

6. Maintain Code Structure

Use:

const COLS  
const ROWS  
const CELL_SIZE  

Keep code readable.

Add comments explaining logic.

--------------------------------------------------

EXPECTED RESULT:

When clicking on the board:

- Console logs column number.
- Selected column becomes highlighted.
- Highlight moves when clicking another column.

No gameplay yet.  
No pieces yet.

--------------------------------------------------

END OF TASK

---

 