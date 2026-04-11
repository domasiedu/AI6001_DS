Make chess UI responsive for smaller screens.

-----------------------------------
STEP 1 — Make Board Responsive
-----------------------------------

Open:

client/styles.css

Find:

#board

Add:

#board {

  width: min(90vw, 520px);

  height: min(90vw, 520px);

}

-----------------------------------
STEP 2 — Make Squares Scale
-----------------------------------

Find:

.square

Modify to:

.square {

  width: 100%;

  height: 100%;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: calc(32px + 1vw);

}

-----------------------------------
STEP 3 — Improve Top Controls Layout
-----------------------------------

Add:

@media (max-width: 768px) {

  .top-controls {

    flex-direction: column;

    gap: 10px;

    align-items: center;

  }

  .left-controls {

    justify-content: center;

    flex-wrap: wrap;

  }

  .right-controls {

    justify-content: center;

  }

}

-----------------------------------
STEP 4 — Resize Buttons for Mobile
-----------------------------------

Add:

@media (max-width: 480px) {

  button {

    padding: 8px 12px;

    font-size: 14px;

  }

}
