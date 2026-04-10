const movePiece = require("./movePiece");
const isKingInCheck = require("./isKingInCheck");
const isCheckmate = require("./isCheckmate");
const isStalemate = require("./isStalemate");
const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");

function applyMove(game, fromRow, fromCol, toRow, toCol) {
  if (Array.isArray(game)) {
    const board = game;
    const piece = board[fromRow][fromCol];

    board[fromRow][fromCol] = null;
    board[toRow][toCol] = piece;

    return board;
  }

  if (game.status === "finished") {
    throw new Error("Game already finished");
  }

  const currentFEN = game.boardState;
  const currentPlayer = game.turn || "white";
  const currentColor = currentPlayer;
  const opponentColor = currentPlayer === "white" ? "black" : "white";
  const board = parseFEN(currentFEN);
  const piece = board[fromRow][fromCol];

  if (!piece) {
    throw new Error("No piece at source square");
  }

  const pieceColor = piece === piece.toUpperCase() ? "white" : "black";

  if (pieceColor !== currentPlayer) {
    throw new Error("Invalid move: not your turn");
  }

  const movingPiece = board[fromRow][fromCol];

  if (!game.castlingRights) {
    game.castlingRights = {
      whiteKingMoved: false,
      whiteRookKingsideMoved: false,
      whiteRookQueensideMoved: false,
      blackKingMoved: false,
      blackRookKingsideMoved: false,
      blackRookQueensideMoved: false,
    };
  }

  if (movingPiece === "K") {
    game.castlingRights.whiteKingMoved = true;
  }

  if (movingPiece === "k") {
    game.castlingRights.blackKingMoved = true;
  }

  if (movingPiece === "R" && fromRow === 7 && fromCol === 0) {
    game.castlingRights.whiteRookQueensideMoved = true;
  }

  if (movingPiece === "R" && fromRow === 7 && fromCol === 7) {
    game.castlingRights.whiteRookKingsideMoved = true;
  }

  if (movingPiece === "r" && fromRow === 0 && fromCol === 0) {
    game.castlingRights.blackRookQueensideMoved = true;
  }

  if (movingPiece === "r" && fromRow === 0 && fromCol === 7) {
    game.castlingRights.blackRookKingsideMoved = true;
  }

  const isCastlingMove = (movingPiece === "K" || movingPiece === "k")
    && Math.abs(toCol - fromCol) === 2;

  let boardStateForMove = currentFEN;

  if (isCastlingMove) {
    if (isKingInCheck(currentFEN, currentColor)) {
      throw new Error("Illegal castling: King is in check");
    }

    const intermediateCol = toCol === 6 ? fromCol + 1 : fromCol - 1;
    const intermediateBoard = board.map((row) => [...row]);

    intermediateBoard[fromRow][fromCol] = null;
    intermediateBoard[fromRow][intermediateCol] = movingPiece;

    const intermediateFEN = generateFEN(intermediateBoard);

    if (isKingInCheck(intermediateFEN, currentColor)) {
      throw new Error("Illegal castling: Cannot pass through check");
    }

    const finalBoard = board.map((row) => [...row]);

    finalBoard[fromRow][fromCol] = null;
    finalBoard[toRow][toCol] = movingPiece;

    const finalFEN = generateFEN(finalBoard);

    if (isKingInCheck(finalFEN, currentColor)) {
      throw new Error("Illegal castling: Cannot castle into check");
    }

    let rookFromRow;
    let rookFromCol;
    let rookToRow;
    let rookToCol;

    if (fromRow === 7 && toCol === 6) {
      rookFromRow = 7;
      rookFromCol = 7;
      rookToRow = 7;
      rookToCol = 5;
    }

    if (fromRow === 7 && toCol === 2) {
      rookFromRow = 7;
      rookFromCol = 0;
      rookToRow = 7;
      rookToCol = 3;
    }

    if (fromRow === 0 && toCol === 6) {
      rookFromRow = 0;
      rookFromCol = 7;
      rookToRow = 0;
      rookToCol = 5;
    }

    if (fromRow === 0 && toCol === 2) {
      rookFromRow = 0;
      rookFromCol = 0;
      rookToRow = 0;
      rookToCol = 3;
    }

    if (rookFromRow !== undefined) {
      board[rookToRow][rookToCol] = board[rookFromRow][rookFromCol];
      board[rookFromRow][rookFromCol] = null;
      boardStateForMove = generateFEN(board);
    }
  }

  const latestBoardFEN =
    generateFEN(board);

  const capturedPiece =
    board[toRow][toCol] || null;

  let newFEN = movePiece(latestBoardFEN, fromRow, fromCol, toRow, toCol);
  let promoted = false;
  const updatedBoard = parseFEN(newFEN);

  // Handle en passant capture
  if (
    game.enPassantTarget &&
    movingPiece.toLowerCase() === "p"
  ) {
    if (
      toRow === game.enPassantTarget.row &&
      toCol === game.enPassantTarget.col
    ) {
      const direction =
        movingPiece === "P"
          ? 1
          : -1;

      const capturedPawnRow =
        toRow + direction;

      updatedBoard[
        capturedPawnRow
      ][toCol] = null;

      newFEN =
        generateFEN(updatedBoard);
    }
  }

  if (movingPiece === "P" && toRow === 0) {
    updatedBoard[toRow][toCol] = "Q";
    newFEN = generateFEN(updatedBoard);
    promoted = true;
  }

  if (movingPiece === "p" && toRow === 7) {
    updatedBoard[toRow][toCol] = "q";
    newFEN = generateFEN(updatedBoard);
    promoted = true;
  }

  const kingInCheck = isKingInCheck(newFEN, currentColor);

  if (kingInCheck) {
    throw new Error("Illegal move: King would be in check");
  }

  const checkmate =
    isCheckmate(
      updatedBoard,
      opponentColor
    );

  if (checkmate) {
    console.log(
      "CHECKMATE:",
      opponentColor
    );
  }

  if (!Array.isArray(game.moves)) {
    game.moves = [];
  }

  const generateNotation = require("./notation");

  let notation;

  if (isCastlingMove) {
    if (toCol === 6) {
      notation = "O-O";
    }

    if (toCol === 2) {
      notation = "O-O-O";
    }
  } else {
    notation = generateNotation(
      fromRow,
      fromCol,
      toRow,
      toCol,
      movingPiece,
      capturedPiece
    );
  }

  if (promoted) {
    if (movingPiece === "P") {
      notation += "=Q";
    }

    if (movingPiece === "p") {
      notation += "=q";
    }
  }

  // Reset en passant target
  game.enPassantTarget = null;

  // Detect double pawn move
  if (
    (movingPiece === "P" &&
     fromRow === 6 &&
     toRow === 4)
    ||
    (movingPiece === "p" &&
     fromRow === 1 &&
     toRow === 3)
  ) {
    game.enPassantTarget = {
      row: (fromRow + toRow) / 2,
      col: fromCol
    };
  }

  game.boardState = newFEN;
  game.turn = opponentColor;

  if (!Array.isArray(game.history)) {
    game.history = [];
  }

  if (game.history.length === 0) {
    game.history.push(currentFEN);
  }

  game.history.push(newFEN);

  const opponent =
    game.turn;

  const boardArray =
    parseFEN(newFEN);

  const check =
    isKingInCheck(
      boardArray,
      opponent
    );

  game.check = check;

  console.log(
    "CHECK STATUS:",
    check
  );

  const opponentInCheck = check;

  console.log(
    "Opponent color:",
    opponentColor
  );

  console.log(
    "Opponent in check:",
    opponentInCheck
  );

  if (opponentInCheck) {
    const checkmateResult =
      isCheckmate(newFEN, opponentColor);

    console.log(
      "Checkmate result:",
      checkmateResult
    );

    if (checkmateResult) {
      notation += "#";
    } else {
      notation += "+";
    }
  }

  game.moves.push({
    fromRow,
    fromCol,
    toRow,
    toCol,
    piece,
    captured: capturedPiece,
    notation,
    timestamp: new Date(),
  });

  if (opponentInCheck && isCheckmate(newFEN, opponentColor)) {
    game.status = "finished";
    game.winner = opponentColor === "white" ? "black" : "white";

    return game;
  }

  if (isStalemate(newFEN, opponentColor)) {
    game.status = "finished";
    game.winner = "draw";

    return game;
  }

  game.status = "active";
  game.winner = null;

  return game;
}

module.exports = applyMove;
