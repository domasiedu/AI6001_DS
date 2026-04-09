# Prompt 1
Create file:

server/chess/notation.js

Function:

generateNotation(fromRow, fromCol, toRow, toCol, piece, captured)

Requirements:

1. Convert column index to file letter:

0 → a  
1 → b  
2 → c  
...  
7 → h  

2. Convert row index to rank:

Row 7 → 1  
Row 6 → 2  
...  
Row 0 → 8  

Formula:

rank = 8 - row

3. Pawn move:

If piece === "P":

Return:

toFile + toRank

Example:

e4

4. Pawn capture:

Return:

fromFile + "x" + toFile + toRank

Example:

exd5

5. Piece move:

Uppercase letters:

R N B Q K

Return:

pieceLetter + toFile + toRank

Example:

Nf3

6. Piece capture:

Return:

pieceLetter + "x" + toFile + toRank

Example:

Qxd5

Export:

module.exports = generateNotation;

# Prompt 2

Update applyMove.js to support check (+) and checkmate (#) notation.

Requirements:

1. Find where notation is generated:

const notation = generateNotation(...)

Change it to:

let notation = generateNotation(...)

Important:
Use "let" instead of "const" because notation will be modified later.

2. After this line:

const opponentInCheck = isKingInCheck(newFEN, opponentColor);

Add:

if (opponentInCheck) {

  if (isCheckmate(newFEN, opponentColor)) {

    notation += "#";

  } else {

    notation += "+";

  }

}

3. Ensure the updated notation is saved inside:

game.moves.push({
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece: movingPiece,
  captured: capturedPiece,
  notation,
  timestamp: new Date(),
});

Do NOT modify any move logic.
Only update notation handling.

# Prompt 3

Update Game.js to add castling rights tracking.

Add a new field:

castlingRights

Structure:

castlingRights: {
  whiteKingMoved: {
    type: Boolean,
    default: false
  },
  whiteRookKingsideMoved: {
    type: Boolean,
    default: false
  },
  whiteRookQueensideMoved: {
    type: Boolean,
    default: false
  },
  blackKingMoved: {
    type: Boolean,
    default: false
  },
  blackRookKingsideMoved: {
    type: Boolean,
    default: false
  },
  blackRookQueensideMoved: {
    type: Boolean,
    default: false
  }
}

Place this after:

winner field.

Do not remove existing fields.