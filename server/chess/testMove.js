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

/* ===========================
   Test 7: Rook Move (Blocked)
=========================== */

try {

  let fen = getInitialBoard();

  movePiece(
    fen,
    7, 0,   // rook at a1
    5, 0    // blocked by pawn
  );

  console.log("\nTest 7 (Rook Blocked): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 7 (Rook Blocked): ✅ CORRECTLY FAILED");
  console.log(err.message);

}


/* ===========================
   Test 8: Rook Move (Valid)
=========================== */

try {

  let fen = getInitialBoard();

  // Move pawn out of the way
  fen = movePiece(fen, 6, 0, 4, 0);

  // Move rook
  fen = movePiece(fen, 7, 0, 5, 0);

  console.log("\nTest 8 (Rook Move): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 8 (Rook Move): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 9: Bishop Blocked
=========================== */

try {

  let fen = getInitialBoard();

  movePiece(
    fen,
    7, 2,  // bishop at c1
    5, 4   // blocked by pawn
  );

  console.log("\nTest 9 (Bishop Blocked): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 9 (Bishop Blocked): ✅ CORRECTLY FAILED");
  console.log(err.message);

}


/* ===========================
   Test 10: Bishop Move Valid
=========================== */

try {

  let fen = getInitialBoard();

  // Move pawn out of bishop path
  fen = movePiece(fen, 6, 3, 4, 3);

  // Move bishop
  fen = movePiece(fen, 7, 2, 5, 4);

  console.log("\nTest 10 (Bishop Move): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 10 (Bishop Move): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 11: Queen Blocked
=========================== */

try {

  let fen = getInitialBoard();

  movePiece(
    fen,
    7, 3,   // queen at d1
    5, 3    // blocked by pawn
  );

  console.log("\nTest 11 (Queen Blocked): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 11 (Queen Blocked): ✅ CORRECTLY FAILED");
  console.log(err.message);

}


/* ===========================
   Test 12: Queen Move Valid
=========================== */

try {

  let fen = getInitialBoard();

  // Move pawn out of queen path
  fen = movePiece(fen, 6, 3, 4, 3);

  // Move queen
  fen = movePiece(fen, 7, 3, 5, 3);

  console.log("\nTest 12 (Queen Move): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 12 (Queen Move): ❌ FAILED");
  console.log(err.message);

}

/* ===========================
   Test 13: King Move (Valid)
=========================== */

try {

  let fen = getInitialBoard();

  // Move pawn to free king
  fen = movePiece(fen, 6, 4, 5, 4);

  // Move king
  fen = movePiece(fen, 7, 4, 6, 4);

  console.log("\nTest 13 (King Move): ✅ PASSED");
  console.log(fen);

} catch (err) {

  console.log("\nTest 13 (King Move): ❌ FAILED");
  console.log(err.message);

}


/* ===========================
   Test 14: King Move (Invalid)
=========================== */

try {

  let fen = getInitialBoard();

  movePiece(
    fen,
    7, 4,
    5, 4   // too far
  );

  console.log("\nTest 14 (King Invalid): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 14 (King Invalid): ✅ CORRECTLY FAILED");
  console.log(err.message);

}

const isKingInCheck = require("./isKingInCheck");

/* ===========================
   Test 15: King In Check
=========================== */

try {

  let fen = "4k3/8/8/8/8/8/8/4R3";

  const result = isKingInCheck(
    fen,
    "black"
  );

  if (result) {

    console.log("\nTest 15 (Check Detection): ✅ PASSED");

  } else {

    console.log("\nTest 15 (Check Detection): ❌ FAILED");

  }

} catch (err) {

  console.log("\nTest 15 Error:");
  console.log(err.message);

}

/* ===========================
   Test 16: Illegal Move Into Check
=========================== */

try {

  let fen = "4k3/8/8/8/8/8/4r3/4K3";

  movePiece(
    fen,
    7, 4,  // white king e1
    7, 3   // tries to move while still exposed
  );

  console.log("\nTest 16 (Move Into Check): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 16 (Move Into Check): ✅ CORRECTLY FAILED");
  console.log(err.message);

}


/* ===========================
   Test 17: Legal Move Out of Check
=========================== */

try {

  let fen = "4k3/8/8/8/8/8/4r3/4K3";

  const updated = movePiece(
    fen,
    7, 4,  // white king e1
    6, 4   // king captures/escapes depending on board
  );

  console.log("\nTest 17 (Move Out of Check): ✅ PASSED");
  console.log(updated);

} catch (err) {

  console.log("\nTest 17 (Move Out of Check): ❌ FAILED");
  console.log(err.message);

}

const isCheckmate = require("./isCheckmate");

/* ===========================
   Test 18: Checkmate Detection
=========================== */

try {

  let fen = "7k/6Q1/6K1/8/8/8/8/8";

  const result = isCheckmate(
    fen,
    "black"
  );

  if (result) {

    console.log("\nTest 18 (Checkmate): ✅ PASSED");

  } else {

    console.log("\nTest 18 (Checkmate): ❌ FAILED");

  }

} catch (err) {

  console.log("\nTest 18 Error:");
  console.log(err.message);

}

const isStalemate = require("./isStalemate");

/* ===========================
   Test 19: Stalemate Detection
=========================== */

try {

  let fen = "7k/5Q2/6K1/8/8/8/8/8";

  const result = isStalemate(
    fen,
    "black"
  );

  if (result) {

    console.log("\nTest 19 (Stalemate): ✅ PASSED");

  } else {

    console.log("\nTest 19 (Stalemate): ❌ FAILED");

  }

} catch (err) {

  console.log("\nTest 19 Error:");
  console.log(err.message);

}

/* ===========================
   Test 20: Wrong Turn Move
=========================== */

try {

  let game = {
    boardState: getInitialBoard(),
    moves: [],
    turn: "white",
    status: "active"
  };

  applyMove(
    game,
    1, 0,   // black pawn
    2, 0
  );

  console.log("\nTest 20 (Wrong Turn): ❌ SHOULD FAIL");

} catch (err) {

  console.log("\nTest 20 (Wrong Turn): ✅ CORRECTLY FAILED");
  console.log(err.message);

}