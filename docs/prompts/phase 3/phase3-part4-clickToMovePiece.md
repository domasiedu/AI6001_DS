Update client/js/board.js to support moving pieces locally using click-to-move.

Requirements:

1. Store current FEN globally.

Add:

let currentFEN =
"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

2. Update handleSquareClick(square):

Modify logic:

If selectedSquare is null:

Store clicked square as selected.

Else:

Treat click as destination.

Call:

movePieceLocally(fromRow, fromCol, toRow, toCol);

Clear selection.

3. Create helper function:

function movePieceLocally(fromRow, fromCol, toRow, toCol) {

  const board = parseFEN(currentFEN);

  const piece =
    board[fromRow][fromCol];

  board[fromRow][fromCol] = null;

  board[toRow][toCol] = piece;

  currentFEN = generateFEN(board);

  clearBoard();

  renderBoardFromFEN(currentFEN);

}

4. Add parseFEN function (frontend version):

Convert FEN → 2D array.

5. Add generateFEN function (frontend version):

Convert board → FEN.

6. Add clearBoard():

Remove all piece textContent before rendering.

Do NOT connect to backend yet.
Local visual movement only.
