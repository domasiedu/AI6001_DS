const applyMove = require("../chess/applyMove");

function createGame() {
  return {
    boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    turn: "white",
    status: "active",
    moves: [],
    winner: null,
    castlingRights: {
      whiteKingMoved: false,
      whiteRookKingsideMoved: false,
      whiteRookQueensideMoved: false,
      blackKingMoved: false,
      blackRookKingsideMoved: false,
      blackRookQueensideMoved: false,
    },
  };
}

try {
  const game = createGame();

  applyMove(game, 1, 0, 2, 0);
} catch (error) {
  console.log("Wrong turn test passed");
}

try {
  const game = createGame();

  applyMove(game, 7, 1, 7, 3);
} catch (error) {
  console.log("Invalid move test passed");
}

try {
  const game = createGame();

  game.status = "finished";
  applyMove(game, 6, 0, 5, 0);
} catch (error) {
  console.log("Game finished test passed");
}

console.log("Illegal move stress test completed successfully");
