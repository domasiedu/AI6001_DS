Add last move highlighting.

Files:
client/js/board.js
client/css/styles.css

Goal:
Highlight the previous move squares (from + to).

-----------------------------------

STEP 1 — Add CSS class

In styles.css:

.last-move {
  background-color: rgba(255, 255, 0, 0.5);
}

-----------------------------------

STEP 2 — Add highlight function

In board.js

Add:

function highlightLastMove(move) {

  if (!move) return;

  const fromSquare =
    document.querySelector(
      `[data-row="${move.fromRow}"][data-col="${move.fromCol}"]`
    );

  const toSquare =
    document.querySelector(
      `[data-row="${move.toRow}"][data-col="${move.toCol}"]`
    );

  if (fromSquare)
    fromSquare.classList.add("last-move");

  if (toSquare)
    toSquare.classList.add("last-move");
}

-----------------------------------

STEP 3 — Clear previous highlights

Add:

function clearLastMoveHighlight() {

  const squares =
    document.querySelectorAll(".last-move");

  squares.forEach(square => {
    square.classList.remove("last-move");
  });

}

-----------------------------------

STEP 4 — Call after move

Inside:

sendMoveToBackend()

After:

renderBoardFromFEN(currentFEN);

Add:

clearLastMoveHighlight();

const lastMove =
  data.moves[
    data.moves.length - 1
  ];

highlightLastMove(
  lastMove
);
