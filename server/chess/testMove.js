const getInitialBoard = require("./initialBoard");
const movePiece = require("./movePiece");

const originalFEN = getInitialBoard();
const updatedFEN = movePiece(originalFEN, 6, 4, 4, 4);

console.log("Original FEN:", originalFEN);
console.log("Updated FEN:", updatedFEN);
