Update client/js/board.js to create a new game from backend when page loads.

Requirements:

1. Add global variable:

let gameId = null;

2. Add async function:

async function createNewGame() {

  try {

    const response =
      await fetch("http://localhost:3000/api/games", {
        method: "POST"
      });

    const data =
      await response.json();

    gameId = data._id;

    currentFEN =
      data.boardState;

    clearBoard();

    renderBoardFromFEN(currentFEN);

    console.log("Game created:", gameId);

  } catch (error) {

    console.error("Game creation failed:", error);

  }

}

3. Call:

createNewGame();

At bottom of file.

Do NOT remove local FEN logic yet.
Just replace initial board with API board.
