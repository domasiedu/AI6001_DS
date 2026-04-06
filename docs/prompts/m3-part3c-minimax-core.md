# Milestone 3 — Part 3C  
## Minimax Core Algorithm

**Objective**

Replace random AI logic with a Minimax-based decision system.

Modify ONLY:

client/js/board.js

Do not modify rendering.

Do not change human gameplay logic.

---

# PROJECT CONTEXT

The system currently supports:

- Random AI
- Board simulation
- Simulated win detection

Now we upgrade AI to:

Minimax-based decision making.

---

# TASK 1 — Create evaluateBoard()

Add:

function evaluateBoard(simBoard, player) {

  const opponent = player === 1 ? 2 : 1;

  let score = 0;

  // Simple scoring:
  // Favor center column

  const centerColumn = Math.floor(COLS / 2);

  let centerCount = 0;

  for (let r = 0; r < ROWS; r++) {

    if (simBoard[r][centerColumn] === player) {
      centerCount++;
    }

  }

  score += centerCount * 3;

  return score;

}

---

# TASK 2 — Create minimax()

Add:

function minimax(
  simBoard,
  depth,
  maximizingPlayer
) {

  const validColumns = getValidColumns();

  if (depth === 0 || validColumns.length === 0) {

    return {
      score: evaluateBoard(simBoard, 2)
    };

  }

  if (maximizingPlayer) {

    let maxEval = -Infinity;
    let bestColumn = validColumns[0];

    for (const column of validColumns) {

      const tempBoard =
        copyBoard(simBoard);

      const row =
        getNextOpenRow(
          tempBoard,
          column
        );

      simulateDrop(
        tempBoard,
        row,
        column,
        2
      );

      const evaluation =
        minimax(
          tempBoard,
          depth - 1,
          false
        ).score;

      if (evaluation > maxEval) {

        maxEval = evaluation;
        bestColumn = column;

      }

    }

    return {
      column: bestColumn,
      score: maxEval
    };

  } else {

    let minEval = Infinity;

    for (const column of validColumns) {

      const tempBoard =
        copyBoard(simBoard);

      const row =
        getNextOpenRow(
          tempBoard,
          column
        );

      simulateDrop(
        tempBoard,
        row,
        column,
        1
      );

      const evaluation =
        minimax(
          tempBoard,
          depth - 1,
          true
        ).score;

      minEval =
        Math.min(minEval, evaluation);

    }

    return {
      score: minEval
    };

  }

}

---

# TASK 3 — Replace aiMove()

Modify aiMove():

function aiMove() {

  if (gameOver) return;

  const result =
    minimax(board, 3, true);

  const column =
    result.column;

  if (column !== null) {

    dropPiece(column);

  }

}

---

# EXPECTED RESULT

AI now:

Prefers center columns.

Makes more strategic moves.

Not purely random.

Game remains playable.

---

# IMPORTANT

Do not remove random logic yet.

Replace only aiMove().