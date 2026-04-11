Create Stockfish AI integration.

File:
server/chess/ai/getBestMove.js

Goal:
Send FEN to Stockfish and receive best move.

-----------------------------------

STEP 1 — Import child_process

Add:

const { spawn } =
  require("child_process");

-----------------------------------

STEP 2 — Define Stockfish path

Use:

const STOCKFISH_PATH =
  "C:\\stockfish\\stockfish-windows-x86-64-avx2.exe";

-----------------------------------

STEP 3 — Create getBestMove function

Add:

function getBestMove(fen) {

  return new Promise((resolve, reject) => {

    const engine =
      spawn(STOCKFISH_PATH);

    let bestMove = null;

    engine.stdout.on(
      "data",
      (data) => {

        const output =
          data.toString();

        if (
          output.includes("bestmove")
        ) {

          const parts =
            output.split(" ");

          bestMove =
            parts[1];

          engine.stdin.write(
            "quit\n"
          );

          resolve(bestMove);

        }

      }
    );

    engine.stdin.write(
      "uci\n"
    );

    engine.stdin.write(
      "position fen " +
      fen +
      "\n"
    );

    engine.stdin.write(
      "go depth 12\n"
    );

  });

}

module.exports =
  getBestMove;
