Create a file called validateKnightMove.js inside server/chess.

Implement function:

validateKnightMove(fromRow, fromCol, toRow, toCol)

Knight movement rules:

- Knight moves in L-shape:
    2 rows + 1 column
    OR
    2 columns + 1 row

Valid combinations:

(abs(row difference) == 2 AND abs(column difference) == 1)

OR

(abs(row difference) == 1 AND abs(column difference) == 2)

Return:

true → valid knight move  
false → invalid knight move

Export:

module.exports = validateKnightMove;