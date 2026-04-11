Improve chess board container styling and layout.

-----------------------------------
STEP 1 — Wrap Board Inside Container
-----------------------------------

Open:

client/play.html

Find the board element:

<div id="board"></div>

Wrap it like this:

<div class="game-container">

  <div class="board-wrapper">

    <div id="board"></div>

  </div>

</div>

-----------------------------------
STEP 2 — Add Board Frame Styling
-----------------------------------

Open:

client/styles.css

Add:

.game-container {

  display: flex;

  justify-content: center;

  margin-top: 20px;

}

.board-wrapper {

  background:

    linear-gradient(
      135deg,
      #2a5298,
      #1e3c72
    );

  padding: 12px;

  border-radius: 14px;

  box-shadow:

    0 12px 30px
    rgba(0,0,0,0.35);

}

#board {

  border-radius: 8px;

  overflow: hidden;

}

-----------------------------------
STEP 3 — Improve Board Shadow
-----------------------------------

Still in styles.css

Add:

.square {

  transition:

    transform 0.15s;

}

.square:hover {

  transform:

    scale(1.02);

}
