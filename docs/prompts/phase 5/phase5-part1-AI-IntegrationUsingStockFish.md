Integrate AI move after player move.

Context:
Stockfish is already working through:

server/ai/ChessAI.js

Goal:
After player move, automatically generate and apply AI move.

-----------------------------------

STEP 1 — Locate:

server/routes/games.js

Find:

router.put("/:id/move", async (req, res) => {

-----------------------------------

STEP 2 — Import AI

Add at top:

const getBestMove =
  require("../ai/ChessAI");

-----------------------------------

STEP 3 — After player move is applied

Locate:

applyMove(game, fromRow, fromCol, toRow, toCol);

After this line, add:

-----------------------------------

const aiTurn =
  game.turn === "black";

if (aiTurn && game.status === "active") {

  try {

    const fen =
      game.boardState;

    console.log(
      "AI thinking for FEN:",
      fen
    );

    const aiMove =
      await getBestMove(fen);

    console.log(
      "AI raw move:",
      aiMove
    );

    if (aiMove) {

      const from =
        aiMove.substring(0, 2);

      const to =
        aiMove.substring(2, 4);

      function algebraToCoords(square) {

        const file =
          square.charCodeAt(0) - 97;

        const rank =
          8 - Number(square[1]);

        return {
          row: rank,
          col: file
        };

      }

      const fromCoords =
        algebraToCoords(from);

      const toCoords =
        algebraToCoords(to);

      applyMove(
        game,
        fromCoords.row,
        fromCoords.col,
        toCoords.row,
        toCoords.col
      );

    }

  }

  catch (err) {

    console.error(
      "AI move failed:",
      err
    );

  }

}

-----------------------------------

STEP 4 — Save game normally

Ensure:

await game.save();

remains unchanged.

-----------------------------------

STEP 5 — Do not modify frontend yet.
