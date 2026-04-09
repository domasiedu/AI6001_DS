Create a new test file:

server/tests/fullGameSimulation.js

Requirements:

1. Import required modules:

- applyMove
- initialBoard
- parseFEN

2. Create a mock game object:

Include:

boardState
moves array
turn
status
winner
castlingRights

3. Simulate a short real chess game using moves:

e2 → e4
e7 → e5
g1 → f3
b8 → c6
f1 → c4
g8 → f6
e1 → g1 (castle)

4. After each move:

Call applyMove()

Log:

- boardState
- turn
- moves length

5. At the end:

Print:

"Full simulation completed successfully"

Do not modify engine logic.
Only create simulation test.