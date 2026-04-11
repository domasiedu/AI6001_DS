const express = require("express");
const Game = require("../models/Game");
const getInitialBoard = require("../chess/initialBoard");
const applyMove = require("../chess/applyMove");
const boardParser = require("../chess/boardParser");
const movePiece = require("../chess/movePiece");
const getLegalMoves =
  require("../chess/getLegalMoves");
const undoMove =
  require("../controllers/undoMove");
const getBestMove =
  require("../ai/ChessAI");
const authMiddleware =
  require("../middleware/authMiddleware");
const router = express.Router();

/* ===========================
   CREATE NEW GAME
=========================== */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    let existingGame =
      await Game.findOne({
        user: userId,
        status: "active"
      });

    if (existingGame) {
      console.log(
        "Resuming existing game"
      );

      return res.json(existingGame);
    }

    const newGame =
      new Game({
        user: userId,
        boardState:
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        history: [
          getInitialBoard()
        ],
        moves: [],
      turn: "white",
      status: "active",
      winner: null,
        castlingRights: {
          whiteKingMoved: false,
          whiteRookKingsideMoved: false,
          whiteRookQueensideMoved: false,
          blackKingMoved: false,
          blackRookKingsideMoved: false,
          blackRookQueensideMoved: false,
        },
      });

    await newGame.save();

    console.log(
      "New game created"
    );

    res.json(newGame);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Game creation failed"
    });
  }
});

/* ===========================
   GET ALL GAMES (HISTORY)
=========================== */

router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching games",
      error: error.message,
    });
  }
});

/* ===========================
   GET SINGLE GAME
=========================== */

router.get("/:id/legal-moves", async (req, res) => {
  try {
    const { row, col } = req.query;
    const rowNum = Number(row);
    const colNum = Number(col);

    if (
      isNaN(rowNum) ||
      isNaN(colNum) ||
      rowNum < 0 ||
      rowNum > 7 ||
      colNum < 0 ||
      colNum > 7
    ) {
      return res.status(400).json({
        message: "Invalid row or col"
      });
    }

    const game =
      await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    const board =
      typeof boardParser.parseFEN === "function"
        ? boardParser.parseFEN(
            game.boardState
          )
        : boardParser(
            game.boardState
          );

    console.log(
      "Stored FEN:",
      game.boardState
    );

    console.log(
      "Square e7:",
      board[1][4]
    );

    if (!board[rowNum]) {
      return res.status(400).json({
        message: "Invalid board access"
      });
    }

    const piece =
      board[rowNum][colNum];

    if (!piece) {
      return res.status(200).json({
        moves: []
      });
    }

    const moves =
      getLegalMoves(
        board,
        rowNum,
        colNum,
        piece,
        {
          enPassantTarget: game.enPassantTarget
        }
      );

    return res.status(200).json({
      moves
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching legal moves",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading game",
      error: error.message,
    });
  }
});

/* ===========================
   BLOCK DIRECT GAME UPDATES
=========================== */

router.put("/:id", async (req, res) => {
  return res.status(403).json({
    message: "Direct game updates are not allowed. Use /api/games/:id/move instead.",
  });
});

router.put("/:gameId/undo", undoMove);

/* ===========================
   APPLY MOVE
=========================== */

router.put("/:id/move", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    const { fromRow, fromCol, toRow, toCol } = req.body;

    applyMove(game, fromRow, fromCol, toRow, toCol);

    const aiTurn =
      game.turn === "black";

    if (aiTurn && game.status === "active") {
      try {
        const fen =
          game.boardState;

        console.log(
          "AI thinking for FEN:",
          fen
        );

        const aiMove =
          await getBestMove(fen);

        console.log(
          "AI raw move:",
          aiMove
        );

        if (aiMove) {
          const from =
            aiMove.substring(0, 2);

          const to =
            aiMove.substring(2, 4);

          function algebraToCoords(square) {
            const file =
              square.charCodeAt(0) - 97;

            const rank =
              8 - Number(square[1]);

            return {
              row: rank,
              col: file
            };
          }

          const fromCoords =
            algebraToCoords(from);

          const toCoords =
            algebraToCoords(to);

          applyMove(
            game,
            fromCoords.row,
            fromCoords.col,
            toCoords.row,
            toCoords.col
          );
        }
      } catch (err) {
        console.error(
          "AI move failed:",
          err
        );
      }
    }

    await game.save();

    return res.status(200).json({
      boardState: game.boardState,
      turn: game.turn,
      moves: game.moves,
      status: game.status,
      winner: game.winner,
      check: game.check
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error applying move",
      error: error.message,
    });
  }
});

module.exports = router;
