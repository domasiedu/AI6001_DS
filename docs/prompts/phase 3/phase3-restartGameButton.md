Add a Restart Game button.

Files:
client/play.html
client/js/board.js
client/css/styles.css

Goal:
Allow starting a fresh new game from the UI.

-----------------------------------

STEP 1 — Add button in play.html

Add above the board or above Move History:

<button id="restart-game-btn">Restart Game</button>

-----------------------------------

STEP 2 — Add styling in styles.css

#restart-game-btn {
  margin-bottom: 12px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

-----------------------------------

STEP 3 — Add handler in board.js

Add:

document
  .getElementById("restart-game-btn")
  .addEventListener("click", async () => {
    selectedSquare = null;
    clearHighlights();
    clearLastMoveHighlight();
    clearCheckHighlight();
    await createNewGame();

    const history =
      document.getElementById("move-history");
    if (history) history.innerHTML = "";

    const whiteCaptures =
      document.getElementById("white-captures");
    if (whiteCaptures) whiteCaptures.innerHTML = "";

    const blackCaptures =
      document.getElementById("black-captures");
    if (blackCaptures) blackCaptures.innerHTML = "";
  });

Do not change existing move logic.
Only add restart capability.
