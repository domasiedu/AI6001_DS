# Milestone 2 — Part 3  
## Win Detection Logic
 
**Tool Used:** OpenAI Codex (VS Code Extension)

---

## Objective

Add win detection and draw detection logic to the Connect Four game.

At this stage:

- Pieces drop correctly
- Turn switching works
- Two-player gameplay works

This step introduces:

- Horizontal win detection
- Vertical win detection
- Diagonal win detection
- Draw detection
- Game-over state

---

## Prompt Sent to Codex

You are helping me build a Connect Four game step-by-step.

IMPORTANT:

Modify ONLY:

client/js/board.js

Do NOT create new files.  
Do NOT add AI logic yet.

--------------------------------------------------

PROJECT CONTEXT:

The game currently supports:

- Piece dropping
- Turn switching
- Board rendering

Now we want to detect wins and draws.

--------------------------------------------------

TASK 1 — Add Game Over State

Create variable:

let gameOver = false;

Before placing piece:

Check:

if (gameOver) return;

--------------------------------------------------

TASK 2 — Create checkWin(row, column)

Create function:

checkWin(row, column)

This function checks whether placing a piece at:

row, column

causes a win.

Check for:

Horizontal wins  
Vertical wins  
Diagonal wins (\ direction)  
Diagonal wins (/ direction)

Return:

true → if win  
false → otherwise

--------------------------------------------------

HORIZONTAL CHECK:

Check 4 consecutive cells:

Same row  
Adjacent columns

--------------------------------------------------

VERTICAL CHECK:

Check:

Same column  
Adjacent rows

--------------------------------------------------

DIAGONAL (\) CHECK:

Check:

Top-left to bottom-right

--------------------------------------------------

DIAGONAL (/) CHECK:

Check:

Bottom-left to top-right

--------------------------------------------------

TASK 3 — Create checkDraw()

Create function:

checkDraw()

Check if:

Top row has no empty cells.

If true:

Return true.

Else:

Return false.

--------------------------------------------------

TASK 4 — Handle Win

After placing piece:

Call:

checkWin(row, column)

If true:

Set:

gameOver = true

Display:

alert("Player X wins!")

Where X is current player.

--------------------------------------------------

TASK 5 — Handle Draw

After checking win:

Call:

checkDraw()

If true:

Set:

gameOver = true

Display:

alert("Game is a draw!")

--------------------------------------------------

TASK 6 — Maintain Rendering

Ensure:

Board still redraws correctly.

Pieces remain visible.

Highlight behavior remains correct.

--------------------------------------------------

EXPECTED RESULT:

Game detects:

Horizontal wins  
Vertical wins  
Diagonal wins  
Draws  

Game stops when finished.

Displays winner message.

--------------------------------------------------

CODE QUALITY REQUIREMENTS:

- Keep functions modular
- Use readable logic
- Add comments explaining direction checks
- Keep board constants unchanged

--------------------------------------------------

END OF TASK