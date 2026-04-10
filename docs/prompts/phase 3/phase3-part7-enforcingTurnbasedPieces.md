Update client/js/board.js to enforce turn-based piece selection.

Requirements:

1. Add global variable:

let currentTurn = "white";

2. After creating game:

Inside createNewGame():

Add:

currentTurn = data.turn;

3. After sending move:

Inside sendMoveToBackend():

Add:

currentTurn = data.turn;

(after updating boardState)

4. Add helper function:

function isPlayersPiece(piece) {

  if (!piece) return false;

  if (currentTurn === "white") {
    return piece === piece.toUpperCase();
  }

  if (currentTurn === "black") {
    return piece === piece.toLowerCase();
  }

  return false;

}

5. In handleSquareClick():

Before selecting a piece:

Add check:

if (!selectedSquare) {

  const piece =
    getPieceFromBoard(row, col);

  if (!isPlayersPiece(piece)) {

    console.log(
      "Not your turn piece"
    );

    return;

  }

}

Do NOT modify move logic.
Only block wrong-color selections.
