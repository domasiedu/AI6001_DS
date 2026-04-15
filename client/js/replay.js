/* Replay engine (standalone, no UI wiring) */
(function replayModule(global) {
  const STARTING_FEN =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

  function isFenBoardString(value) {
    if (typeof value !== "string") {
      return false;
    }

    const rows = value.split("/");
    if (rows.length !== 8) {
      return false;
    }

    return rows.every((row) => {
      let squares = 0;
      for (const char of row) {
        if (!Number.isNaN(Number(char))) {
          squares += Number(char);
        } else {
          squares += 1;
        }
      }
      return squares === 8;
    });
  }

  function coordsToSquare(row, col) {
    return "abcdefgh"[col] + String(8 - row);
  }

  function squareToCoords(square) {
    if (!/^[a-h][1-8]$/.test(square)) {
      return null;
    }

    return {
      row: 8 - Number(square[1]),
      col: square.charCodeAt(0) - 97
    };
  }

  function parseFenBoard(fen) {
    return fen.split("/").map((row) => {
      const expanded = [];
      for (const char of row) {
        const count = Number(char);
        if (!Number.isNaN(count)) {
          for (let i = 0; i < count; i++) {
            expanded.push(null);
          }
        } else {
          expanded.push(char);
        }
      }
      return expanded;
    });
  }

  function toFenBoard(board) {
    return board.map((row) => {
      let encoded = "";
      let empties = 0;

      for (const cell of row) {
        if (!cell) {
          empties += 1;
          continue;
        }

        if (empties > 0) {
          encoded += String(empties);
          empties = 0;
        }

        encoded += cell;
      }

      if (empties > 0) {
        encoded += String(empties);
      }

      return encoded;
    }).join("/");
  }

  function colorOf(piece) {
    if (!piece) {
      return null;
    }

    return piece === piece.toUpperCase()
      ? "white"
      : "black";
  }

  function toggleTurn(turn) {
    return turn === "white"
      ? "black"
      : "white";
  }

  function pieceCanReach(piece, from, to, board, state) {
    const dr = to.row - from.row;
    const dc = to.col - from.col;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);
    const target = board[to.row][to.col];
    const white = piece === piece.toUpperCase();
    const type = piece.toUpperCase();

    if (type === "N") {
      return (absDr === 2 && absDc === 1) || (absDr === 1 && absDc === 2);
    }

    if (type === "K") {
      return absDr <= 1 && absDc <= 1;
    }

    if (type === "P") {
      const forward = white ? -1 : 1;
      const startRow = white ? 6 : 1;

      if (dc === 0 && dr === forward && !target) {
        return true;
      }

      if (
        dc === 0 &&
        dr === 2 * forward &&
        from.row === startRow &&
        !target &&
        !board[from.row + forward][from.col]
      ) {
        return true;
      }

      if (absDc === 1 && dr === forward) {
        if (target && colorOf(target) !== colorOf(piece)) {
          return true;
        }

        if (
          !target &&
          state.enPassant &&
          state.enPassant.row === to.row &&
          state.enPassant.col === to.col
        ) {
          return true;
        }
      }

      return false;
    }

    if (type === "B" || type === "R" || type === "Q") {
      let stepR = 0;
      let stepC = 0;

      if (type === "B" || type === "Q") {
        if (absDr === absDc && absDr !== 0) {
          stepR = dr > 0 ? 1 : -1;
          stepC = dc > 0 ? 1 : -1;
        }
      }

      if (type === "R" || type === "Q") {
        if ((dr === 0 && dc !== 0) || (dc === 0 && dr !== 0)) {
          stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
          stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
        }
      }

      if (stepR === 0 && stepC === 0) {
        return false;
      }

      let r = from.row + stepR;
      let c = from.col + stepC;
      while (r !== to.row || c !== to.col) {
        if (board[r][c]) {
          return false;
        }
        r += stepR;
        c += stepC;
      }

      return true;
    }

    return false;
  }

  function parseSanMove(san, boardFen, turn, state) {
    const board = parseFenBoard(boardFen);
    let token = String(san || "").trim();
    if (!token) {
      return null;
    }

    token = token.replace(/[+#?!]+$/g, "");

    if (token === "O-O" || token === "0-0") {
      return turn === "white"
        ? { fromRow: 7, fromCol: 4, toRow: 7, toCol: 6, castle: "kingside" }
        : { fromRow: 0, fromCol: 4, toRow: 0, toCol: 6, castle: "kingside" };
    }

    if (token === "O-O-O" || token === "0-0-0") {
      return turn === "white"
        ? { fromRow: 7, fromCol: 4, toRow: 7, toCol: 2, castle: "queenside" }
        : { fromRow: 0, fromCol: 4, toRow: 0, toCol: 2, castle: "queenside" };
    }

    const promotionMatch = token.match(/=([QRNBqrbn])$/);
    const promotion = promotionMatch
      ? promotionMatch[1].toUpperCase()
      : null;

    if (promotionMatch) {
      token = token.slice(0, -2);
    }

    const targetMatch = token.match(/([a-h][1-8])$/);
    if (!targetMatch) {
      return null;
    }

    const to = squareToCoords(targetMatch[1]);
    token = token.slice(0, -2);

    const pieceMatch = token.match(/^[KQRBN]/);
    const pieceType = pieceMatch
      ? pieceMatch[0]
      : "P";

    if (pieceMatch) {
      token = token.slice(1);
    }

    token = token.replace("x", "");
    const disambiguation = token;
    const targetPiece = board[to.row][to.col];

    const expectedPiece = turn === "white"
      ? pieceType
      : pieceType.toLowerCase();

    const candidates = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece !== expectedPiece) {
          continue;
        }

        if (
          disambiguation.length > 0 &&
          !disambiguation.includes(coordsToSquare(row, col)[0]) &&
          !disambiguation.includes(coordsToSquare(row, col)[1])
        ) {
          continue;
        }

        if (
          targetPiece &&
          colorOf(targetPiece) === colorOf(piece)
        ) {
          continue;
        }

        if (pieceCanReach(piece, { row, col }, to, board, state)) {
          candidates.push({ row, col });
        }
      }
    }

    if (candidates.length === 0) {
      return null;
    }

    const from = candidates[0];
    return {
      fromRow: from.row,
      fromCol: from.col,
      toRow: to.row,
      toCol: to.col,
      promotion
    };
  }

  function applyMoveOnBoard(board, move, state) {
    const movingPiece = board[move.fromRow]?.[move.fromCol];
    if (!movingPiece) {
      throw new Error("No piece at source square");
    }

    const targetPiece = board[move.toRow][move.toCol];

    if (movingPiece.toUpperCase() === "K" && Math.abs(move.toCol - move.fromCol) === 2) {
      if (move.toCol === 6) {
        board[move.fromRow][5] = board[move.fromRow][7];
        board[move.fromRow][7] = null;
      } else if (move.toCol === 2) {
        board[move.fromRow][3] = board[move.fromRow][0];
        board[move.fromRow][0] = null;
      }
    }

    const isPawn = movingPiece.toUpperCase() === "P";
    const isDiagonalPawnMove = isPawn && move.fromCol !== move.toCol;
    if (isDiagonalPawnMove && !targetPiece) {
      const captureRow =
        colorOf(movingPiece) === "white"
          ? move.toRow + 1
          : move.toRow - 1;
      board[captureRow][move.toCol] = null;
    }

    board[move.fromRow][move.fromCol] = null;
    board[move.toRow][move.toCol] = movingPiece;

    if (isPawn && (move.toRow === 0 || move.toRow === 7)) {
      const promoted = move.promotion || "Q";
      board[move.toRow][move.toCol] =
        colorOf(movingPiece) === "white"
          ? promoted.toUpperCase()
          : promoted.toLowerCase();
    }

    state.enPassant = null;
    if (isPawn && Math.abs(move.toRow - move.fromRow) === 2) {
      state.enPassant = {
        row: (move.fromRow + move.toRow) / 2,
        col: move.fromCol
      };
    }
  }

  function detectFormat(moveList) {
    if (!Array.isArray(moveList) || moveList.length === 0) {
      return "empty";
    }

    const first = moveList[0];

    if (typeof first === "string") {
      return isFenBoardString(first)
        ? "fenHistory"
        : "algebraic";
    }

    if (
      first &&
      typeof first === "object" &&
      Number.isInteger(first.fromRow) &&
      Number.isInteger(first.fromCol) &&
      Number.isInteger(first.toRow) &&
      Number.isInteger(first.toCol)
    ) {
      return "coordinates";
    }

    if (
      first &&
      typeof first === "object" &&
      typeof first.notation === "string"
    ) {
      return "notationObjects";
    }

    return "unknown";
  }

  function createEngine(customHooks) {
    const hooks = {
      clearBoard:
        customHooks?.clearBoard ||
        global.clearBoard ||
        function noop() {},
      renderBoardFromFEN:
        customHooks?.renderBoardFromFEN ||
        global.renderBoardFromFEN ||
        function noop() {},
      onStep:
        customHooks?.onStep ||
        function noop() {},
      onDone:
        customHooks?.onDone ||
        function noop() {}
    };

    const state = {
      fen: STARTING_FEN,
      turn: "white",
      enPassant: null
    };

    function resetBoard() {
      state.fen = STARTING_FEN;
      state.turn = "white";
      state.enPassant = null;
      hooks.clearBoard();
      hooks.renderBoardFromFEN(state.fen);
    }

    function applyMoveFromHistory(move) {
      if (isFenBoardString(move)) {
        state.fen = move;
        hooks.clearBoard();
        hooks.renderBoardFromFEN(state.fen);
        state.turn = toggleTurn(state.turn);
        return;
      }

      let normalized = null;
      if (
        move &&
        typeof move === "object" &&
        Number.isInteger(move.fromRow) &&
        Number.isInteger(move.fromCol) &&
        Number.isInteger(move.toRow) &&
        Number.isInteger(move.toCol)
      ) {
        normalized = {
          fromRow: move.fromRow,
          fromCol: move.fromCol,
          toRow: move.toRow,
          toCol: move.toCol
        };
      } else if (typeof move === "string") {
        normalized = parseSanMove(
          move,
          state.fen,
          state.turn,
          state
        );
      } else if (move && typeof move.notation === "string") {
        normalized = parseSanMove(
          move.notation,
          state.fen,
          state.turn,
          state
        );
      }

      if (!normalized) {
        throw new Error("Unsupported move format for replay");
      }

      const board = parseFenBoard(state.fen);
      applyMoveOnBoard(board, normalized, state);
      state.fen = toFenBoard(board);
      state.turn = toggleTurn(state.turn);

      hooks.clearBoard();
      hooks.renderBoardFromFEN(state.fen);
    }

    function replayMoves(moveList, options) {
      const delay =
        Number.isFinite(options?.delayMs) &&
        options.delayMs >= 0
          ? options.delayMs
          : 700;

      const format = detectFormat(moveList);
      if (format === "unknown") {
        throw new Error("Unknown replay format");
      }

      resetBoard();

      let sequence = Array.isArray(moveList)
        ? moveList.slice()
        : [];

      if (format === "fenHistory" && sequence.length > 0 && sequence[0] === STARTING_FEN) {
        sequence = sequence.slice(1);
      }

      let index = 0;

      function playNextMove() {
        if (index >= sequence.length) {
          hooks.onDone({
            format,
            finalFEN: state.fen
          });
          return;
        }

        applyMoveFromHistory(sequence[index]);

        hooks.onStep({
          index,
          move: sequence[index],
          format,
          fen: state.fen
        });

        index += 1;
        setTimeout(playNextMove, delay);
      }

      playNextMove();
    }

    return {
      replayMoves,
      applyMoveFromHistory,
      resetBoard,
      detectFormat
    };
  }

  const defaultEngine = createEngine();
  global.ChessReplayEngine = {
    createEngine,
    replayMoves: defaultEngine.replayMoves,
    applyMoveFromHistory: defaultEngine.applyMoveFromHistory,
    resetBoard: defaultEngine.resetBoard,
    detectFormat: defaultEngine.detectFormat
  };
})(window);
