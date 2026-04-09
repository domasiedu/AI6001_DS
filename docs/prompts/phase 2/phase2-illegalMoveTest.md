Create a new test file:

server/tests/illegalMoveStressTest.js

Requirements:

1. Import:

- applyMove

2. Create mock game object:

Use board:

rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

Include:

turn: "white"
status: "active"
moves: []
winner: null

Include full castlingRights object.

3. Test illegal move scenarios:

Test 1 — Move black piece on white turn

Try:

fromRow: 1
fromCol: 0
toRow: 2
toCol: 0

Catch error and print:

"Wrong turn test passed"

Test 2 — Illegal knight move

Try:

fromRow: 7
fromCol: 1
toRow: 7
toCol: 3

Catch error and print:

"Invalid move test passed"

Test 3 — Move after game finished

Set:

game.status = "finished"

Try move:

Expect error:

"Game finished test passed"

4. At the end print:

"Illegal move stress test completed successfully"
