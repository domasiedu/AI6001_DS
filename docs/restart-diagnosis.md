# Restart Game Diagnosis

## Scope
- Investigated restart flow only.
- No functional code changes made.

## 1) Restart Button Location
- File: `client/play.html`
- Button: `<button id="restartBtn">Restart Game</button>` at line 13.
- Script wiring comes from `client/js/board.js` (included at line 96).

## 2) Restart Handler Trace
- File: `client/js/board.js`
- Restart click handler: around lines 835-862.
- It performs UI cleanup:
  - Clears selection/highlights.
  - Clears game-over banner.
  - Clears move history/capture panels/material display.
- Core action: `await createNewGame();` (line 847).

## 3) API Request Used by Restart
- `createNewGame()` in `client/js/board.js` (around lines 714-806) sends:
  - `POST http://localhost:3000/api/games` (lines 726-729)
  - `Authorization` header with token.
- This is the same endpoint used on initial page load (`createNewGame();` at line 808).

## 4) Backend Route Behavior
- File: `server/api/games.js`
- Route: `router.post("/", authMiddleware, ...)` at line 21.
- Logic:
  - Finds existing active game for user:
    - `Game.findOne({ user: userId, status: "active" })` (lines 25-29)
  - If found, returns it immediately:
    - `"Resuming existing game"` log (line 33)
    - `return res.json(existingGame);` (line 36)
  - Only creates a new game if no active game exists.
  - New-game board state is set to:
    - `"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"` (line 43)

## 5) Database Reset/Delete Behavior
- No restart-specific endpoint was found (no `/restart` or `/reset` route).
- Current restart flow does not:
  - delete current game, or
  - reset current game document fields.
- It only calls `POST /api/games`, which returns existing active game unchanged when one exists.

## 6) Frontend Board Reload Behavior After Restart
- UI does reload the board after API response:
  - `gameId = data._id` (line 783)
  - `currentFEN = data.boardState` (lines 785-786)
  - `clearBoard(); renderBoardFromFEN(currentFEN);` (lines 790-793)
- Therefore, render path is working.
- But because backend returns existing active game during restart, the board reloads mid-game state, not initial state.

## 7) Resume Functionality Status
- Resume behavior is currently tied to `POST /api/games` intentionally:
  - If active game exists, backend returns it.
- This explains why resume works correctly today.

## Root Cause
- Restart button is wired to `createNewGame()`, but backend `POST /api/games` is designed to resume active games first.
- So restart does not reset persisted game state; it reloads the same active game.
- UI cleanup (history/captures/material) runs regardless, which can create partial visual reset while board state remains mid-game.

## FEN Note
- The codebase stores board layout FEN only (piece placement), not full FEN metadata string with turn/castling/en-passant/halfmove/fullmove in one field.
- Turn/castling/en-passant are tracked in separate fields (`turn`, `castlingRights`, `enPassantTarget`).
