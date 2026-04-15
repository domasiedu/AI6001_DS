We want to implement a Replay Game feature.

Before adding UI buttons, first analyze how move history is stored
and build a safe replay engine.

DO NOT modify existing gameplay logic.

---------------------------------------

TASK OBJECTIVE:

1. Detect move history format
2. Build replay engine function
3. Ensure compatibility with current board logic

---------------------------------------

STEP 1 — Detect Move History Storage

Scan the project.

Find:

Where moves are stored.

Search:

moveHistory
moves
history
game.moves

Look in:

server/models/Game.js
client/js/game.js
client/js/board.js

Identify:

Move format.

Examples:

FORMAT A:

["e4", "e5", "Qh5"]

FORMAT B:

[
 { fromRow, fromCol, toRow, toCol }
]

FORMAT C:

Stored as FEN history.

Save findings.

---------------------------------------

STEP 2 — Confirm Restart Logic Works

Locate:

restartGame()

Verify:

Board resets to starting FEN:

rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

Replay will depend on restart.

---------------------------------------

STEP 3 — Build Replay Engine

Create new function:

client/js/replay.js

Add:

function replayMoves(moveList) {

    resetBoard();

    let index = 0;

    function playNextMove() {

        if (index >= moveList.length) return;

        applyMoveFromHistory(moveList[index]);

        index++;

        setTimeout(playNextMove, 700);

    }

    playNextMove();
}

---------------------------------------

STEP 4 — Create Helper Function

Add:

function applyMoveFromHistory(move) {

Detect format automatically.

Handle:

fromRow / toRow format

OR

algebraic format (e4)

Use existing applyMove logic.

---------------------------------------

STEP 5 — Output Discovery Report

Create:

docs/replay-analysis.md

Include:

✔ Move history format  
✔ Where moves stored  
✔ Replay compatibility  
✔ Any risks  

DO NOT ADD UI BUTTON YET.
