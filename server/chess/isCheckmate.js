const isKingInCheck =
  require("./isKingInCheck");

const parseFEN =
  require("./boardParser");

const generateFEN =
  require("./fenGenerator");

const getLegalMoves =
  require("./getLegalMoves");

function cloneBoard(board) {
  return board.map(row => [...row]);
}

function isCheckmate(board, color) {
  const boardState =
    typeof board === "string"
      ? parseFEN(board)
      : board;

  // If king not in check -> not checkmate
  if (!isKingInCheck(boardState, color)) {
    return false;
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece =
        boardState[row][col];

      if (!piece) continue;

      const pieceColor =
        piece === piece.toUpperCase()
          ? "white"
          : "black";

      if (pieceColor !== color) continue;

      const moves =
        getLegalMoves(
          boardState,
          row,
          col,
          piece
        );

      for (const move of moves) {
        const testBoard =
          cloneBoard(boardState);

        // simulate move
        testBoard[move.row][move.col] =
          testBoard[row][col];

        testBoard[row][col] = null;

        const testFEN =
          generateFEN(testBoard);

        // if king no longer in check
        if (
          !isKingInCheck(
            testFEN,
            color
          )
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

module.exports =
  isCheckmate;
