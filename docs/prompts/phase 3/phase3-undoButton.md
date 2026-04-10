Add Undo Move functionality.

Files:
server/controllers/applyMove.js
server/controllers/undoMove.js (new)
server/models/Game.js
client/play.html
client/js/board.js

Goal:
Allow undoing the last move.

-----------------------------------

STEP 1 — Add history storage

In Game.js schema:

Add:

history: {
  type: [String],
  default: []
}

-----------------------------------

STEP 2 — Store FEN after each move

In applyMove.js

After generating updatedFEN:

game.history.push(updatedFEN);

Save game afterward.

-----------------------------------

STEP 3 — Create undo controller

Create:

server/controllers/undoMove.js

Add:

const Game =
  require("../models/Game");

async function undoMove(req, res) {

  try {

    const { gameId } = req.params;

    const game =
      await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    if (game.history.length <= 1) {
      return res.json({
        boardState: game.boardState,
        turn: game.turn,
        moves: game.moves
      });
    }

    game.history.pop();

    const previousFEN =
      game.history[
        game.history.length - 1
      ];

    game.boardState =
      previousFEN;

    game.moves.pop();

    game.turn =
      game.turn === "white"
        ? "black"
        : "white";

    await game.save();

    res.json({
      boardState:
        previousFEN,
      turn: game.turn,
      moves: game.moves
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Undo failed",
      error:
        error.message
    });

  }

}

module.exports =
  undoMove;

-----------------------------------

STEP 4 — Add undo route

Add route:

PUT /api/games/:gameId/undo

-----------------------------------

STEP 5 — Add Undo button UI

In play.html:

Add:

<button id="undo-btn">
Undo Move
</button>

-----------------------------------

STEP 6 — Add Undo logic

In board.js:

Add:

document
  .getElementById("undo-btn")
  .addEventListener("click", async () => {

    try {

      const response =
        await fetch(
          `http://localhost:3000/api/games/${gameId}/undo`,
          { method: "PUT" }
        );

      const data =
        await response.json();

      currentFEN =
        data.boardState;

      currentTurn =
        data.turn;

      clearBoard();

      renderBoardFromFEN(
        currentFEN
      );

      updateMoveHistory(
        data.moves
      );

      updateCapturedPieces(
        data.moves
      );

    } catch (error) {

      console.error(
        "Undo failed:",
        error
      );

    }

  });
