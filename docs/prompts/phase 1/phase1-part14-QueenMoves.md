Create validateQueenMove.js inside server/chess.

Import:

const validateRookMove = require("./validateRookMove");
const validateBishopMove = require("./validateBishopMove");

Implement:

validateQueenMove(board, fromRow, fromCol, toRow, toCol)

Rules:

Queen can move:

- Like a rook (horizontal or vertical)
OR
- Like a bishop (diagonal)

Implementation:

If validateRookMove(...) returns true:

return true

If validateBishopMove(...) returns true:

return true

Otherwise:

return false

Export:

module.exports = validateQueenMove;