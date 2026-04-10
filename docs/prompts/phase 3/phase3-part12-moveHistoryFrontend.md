Create move history panel UI.

Files:
client/play.html
client/js/board.js
client/css/styles.css

Goal:
Display list of moves using chess notation.

-----------------------------------

STEP 1 — Add history container

In play.html:

Add beside board:

<div id="history-panel">
  <h3>Move History</h3>
  <ol id="move-history"></ol>
</div>

-----------------------------------

STEP 2 — Add styling

In styles.css:

#history-panel {
  width: 200px;
  margin-left: 20px;
}

#move-history {
  font-size: 14px;
  max-height: 400px;
  overflow-y: auto;
}

-----------------------------------

STEP 3 — Update board.js

Add function:

function updateMoveHistory(moves) {

  const history =
    document.getElementById(
      "move-history"
    );

  history.innerHTML = "";

  moves.forEach(move => {

    const item =
      document.createElement("li");

    item.textContent =
      move.notation;

    history.appendChild(item);

  });

}

-----------------------------------

STEP 4 — Call after move

In sendMoveToBackend(),
after:

renderBoardFromFEN(
  currentFEN
);

Add:

updateMoveHistory(
  data.moves
);
