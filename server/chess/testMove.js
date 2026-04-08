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
