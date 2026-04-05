## Milestone 1 — Part 1

Date: 2026-04-04

Task:
Rendered Connect Four board using HTML canvas.

Result:
Board successfully displays 7×6 grid.

Issues:
None.

Notes:
Used Codex to generate initial board rendering code.
Reviewed and tested manually.

## Milestone 1 — Part 2

Added column click detection.

Board now detects column index
and visually highlights clicked column.

Verified console logs and highlight behavior.

## Milestone 2 — Part 1

Implemented internal board state and piece dropping logic.

Red pieces now appear at the lowest available position in selected column.

Verified stacking behavior and full column handling.

## Milestone 2 — Part 2

Implemented turn-based gameplay.

Game now alternates between Player 1 (red)
and Player 2 (yellow).

Verified stacking and color switching.

## Milestone 2 — Part 3

Implemented win detection logic.

Game now detects:

- Horizontal wins
- Vertical wins
- Diagonal wins
- Draw conditions

Game stops when win or draw occurs.

## Milestone 2 — Part 4
The following prompts in the /docs/prompts/ did not work 
- m2-part4-highlight-win.md
- m2-part4-highlight-winning-tiles.md
  
Implemented visual win detection logic manually using OpenAI LLM as codex failed to implement it without destroying the entire board.

Game now display visual tile confirmation of the below:

- Horizontal wins
- Vertical wins
- Diagonal wins
- Draw conditions

Game stops when win or draw occurs.