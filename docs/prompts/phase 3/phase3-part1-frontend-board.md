Update the frontend to render the chess board grid.

Use existing structure:

client/play.html  
client/css/styles.css  
client/js/board.js  

Requirements:

1. In play.html:

Add:

<div id="board"></div>

Link CSS:

<link rel="stylesheet" href="css/styles.css">

Link JS:

<script src="js/board.js"></script>

2. In css/styles.css:

Add:

#board {
  display: grid;
  grid-template-columns: repeat(8, 70px);
  grid-template-rows: repeat(8, 70px);
  width: 560px;
  height: 560px;
  margin: 20px auto;
}

.square {
  width: 70px;
  height: 70px;
}

.light {
  background-color: #f0d9b5;
}

.dark {
  background-color: #b58863;
}

3. In js/board.js:

Generate board squares:

const board = document.getElementById("board");

for (let row = 0; row < 8; row++) {

  for (let col = 0; col < 8; col++) {

    const square = document.createElement("div");

    square.classList.add("square");

    if ((row + col) % 2 === 0) {
      square.classList.add("light");
    } else {
      square.classList.add("dark");
    }

    square.dataset.row = row;
    square.dataset.col = col;

    board.appendChild(square);

  }

}
