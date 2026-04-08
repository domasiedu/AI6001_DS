
const express = require("express");
const Game = require("../models/Game");
const getInitialBoard = require("../chess/initialBoard");
const applyMove = require("../chess/applyMove");

const router = express.Router();

/* ===========================
   CREATE NEW GAME
=========================== */

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const boardState = getInitialBoard();

    const game = new Game({
      user: userId,
      boardState,
      moves: [],
      turn : "white",
      status: "active",
    });

    await game.save();

    return res.status(201).json(game);

  } catch (error) {
    return res.status(500).json({
      message: "Error creating game",
      error: error.message,
    });
  }
});

/* ===========================
   GET ALL GAMES (HISTORY)
=========================== */

router.get("/", async (req, res) => {
  try {
    const games = await Game.find()
      .sort({ createdAt: -1 });

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
   UPDATE GAME (SAVE MOVES)
=========================== */

router.put("/:id", async (req, res) => {
  try {
    const { moves, boardState, status, winner } = req.body;

    const game = await Game.findByIdAndUpdate(
      req.params.id,
      {
        moves,
        boardState,
        status,
        winner,
      },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    return res.status(200).json(game);

  } catch (error) {
    return res.status(500).json({
      message: "Error updating game",
      error: error.message,
    });
  }
});

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

    const {
      fromRow,
      fromCol,
      toRow,
      toCol,
    } = req.body;

    applyMove(game, fromRow, fromCol, toRow, toCol);
    await game.save();

    return res.status(200).json(game);

  } catch (error) {
    return res.status(500).json({
      message: "Error applying move",
      error: error.message,
    });
  }
});

module.exports = router;
