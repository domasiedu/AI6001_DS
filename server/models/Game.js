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
    captured: {
      type: String,
      default: null
    },
    notation: String,
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
    enum: [
      "active",
      "finished"
    ],
    default: "active",
  },
  winner: {
    type: String,
    default: null,
  },
  enPassantTarget: {
    row: Number,
    col: Number
  },
  castlingRights: {
    whiteKingMoved: {
      type: Boolean,
      default: false
    },
    whiteRookKingsideMoved: {
      type: Boolean,
      default: false
    },
    whiteRookQueensideMoved: {
      type: Boolean,
      default: false
    },
    blackKingMoved: {
      type: Boolean,
      default: false
    },
    blackRookKingsideMoved: {
      type: Boolean,
      default: false
    },
    blackRookQueensideMoved: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
