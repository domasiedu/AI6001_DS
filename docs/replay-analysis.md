# Replay Analysis

## Move History Format

Primary format in this codebase is **FORMAT B (coordinate objects)**:

- In schema, `moves` is an array of objects with:
  - `fromRow`, `fromCol`, `toRow`, `toCol`
  - `piece`, `captured`, `notation`, `timestamp`
- Source: `server/models/Game.js` (`moves` definition)

Server also stores **FEN snapshot history**:

- `history` is `type: [String]`
- `applyMove` appends board snapshots into `game.history`
- Source: `server/models/Game.js`, `server/chess/applyMove.js`

So replay data available today:

1. `game.moves` (coordinate move list + notation)
2. `game.history` (board FEN snapshots)

No standalone `moveHistory` array of SAN strings was found as the canonical store.

## Where Moves Are Stored

- DB model:
  - `server/models/Game.js`
  - `moves` array (coordinate objects)
  - `history` array (FEN strings)
- Move creation:
  - `server/chess/applyMove.js`
  - `game.moves.push({...})`
  - `game.history.push(newFEN)`
- Client consumption:
  - `client/js/board.js`
  - `updateMoveHistory(data.moves)`
  - `updateCapturedPieces(data.moves)`
  - `updateMaterialScore(data.moves)`

## Restart Dependency Check

Restart now resets board to starting FEN and clears move/FEN history:

- `client/js/board.js` uses `restartGame()` and calls `POST /api/games/restart`
- `server/api/games.js` restart route resets:
  - `boardState = getInitialBoard()`
  - `turn = "white"`
  - `history = [startingBoard]`
  - `moves = []`

Starting board FEN used by replay baseline:

- `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`

## Replay Engine Added

File added/updated:

- `client/js/replay.js`

Implemented:

- `ChessReplayEngine.detectFormat(moveList)`:
  - Detects `coordinates`, `fenHistory`, `algebraic`, `notationObjects`, `empty`, `unknown`
- `ChessReplayEngine.resetBoard()`:
  - Resets replay state to starting FEN
  - Uses existing `clearBoard()` / `renderBoardFromFEN()` when present
- `ChessReplayEngine.applyMoveFromHistory(move)`:
  - Supports coordinate object moves directly
  - Supports FEN snapshot steps directly
  - Supports SAN/algebraic parsing for common notation (`e4`, `Qh5`, captures, castling, promotion suffix)
- `ChessReplayEngine.replayMoves(moveList, { delayMs })`:
  - Resets board, then replays move-by-move via `setTimeout` (default 700ms)

Notes:

- This is standalone and not wired to UI buttons yet.
- Existing gameplay handlers were not modified.

## Replay Compatibility

Compatible with current board logic because:

- It reuses the same board representation (piece-placement FEN strings).
- It renders through existing board functions when available:
  - `clearBoard()`
  - `renderBoardFromFEN(fen)`
- It does not call gameplay APIs (`/move`, `/undo`) during replay.

## Risks

1. SAN/algebraic ambiguity:
   - Complex SAN disambiguation can be ambiguous in rare positions.
   - Coordinate format (`game.moves`) is safest and should be preferred.
2. Special-rule fidelity:
   - Replay engine includes castling/en-passant/promotion handling, but server remains source of truth for legal validation.
3. Global function availability:
   - `replay.js` assumes classic-script globals for `clearBoard` / `renderBoardFromFEN`.
   - If script loading changes to modules later, hooks may need explicit wiring.

## Summary

- Canonical move history format is coordinate objects (`game.moves`), with FEN snapshots also available (`game.history`).
- Restart reset path is now suitable for replay baseline.
- A safe, standalone replay engine has been added in `client/js/replay.js` without altering existing gameplay logic or adding UI controls yet.
