Improve chess UI layout and responsiveness.

Do NOT modify any JavaScript logic.

Only update HTML structure and CSS styling.

-----------------------------------

FILES:

client/play.html
client/css/styles.css

-----------------------------------

STEP 1 — Wrap main layout

In play.html:

Wrap everything inside:

<div class="app-container">

  <div class="top-bar">

    <div id="game-status">
      CHECKMATE — BLACK WINS
    </div>

    <div class="controls">
      <button id="restartBtn">
        Restart Game
      </button>

      <button id="undoBtn">
        Undo Move
      </button>
    </div>

  </div>

  <div class="main-layout">

    <div class="board-container">
      <!-- Existing chess board here -->
    </div>

    <div class="side-panel">

      <div class="panel-section">
        <h3>White Captures</h3>
        <div id="white-captures"></div>
      </div>

      <div class="panel-section">
        <h3>Black Captures</h3>
        <div id="black-captures"></div>
      </div>

      <div class="panel-section">
        <h3>Material</h3>
        <div id="material-display"></div>
      </div>

      <div class="panel-section">
        <h3>Move History</h3>
        <div id="move-history"></div>
      </div>

    </div>

  </div>

</div>

-----------------------------------

STEP 2 — Add Responsive CSS

In styles.css:

Add:

body {
  font-family:
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;

  background-color: #f4f6f8;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 1200px;
  margin: auto;
  padding: 10px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;
}

#game-status {
  font-weight: bold;
  font-size: 18px;

  background: #111;
  color: white;

  padding: 8px 16px;
  border-radius: 6px;
}

.controls button {

  margin-left: 8px;

  padding: 8px 14px;

  font-size: 14px;

  border-radius: 6px;

  border: none;

  background-color: #2d6cdf;

  color: white;

  cursor: pointer;

}

.controls button:hover {
  background-color: #1f4fbf;
}

.main-layout {

  display: flex;

  gap: 20px;

}

.board-container {

  flex: 1;

}

.side-panel {

  width: 260px;

  display: flex;

  flex-direction: column;

  gap: 14px;

}

.panel-section {

  background: white;

  padding: 10px;

  border-radius: 8px;

  box-shadow:
    0 2px 6px rgba(0,0,0,0.1);

}

.panel-section h3 {

  margin-top: 0;

  font-size: 14px;

}

-----------------------------------

STEP 3 — Add Mobile Responsiveness

Add:

@media (max-width: 900px) {

  .main-layout {

    flex-direction: column;

  }

  .side-panel {

    width: 100%;

  }

}

# Prompt 2

Enhance side panel styling.

File:
client/css/styles.css

-----------------------------------

STEP 1 — Improve panel look

Update:

.panel-section {

  background: white;

  padding: 14px;

  border-radius: 10px;

  box-shadow:

    0 3px 10px rgba(0,0,0,0.12);

}

-----------------------------------

STEP 2 — Improve headers

.panel-section h3 {

  font-size: 15px;

  font-weight: 600;

  border-bottom: 1px solid #ddd;

  padding-bottom: 6px;

  margin-bottom: 10px;

}

# Prompt 3

Improve game status styling.

File:
client/css/styles.css

-----------------------------------

Update:

#game-status {

  font-weight: bold;

  font-size: 18px;

  background: linear-gradient(
    90deg,
    #111,
    #333
  );

  color: white;

  padding: 10px 18px;

  border-radius: 8px;

  box-shadow:

    0 3px 8px rgba(0,0,0,0.25);

}

# Prompt 4

Improve button styling.

File:
client/css/styles.css

-----------------------------------

.controls button {

  margin-left: 8px;

  padding: 10px 16px;

  font-size: 14px;

  border-radius: 8px;

  border: none;

  background-color: #2d6cdf;

  color: white;

  font-weight: 600;

  transition: 0.2s;

}

.controls button:hover {

  background-color: #1f4fbf;

  transform: translateY(-1px);

}

.controls button:active {

  transform: translateY(0);

}

# Prompt 5

Move game status banner below chess board.

File:
client/play.html

-----------------------------------

STEP 1 — Locate:

<div id="game-status">

-----------------------------------

STEP 2 — Move this block:

<div id="game-status"></div>

To be directly BELOW:

<div id="chess-board"></div>

Example final layout:

<div class="board-container">

  <div id="chess-board"></div>

  <div id="game-status"></div>

</div>

-----------------------------------

STEP 3 — Update CSS

File:
client/css/styles.css

Update:

#game-status {

  margin-top: 14px;

  text-align: center;

}
