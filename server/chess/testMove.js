const getInitialBoard = require("./initialBoard");
const movePiece = require("./movePiece");

console.log("\n=== TESTING PAWN MOVES ===\n");

/* ===========================
   Test 1: e2 → e3 (Valid)
=========================== */

try {

  const result1 = movePiece(
    getInitialBoard(),
    6, 4,
    5, 4
  );

  console.log("Test 1 (e2 → e3): ✅ PASSED");
  console.log(result1);

} catch (err) {

  console.log("Test 1 (e2 → e3): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 2: e2 → e4 (Valid)
=========================== */

try {

  const result2 = movePiece(
    getInitialBoard(),
    6, 4,
    4, 4
  );

  console.log("\nTest 2 (e2 → e4): ✅ PASSED");
  console.log(result2);

} catch (err) {

  console.log("\nTest 2 (e2 → e4): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 3: e2 → e5 (Invalid)
=========================== */

try {

  movePiece(
    getInitialBoard(),
    6, 4,
    3, 4
  );

  console.log("\nTest 3 (e2 → e5): ❌ SHOULD FAIL BUT PASSED");

} catch (err) {

  console.log("\nTest 3 (e2 → e5): ✅ CORRECTLY FAILED");
  console.log(err.message);

}


/* ===========================
   Test 4: Pawn Capture
=========================== */

try {

  let fen = getInitialBoard();

  // Move white pawn forward
  fen = movePiece(fen, 6, 4, 4, 4);

  // Move black pawn forward
  fen = movePiece(fen, 1, 3, 3, 3);

  // White pawn captures black pawn
  fen = movePiece(fen, 4, 4, 3, 3);

  console.log("\nTest 4 (Pawn Capture): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 4 (Pawn Capture): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 5: Knight Move (Valid)
=========================== */

try {

  let fen = getInitialBoard();

  fen = movePiece(
    fen,
    7, 6,  // g1
    5, 5   // f3
  );

  console.log("\nTest 5 (Knight Move): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 5 (Knight Move): ❌ FAILED");
  console.log(err.message);

}


/* ===========================
   Test 6: Knight Move (Invalid)
=========================== */

try {

  let fen = getInitialBoard();

  movePiece(
    fen,
    7, 6,
    6, 6   // invalid move
  );

  console.log("\nTest 6 (Knight Invalid): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 6 (Knight Invalid): ✅ CORRECTLY FAILED");
  console.log(err.message);

}