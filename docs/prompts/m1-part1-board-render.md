# Connect Four – Milestone 1 (Part 1)
### Board Rendering Setup (HTML, CSS, JS)

---

## 📌 Project Instructions

You are helping me build a Connect Four game step-by-step.

### IMPORTANT
- Only generate the files requested.
- Do not add extra frameworks.
- Use plain HTML, CSS, and JavaScript.
- Use HTML Canvas for rendering.
- Follow modular coding style.
- Keep code readable and well-structured.

---

## 🎮 Project Context

This is a web-based Connect Four game.

Board size:

- **7 columns**
- **6 rows**

Each cell is drawn as a circular slot.

This step is **ONLY** responsible for drawing the empty board.

❌ No gameplay logic  
❌ No click detection  
❌ No animations  

✅ Just board rendering

---

# 📁 Files to Create

## 1. `client/play.html`

Create a simple HTML page containing:

- Page title: **Connect Four**
- A centered canvas element
- Canvas ID: **`gameCanvas`**
- Link CSS file: `css/play.css`
- Load JavaScript file: `js/board.js`

---

## 2. `client/css/play.css`

Style requirements:

- Dark background page
- Center content vertically and horizontally
- Canvas background color: **`#0047ab`**
- Canvas should have rounded corners
- Clean minimal styling

---

## 3. `client/js/board.js`

Implement board rendering logic.

### Board Settings
- Columns: **7**
- Rows: **6**
- Cell size: **80px**

Canvas dimensions:

- Width = `columns × cell size`
- Height = `rows × cell size`

---

## 🎨 Drawing Requirements

Draw:

- Blue rectangular board background
- Circular empty slots

Slot color: **`#1a1a1a`**

Each slot must:

- Be centered in its grid cell
- Have consistent spacing
- Be drawn using `canvas.arc()`

---

## 🧩 Function Requirements

Create a function:

### `drawBoard()`

This function must:

- Clear the canvas
- Draw the board background
- Draw all empty circular slots

Call `drawBoard()` immediately after script loads.

---

## 🖥️ Expected Output

When opening:


The user should see:

- A Connect Four board
- 7 columns
- 6 rows
- Dark circular slots
- Blue board background

No interaction yet.

---

## ✨ Code Quality Requirements

- Use clear constants:
  - `COLS`
  - `ROWS`
  - `CELL_SIZE`
- Add comments explaining logic
- Keep functions small and readable
- Do **not** add gameplay logic
- Do **not** add click handling

---

# End of Milestone 1 – Part 1
