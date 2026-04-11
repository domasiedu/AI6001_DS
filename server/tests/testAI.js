const getBestMove =
  require("../ai/ChessAI");

async function testAI() {
  try {
    const startFEN =
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    const move =
      await getBestMove(startFEN);

    console.log(
      "AI move:",
      move
    );
  } catch (err) {
    console.error(
      "AI test failed:",
      err
    );
  }
}

testAI();
