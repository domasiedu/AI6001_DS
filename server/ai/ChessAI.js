const { spawn } =
  require("child_process");

const os =
  require("os");

let STOCKFISH_PATH;

if (os.platform() === "win32") {
  // Windows local development
  STOCKFISH_PATH =
    "C:\\stockfish\\stockfish-windows-x86-64-avx2.exe";
} else {
  // Docker / Linux
  STOCKFISH_PATH =
    "/usr/games/stockfish";
}

function getBestMove(fen) {
  return new Promise((resolve, reject) => {
    const engine =
      spawn(STOCKFISH_PATH, [], {
        windowsHide: true
      });

    let bestMove = null;

    engine.stdout.on(
      "data",
      (data) => {
        const output =
          data.toString();

        if (
          output.includes("bestmove")
        ) {
          const match =
            output.match(
              /bestmove\s([a-h][1-8][a-h][1-8])/
            );

          if (match) {
            bestMove =
              match[1];

            console.log(
              "Parsed AI move:",
              bestMove
            );

            engine.stdin.write(
              "quit\n"
            );

            resolve(bestMove);
          }
        }
      }
    );

    engine.stderr.on(
      "data",
      (data) => {
        console.error(
          "Stockfish stderr:",
          data.toString()
        );
      }
    );

    engine.on(
      "error",
      (err) => {
        console.error(
          "Stockfish failed:",
          err
        );

        reject(err);
      }
    );

    console.log(
      "Sending FEN to Stockfish:",
      fen
    );

    engine.stdin.write(
      "uci\n"
    );

    engine.stdin.write(
      "isready\n"
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
