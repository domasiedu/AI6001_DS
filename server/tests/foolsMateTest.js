const parseFEN =
  require("../chess/boardParser");

const isKingInCheck =
  require("../chess/isKingInCheck");

const isCheckmate =
  require("../chess/isCheckmate");

const fen =
  "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR";

const board = parseFEN(fen);

console.log(
  "White in check:",
  isKingInCheck(board, "white")
);

console.log(
  "White checkmated:",
  isCheckmate(board, "white")
);
