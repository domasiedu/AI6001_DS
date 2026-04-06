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

## Milestone 3 — Part 1: Random AI Move

**Objective:**  
Introduce an AI opponent that makes random valid moves.

**Summary:**  
In this milestone, Player 2 was converted from a human-controlled player into an automated AI opponent. The AI selects a random valid column and drops a piece after a short delay following the human player's move.

**Implementation Details:**  
- Created `getValidColumns()` to identify available columns.
- Implemented `getRandomColumn()` to select a random valid move.
- Added `aiMove()` to perform automated piece placement.
- Integrated AI triggering using `setTimeout()` after Player 1's turn.
- Ensured the AI avoids selecting full columns.
- Maintained compatibility with existing win detection and restart logic.

**Outcome:**  
The system now supports Human vs AI gameplay using a random move strategy. The game flow remains stable, and all previous features such as win detection, highlighting, and restart functionality continue to work correctly.

**Status:**  
Completed and tested successfully.

## Milestone 3 — Part 2: Structured AI Turn Handling

**Objective:**  
Refactor the game logic to support structured turn handling for both human and AI players.

**Summary:**  
This milestone introduced a centralized turn-processing workflow. The new structure ensures consistent handling of win detection, draw detection, and player switching across both human and AI moves.

**Implementation Details:**  
- Created `processTurn()` to handle game outcome checks.
- Implemented `switchPlayer()` to manage player transitions.
- Updated `dropPiece()` to delegate turn logic to `processTurn()`.
- Ensured both human and AI moves follow the same execution path.
- Maintained compatibility with restart and win-highlight features.

**Outcome:**  
The system now uses a modular turn-processing architecture, improving maintainability and preparing the codebase for the implementation of the Minimax AI algorithm.

**Status:**  
Completed and verified.

## Milestone 3 — Part 3A: Board Simulation Setup

**Objective:**  
Prepare the system for AI decision-making by enabling simulated board operations.

**Summary:**  
This milestone introduced helper functions that allow the AI to simulate potential moves on a copied version of the board without affecting the live game state.

**Implementation Details:**  
- Implemented `copyBoard()` to create deep copies of the board.
- Added `getNextOpenRow()` to locate valid row positions.
- Created `simulateDrop()` to place simulated moves on test boards.
- Ensured no changes affected visible gameplay behavior.

**Outcome:**  
The system now supports safe board simulation, enabling the next stage of AI logic development using the Minimax algorithm.

**Status:**  
Completed and verified.

## Milestone 3 — Part 3B: Simulated Win Detection

**Objective:**  
Enable the AI to detect winning states on simulated board positions.

**Summary:**  
This milestone introduced simulation-based win detection functions that allow the AI to evaluate whether a move results in a winning configuration without affecting the live game state.

**Implementation Details:**  
- Implemented `countConnectedSimulated()` to count adjacent pieces in a direction on simulated boards.
- Added `checkWinSimulated()` to determine if a simulated move produces a winning condition.
- Reused directional logic consistent with live win detection.
- Ensured no changes affected visible gameplay.

**Outcome:**  
The AI can now evaluate winning conditions on simulated boards, enabling future decision-making logic required for the Minimax algorithm.

**Status:**  
Completed and verified.