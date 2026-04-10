Update client/js/board.js to render chess pieces from a FEN string.

Requirements:

1. Add initial FEN:

const initialFEN =
"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

2. Create piece mapping:

Use Unicode chess pieces.

Add:

const pieces = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙"
};

3. Create function:

function renderBoardFromFEN(fen)

Split FEN rows:

const rows = fen.split("/");

Loop rows:

for (let row = 0; row < 8; row++) {

  let col = 0;

  for (const char of rows[row]) {

    if (!isNaN(char)) {

      col += Number(char);

    } else {

      const square =
        document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );

      square.textContent = pieces[char];

      col++;

    }

  }

}

4. Call:

renderBoardFromFEN(initialFEN);
