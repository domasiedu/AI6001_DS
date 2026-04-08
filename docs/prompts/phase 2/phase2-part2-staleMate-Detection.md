Create isStalemate.js inside server/chess.

Imports:

isKingInCheck
getAllPossibleMoves

Implement:

isStalemate(fen, color)

Steps:

1. Check if king is in check:

If true:

return false

(Not stalemate)

2. Get all legal moves:

getAllPossibleMoves(fen, color)

3. If no moves exist:

return true

(Stalemate)

Otherwise:

return false

Export:

module.exports = isStalemate;