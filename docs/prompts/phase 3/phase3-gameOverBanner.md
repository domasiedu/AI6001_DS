Add Game Over banner UI.

Files:
client/play.html
client/js/board.js
client/css/styles.css

Goal:
Display a visible banner when game ends.

-----------------------------------

STEP 1 — Add banner container

In play.html:

Add above board:

<div id="game-over-banner" class="hidden"></div>

-----------------------------------

STEP 2 — Add styling

In styles.css:

#game-over-banner {
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
  margin-bottom: 12px;
  text-align: center;
  background-color: #222;
  color: white;
}

.hidden {
  display: none;
}

-----------------------------------

STEP 3 — Add show function

In board.js:

Add:

function showGameOverBanner(message) {

  const banner =
    document.getElementById(
      "game-over-banner"
    );

  banner.textContent =
    message;

  banner.classList.remove(
    "hidden"
  );

}

-----------------------------------

STEP 4 — Handle game over response

Inside:

sendMoveToBackend()

After receiving response:

Add:

if (data.status === "finished") {

  if (data.winner === "white") {

    showGameOverBanner(
      "CHECKMATE — WHITE WINS"
    );

  }

  else if (data.winner === "black") {

    showGameOverBanner(
      "CHECKMATE — BLACK WINS"
    );

  }

  else {

    showGameOverBanner(
      "STALEMATE — DRAW"
    );

  }

}

-----------------------------------

STEP 5 — Prevent further moves

Modify:

handleSquareClick()

Add at top:

if (
  document
    .getElementById("game-over-banner")
    .textContent !== ""
) {
  return;
}
