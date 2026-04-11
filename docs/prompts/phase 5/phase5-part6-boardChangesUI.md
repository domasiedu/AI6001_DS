Apply bulk UI polish improvements (Batch 2).

Files:
client/play.html
client/css/styles.css

-----------------------------------
STEP 1 — Ensure Banner Under Board
(play.html)
-----------------------------------

Inside your board container, structure it like:

<div class="board-wrapper">

  <div id="chess-board"></div>

  <div id="game-status"></div>

</div>

-----------------------------------
STEP 2 — Improve Banner Styling
(styles.css)
-----------------------------------

#game-status {

  font-size: 20px;

  font-weight: 700;

  background:
    linear-gradient(
      90deg,
      #111,
      #333
    );

  color: white;

  padding: 12px 20px;

  border-radius: 12px;

  box-shadow:
    0 6px 14px rgba(0,0,0,0.3);

  margin-top: 16px;

  text-align: center;

  width: 100%;

}

-----------------------------------
STEP 3 — Captured Pieces Grid
-----------------------------------

.capture-list {

  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  min-height: 32px;

}

.capture-list img {

  width: 28px;

  height: 28px;

}

-----------------------------------
STEP 4 — Material Section Styling
-----------------------------------

.material-section {

  font-size: 15px;

  font-weight: 600;

}

.material-positive {

  color: #16a34a;

}

.material-negative {

  color: #dc2626;

}

-----------------------------------
STEP 5 — Improve Move History Box
-----------------------------------

#move-history {

  font-family: monospace;

  font-size: 14px;

  line-height: 1.6;

  max-height: 240px;

  overflow-y: auto;

}

-----------------------------------
STEP 6 — Add Scrollbar Styling
-----------------------------------

#move-history::-webkit-scrollbar {

  width: 6px;

}

#move-history::-webkit-scrollbar-thumb {

  background: #94a3b8;

  border-radius: 6px;

}

-----------------------------------
STEP 7 — Improve Panel Spacing
-----------------------------------

.panel-section {

  margin-bottom: 8px;

}

-----------------------------------
STEP 8 — Board Wrapper Centering
-----------------------------------

.board-wrapper {

  display: flex;

  flex-direction: column;

  align-items: center;

}

-----------------------------------
STEP 9 — Improve Font Hierarchy
-----------------------------------

h3 {

  font-size: 16px;

  font-weight: 600;

}

-----------------------------------
STEP 10 — Add Subtle Section Divider
-----------------------------------

.panel-section {

  border-top:
    3px solid #2563eb;

}


# Prompt 2

Apply final UI polish improvements (Batch 3).

File:
client/css/styles.css

-----------------------------------
STEP 1 — Highlight Current Move Square
-----------------------------------

.current-square {

  box-shadow:
    inset 0 0 10px rgba(59,130,246,0.7);

}

-----------------------------------
STEP 2 — Improve Legal Move Highlight
-----------------------------------

.legal {

  background-color:
    rgba(34,197,94,0.55) !important;

  transition:
    background-color 0.15s ease;

}

-----------------------------------
STEP 3 — Improve Last Move Highlight
-----------------------------------

.last-move {

  background-color:
    rgba(250,204,21,0.8) !important;

  box-shadow:
    inset 0 0 6px rgba(0,0,0,0.3);

}

-----------------------------------
STEP 4 — Improve Capture Display Layout
-----------------------------------

.capture-list {

  display: flex;

  flex-wrap: wrap;

  gap: 6px;

}

.capture-list img {

  width: 26px;

  height: 26px;

}

-----------------------------------
STEP 5 — Material Advantage Highlight
-----------------------------------

.material-positive {

  color: #16a34a;

  font-weight: bold;

}

.material-negative {

  color: #dc2626;

  font-weight: bold;

}

-----------------------------------
STEP 6 — Improve Banner Colors
-----------------------------------

#game-status {

  background:
    linear-gradient(
      90deg,
      #111,
      #444
    );

  letter-spacing: 0.4px;

}

-----------------------------------
STEP 7 — Improve Panel Visual Depth
-----------------------------------

.panel-section {

  transition:
    transform 0.15s ease;

}

.panel-section:hover {

  transform: translateY(-2px);

}

-----------------------------------
STEP 8 — Improve Button Interaction Feel
-----------------------------------

.controls button {

  transition:
    all 0.15s ease;

}

.controls button:active {

  transform: scale(0.96);

}

-----------------------------------
STEP 9 — Improve Board Transition Smoothness
-----------------------------------

.square {

  transition:
    background-color 0.15s ease;

}

-----------------------------------
STEP 10 — Mobile Final Tuning
-----------------------------------

@media (max-width: 600px) {

  #chess-board {

    width: min(95vw, 520px);

    height: min(95vw, 520px);

  }

}
