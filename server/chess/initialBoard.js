/*
Initial Chess Board (FEN format)

rnbqkbnr
pppppppp
........
........
........
........
PPPPPPPP
RNBQKBNR
*/

function getInitialBoard() {

  // Standard chess starting position (FEN)

  return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

}

module.exports = getInitialBoard;