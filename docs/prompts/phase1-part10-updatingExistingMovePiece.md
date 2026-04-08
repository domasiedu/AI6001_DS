Update the existing movePiece.js file.

Requirements:

1. Import pawn validator:

const validatePawnMove = require("./validatePawnMove");

2. After parsing the board and retrieving the piece,
add validation logic specifically for pawns.

Behavior:

- If the piece is "P" or "p":
    - Call validatePawnMove(...)
    - If validation returns false:
        throw new Error("Invalid pawn move")

- Only allow the move if validation passes.

- Keep all existing functionality:
    - parse FEN
    - move piece
    - regenerate FEN

Important:

Do not remove existing logic.
Only insert pawn validation before moving the piece.