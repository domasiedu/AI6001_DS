Create a new test file:

server/tests/promotionStressTest.js

Requirements:

1. Import:

- applyMove
- parseFEN

2. Create a mock game object:

Use board state:

4k3/P7/8/8/8/8/8/4K3

Set:

turn: "white"
status: "active"
moves: []

Include full castlingRights object.

3. Execute promotion move:

fromRow: 1
fromCol: 0
toRow: 0
toCol: 0

4. After move:

Print:

- boardState
- moves array
- last move notation

5. Verify:

Pawn promoted to Queen
Notation includes "=Q"

Print:

"Promotion test completed successfully"
