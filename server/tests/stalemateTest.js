const isStalemate =
  require("../chess/isStalemate");

const parseFEN =
  require("../chess/boardParser");

const fen =
  "7k/5Q2/6K1/8/8/8/8/8";

const board =
  parseFEN(fen);

console.log(
  "Stalemate:",
  isStalemate(
    board,
    "black"
  )
);
