Update client/js/board.js to fetch legal moves when selecting a piece.

Requirements:

1. Create function:

async function fetchLegalMoves(row, col) {

  try {

    const response =
      await fetch(
        `http://localhost:3000/api/games/${gameId}/legal-moves?row=${row}&col=${col}`
      );

    const data =
      await response.json();

    highlightLegalMoves(
      data.moves
    );

  }

  catch (error) {

    console.error(
      "Legal move fetch failed:",
      error
    );

  }

}

2. Call fetchLegalMoves() inside handleSquareClick when selecting piece.

3. Create highlightLegalMoves(moves):

function highlightLegalMoves(moves) {

  clearHighlights();

  moves.forEach(move => {

    const square =
      document.querySelector(
        `[data-row="${move.row}"][data-col="${move.col}"]`
      );

    square.classList.add("legal");

  });

}

4. Add clearHighlights():

Remove class "legal" from all squares.
