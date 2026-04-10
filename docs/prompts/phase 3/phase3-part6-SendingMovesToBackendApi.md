Update client/js/board.js to send moves to the backend API instead of updating locally.

Requirements:

1. Create new async function:

async function sendMoveToBackend(
  fromRow,
  fromCol,
  toRow,
  toCol
) {

  try {

    const response =
      await fetch(
        `http://localhost:3000/api/games/${gameId}/move`,
        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fromRow,
            fromCol,
            toRow,
            toCol
          })

        }
      );

    const data =
      await response.json();

    if (!data.boardState) {

      console.error(
        "Invalid move response:",
        data
      );

      return;

    }

    currentFEN =
      data.boardState;

    clearBoard();

    renderBoardFromFEN(
      currentFEN
    );

  }

  catch (error) {

    console.error(
      "Move failed:",
      error
    );

  }

}

2. In handleSquareClick():

Replace any call to:

movePieceLocally()

With:

sendMoveToBackend()

3. Remove local FEN updates.
Only update board using API response.

Do NOT modify createNewGame().
