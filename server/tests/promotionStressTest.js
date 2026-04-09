const applyMove = require("../chess/applyMove");
const parseFEN = require("../chess/boardParser");

let game = {
  boardState: "4k3/P7/8/8/8/8/8/4K3",
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

applyMove(game, 1, 0, 0, 0);

const board = parseFEN(game.boardState);
const lastMove = game.moves[game.moves.length - 1];

console.log("boardState:", game.boardState);
console.log("moves:", game.moves);
console.log("last move notation:", lastMove.notation);

if (board[0][0] !== "Q") {
  throw new Error("Promotion failed: pawn was not promoted to queen");
}

if (!lastMove.notation.includes("=Q")) {
  throw new Error("Promotion failed: notation does not include =Q");
}

console.log("Promotion test completed successfully");
