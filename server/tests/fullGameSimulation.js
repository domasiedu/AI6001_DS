const applyMove = require("../chess/applyMove");
const getInitialBoard = require("../chess/initialBoard");
const parseFEN = require("../chess/boardParser");

let game = {
  boardState: getInitialBoard(),
  moves: [],
  turn: "white",
  status: "active",
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

const moves = [
  [6, 4, 4, 4], // e2 -> e4
  [1, 4, 3, 4], // e7 -> e5
  [7, 6, 5, 5], // g1 -> f3
  [0, 1, 2, 2], // b8 -> c6
  [7, 5, 4, 2], // f1 -> c4
  [0, 6, 2, 5], // g8 -> f6
  [7, 4, 7, 6], // e1 -> g1 (castle)
];

for (const [fromRow, fromCol, toRow, toCol] of moves) {
  applyMove(game, fromRow, fromCol, toRow, toCol);
  parseFEN(game.boardState);

  console.log("boardState:", game.boardState);
  console.log("turn:", game.turn);
  console.log("moves length:", game.moves.length);
}

console.log("Full simulation completed successfully");
