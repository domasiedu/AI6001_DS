const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 moves: [
  {
    fromRow: Number,
    fromCol: Number,
    toRow: Number,
    toCol: Number,
    piece: String,
    captured: String,
    timestamp: Date,
  }
],
  boardState: {
    type: String,
    required: true,
  },
  turn: {
  type: String,
  enum: ["white", "black"],
  default: "white"
},
  status: {
    type: String,
    enum: ["active", "checkmate", "stalemate"],
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
