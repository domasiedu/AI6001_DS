# Prompt 1

Create applyMove.js inside server/chess.

Imports:

movePiece
isKingInCheck
isCheckmate
isStalemate

Implement:

applyMove(game, fromRow, fromCol, toRow, toCol)

Inputs:

game object from database
move coordinates

Behavior:

1. Get current boardState (FEN)

2. Apply move:

newFEN = movePiece(...)

3. Add move to:

game.moves array

4. Update:

game.boardState = newFEN

5. Determine next turn:

Switch between:

white → black  
black → white

6. Check game status:

If isCheckmate(newFEN, opponentColor):

game.status = "checkmate"
game.winner = currentPlayer

If isStalemate(newFEN, opponentColor):

game.status = "stalemate"

Otherwise:

game.status = "active"

Return updated game object.

Export:

module.exports = applyMove;

# Prompt 2

Update server/api/games.js.

Add new route:

PUT /:id/move

Imports:

applyMove

Behavior:

1. Get game from database by ID

2. Extract:

fromRow
fromCol
toRow
toCol

from request body.

3. Call:

applyMove(...)

4. Save updated game.

5. Return updated game.

Handle errors properly.

# Prompt 3

## Dev Log — Turn Enforcement Implementation

**Date:** [Today]

### Completed:

- Implemented piece ownership validation
- Prevented moving opponent pieces
- Enforced alternating player turns
- Validated move source square existence

### Tests Performed:

- Attempted opponent piece movement
- Verified move rejection behavior
- Confirmed correct turn handling

### Status:

Turn enforcement fully operational.
Game move system now enforces correct player ownership.