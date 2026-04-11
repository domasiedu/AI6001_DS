Build authentication backend (register/login).

-----------------------------------
STEP 1 — Create User Model
-----------------------------------

Create file:

server/models/User.js

Add:

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

}, {

  timestamps: true

});

module.exports =
  mongoose.model(
    "User",
    userSchema
  );

-----------------------------------
STEP 2 — Create Auth Routes
-----------------------------------

Create file:

server/routes/auth.js

Add:

const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User =
  require("../models/User");

const router =
  express.Router();

const JWT_SECRET =
  "your_secret_key";

-----------------------------------
REGISTER ROUTE
-----------------------------------

router.post("/register", async (req, res) => {

  try {

    const {

      name,
      email,
      password

    } = req.body;

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      new User({

        name,
        email,
        password:
          hashedPassword

      });

    await user.save();

    res.status(201).json({
      message:
        "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Register failed",
      error: error.message
    });

  }

});

-----------------------------------
LOGIN ROUTE
-----------------------------------

router.post("/login", async (req, res) => {

  try {

    const {

      email,
      password

    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });

    }

    const token =
      jwt.sign(

        {
          userId:
            user._id
        },

        JWT_SECRET,

        {
          expiresIn:
            "7d"
        }

      );

    res.json({

      token,

      user: {

        id:
          user._id,

        name:
          user.name

      }

    });

  } catch (error) {

    res.status(500).json({

      message: "Login failed",

      error:
        error.message

    });

  }

});

module.exports =
  router;

-----------------------------------
STEP 3 — Create Auth Middleware
-----------------------------------

Create file:

server/middleware/authMiddleware.js

Add:

const jwt =
  require("jsonwebtoken");

const JWT_SECRET =
  "your_secret_key";

function authMiddleware(
  req,
  res,
  next
) {

  const token =
    req.headers.authorization;

  if (!token) {

    return res.status(401).json({
      message:
        "No token provided"
    });

  }

  try {

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    req.userId =
      decoded.userId;

    next();

  } catch (error) {

    res.status(401).json({
      message:
        "Invalid token"
    });

  }

}

module.exports =
  authMiddleware;

-----------------------------------
STEP 4 — Register Auth Routes
-----------------------------------

Update:

server/app.js

Add:

const authRoutes =
  require("./routes/auth");

Then add:

app.use(
  "/api/auth",
  authRoutes
);
