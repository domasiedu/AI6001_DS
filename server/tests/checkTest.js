const isKingInCheck = require("../chess/isKingInCheck");
const boardParser = require("../chess/boardParser");

const fen =
  "4k3/8/8/8/4Q3/8/8/4K3";

const board =
  boardParser(fen);

const result =
  isKingInCheck(board, "black");

console.log("Black in check:", result);
