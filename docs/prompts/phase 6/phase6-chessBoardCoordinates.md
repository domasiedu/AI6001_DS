Add chess board coordinates (A-H, 1-8) around the board.

-----------------------------------
STEP 1 — Update board container
-----------------------------------

Open:

client/play.html

Find the chess board container:

<div id="chessboard"></div>

Replace with:

<div class="board-wrapper">

  <div class="file-labels top-files">
    <span>A</span>
    <span>B</span>
    <span>C</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
    <span>G</span>
    <span>H</span>
  </div>

  <div class="board-row">

    <div class="rank-labels left-ranks">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>

    <div id="chessboard"></div>

    <div class="rank-labels right-ranks">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>

  </div>

  <div class="file-labels bottom-files">
    <span>A</span>
    <span>B</span>
    <span>C</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
    <span>G</span>
    <span>H</span>
  </div>

</div>

-----------------------------------
STEP 2 — Add coordinate styling
-----------------------------------

Open:

client/css/play.css

Add:

.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-row {
  display: flex;
}

.file-labels {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 480px;
  text-align: center;
  font-weight: bold;
  color: #ccc;
}

.rank-labels {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  margin: 0 6px;
  font-weight: bold;
  color: #ccc;
}

.rank-labels span,
.file-labels span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-files {
  margin-bottom: 4px;
}

.bottom-files {
  margin-top: 4px;
}

-----------------------------------
STEP 3 — Adjust board size alignment
-----------------------------------

Ensure #chessboard width matches:

#chessboard {
  width: 480px;
  height: 480px;
}

-----------------------------------
STEP 4 — Test
-----------------------------------

Restart server.

Reload:

http://localhost:3000/play

Expected result:

✔ Letters A–H visible top and bottom  
✔ Numbers 1–8 visible left and right  
✔ Board remains functional  
✔ No gameplay changes
