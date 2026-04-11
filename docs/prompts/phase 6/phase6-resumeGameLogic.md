Add resume game system tied to logged-in user.

-----------------------------------
STEP 1 — Update Game Model
-----------------------------------

Open:

server/models/Game.js

Ensure it includes:

user: {

  type: mongoose.Schema.Types.ObjectId,

  ref: "User",

  required: true

},

status: {

  type: String,

  enum: ["active", "finished"],

  default: "active"

}

-----------------------------------
STEP 2 — Modify Game Creation
-----------------------------------

Open:

server/routes/games.js

Find POST /api/games

Modify so it:

1. Uses logged-in user
2. Checks for active game
3. Returns existing game if found

Replace logic with:

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

        turn: "white",

        status: "active"

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
