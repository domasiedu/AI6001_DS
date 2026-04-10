Add visual check detection.

Files:
client/js/board.js
client/css/styles.css

Goal:
Highlight king in check and show "+" in move notation.

-----------------------------------

STEP 1 — Add CSS

In styles.css:

.king-in-check {
  background-color: rgba(255, 0, 0, 0.6);
}

-----------------------------------

STEP 2 — Add highlight function

In board.js

Add:

function highlightKingInCheck(color) {

  const rows =
    currentFEN.split("/");

  for (let row = 0; row < 8; row++) {

    let col = 0;

    for (const char of rows[row]) {

      if (!isNaN(char)) {

        col += Number(char);

      } else {

        if (
          (color === "white" && char === "K") ||
          (color === "black" && char === "k")
        ) {

          const kingSquare =
            document.querySelector(
              `[data-row="${row}"][data-col="${col}"]`
            );

          if (kingSquare) {
            kingSquare.classList.add(
              "king-in-check"
            );
          }

        }

        col++;

      }

    }

  }

}

-----------------------------------

STEP 3 — Clear previous check highlight

Add:

function clearCheckHighlight() {

  document
    .querySelectorAll(".king-in-check")
    .forEach(square => {
      square.classList.remove(
        "king-in-check"
      );
    });

}

-----------------------------------

STEP 4 — Use server response

Inside:

sendMoveToBackend()

After:

renderBoardFromFEN(currentFEN);

Add:

clearCheckHighlight();

if (data.check) {

  highlightKingInCheck(
    data.turn
  );

}

-----------------------------------

STEP 5 — Ensure backend sends check flag

In applyMove.js

After move logic:

const opponent =
  nextTurn;

const check =
  isKingInCheck(
    newBoard,
    opponent
  );

Return:

res.json({
  boardState: newFEN,
  turn: nextTurn,
  moves: game.moves,
  check
});
