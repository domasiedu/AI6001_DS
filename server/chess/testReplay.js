const rebuildBoardFromMoves = require("./rebuildBoard");
const getInitialBoard = require("./initialBoard");
const applyMove = require("./applyMove");

let game = {
  boardState: getInitialBoard(),
  moves: [],
  turn: "white",
  status: "active"
};

applyMove(game, 6, 4, 4, 4); // e2 -> e4
applyMove(game, 1, 4, 3, 4); // e7 -> e5

const rebuilt = rebuildBoardFromMoves(game.moves);

console.log("Original:", game.boardState);
console.log("Rebuilt:", rebuilt);

if (rebuilt === game.boardState) {
  console.log("Replay Test: PASSED");
} else {
  console.log("Replay Test: FAILED");
}
