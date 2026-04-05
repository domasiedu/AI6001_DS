# Milestone 2 — Part 5  
## Restart Game Button

**Objective**

Add a Restart Game button that resets the board and allows a new game to begin.

Modify:

client/play.html  
client/js/board.js

---

# TASK 1 — Add Restart Button to HTML

Open:

client/play.html

Below the canvas element, add:

<button id="restartButton">
  Restart Game
</button>

Style is optional.

---

# TASK 2 — Add resetGame() Function

In:

client/js/board.js

Add:

function resetGame() {
  board = createBoard();
  currentPlayer = 1;
  gameOver = false;
  winningCells = [];
  drawBoard();
}

---

# TASK 3 — Add Event Listener

At the bottom of board.js:

Add:

document
  .getElementById("restartButton")
  .addEventListener("click", resetGame);

---

# TASK 4 — Ensure Draw Works After Reset

After resetting:

drawBoard();

must redraw empty board.

---

# EXPECTED RESULT

Click Restart:

Board clears  
All pieces disappear  
Player resets to Player 1  
Game playable again  
Winning highlights cleared  

---

# IMPORTANT

Do not modify:

Win logic  
Drop logic  
Rendering logic  

Only add reset behavior.