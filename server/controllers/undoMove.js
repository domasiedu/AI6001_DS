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
