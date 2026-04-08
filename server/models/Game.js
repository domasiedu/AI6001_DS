const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moves: {
    type: Array,
    default: [],
  },
  boardState: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "finished"],
    default: "active",
  },
  winner: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
