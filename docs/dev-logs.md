# Dev Logs
---
I refactored the AI layer into a dedicated server/ai module
to improve separation of concerns and align with backend architecture.

## Phase 1 - Part 2: Express Server Setup

**Objective:**
Configure a Node.js Express server to serve the frontend files.

**Summary:**
Initialized a backend server using Express to handle HTTP requests and deliver static frontend pages.

**Implementation Details:**
- Installed Express, CORS, and environment configuration tools.
- Configured static serving from the client directory.
- Implemented root routing to load index.html.
- Started server on port 3000.

**Outcome:**
Frontend pages were successfully served through the backend, confirming correct integration between server and client layers.

**Status:**
Completed.

## Phase 1 - Part 3: MongoDB Setup

**Objective:**
Establish a connection between the backend server and MongoDB.

**Summary:**
Configured MongoDB integration using Mongoose to enable persistent storage of user accounts and gameplay data.

**Implementation Details:**
- Installed Mongoose dependency.
- Created database connection module (`db.js`).
- Loaded environment variables from `.env`.
- Implemented connection logic with error handling.
- Integrated database connection into server startup process.

**Outcome:**
MongoDB connection was successfully established, enabling future implementation of authentication, game storage, and replay functionality.

**Status:**
Completed.

## Phase 1 - Part 4: User Model Creation

**Objective:**
Define a database schema for storing user account information.

**Summary:**
Created a MongoDB User model to store authentication credentials and account metadata.

**Implementation Details:**
- Defined User schema using Mongoose.
- Added required validation fields.
- Enforced uniqueness for username and email.
- Added timestamp for account creation.
- Exported User model for reuse across authentication routes.

**Outcome:**
User data can now be stored securely in MongoDB, enabling future implementation of authentication and user-specific features.

**Status:**
Completed.

# Phase 1 - Part 5
## Create Game Model

**Objective**

Create a MongoDB schema for storing chess game data.

Modify:

server/models/Game.js

---

# TASK 1 - Import Dependencies

Import:

mongoose

---

# TASK 2 - Create Game Schema

Define the following fields:

user:
- type: mongoose.Schema.Types.ObjectId
- ref: 'User'
- required: true

moves:
- type: Array
- default: []

boardState:
- type: String
- required: true

status:
- type: String
- enum: ['active', 'finished']
- default: 'active'

winner:
- type: String
- default: null

createdAt:
- type: Date
- default: Date.now

---

# TASK 3 - Create Game Model

Use:

mongoose.model()

Model name:

Game

---

# TASK 4 - Export Model

Export:

Game

---

# EXPECTED RESULT

Game model created.

Database ready to store chess matches.

## Phase 1 - Part 6: Authentication API

**Objective:**
Implement secure user authentication functionality.

**Summary:**
Developed authentication routes to allow user registration and login.

**Implementation Details:**
- Installed bcryptjs for password hashing.
- Installed jsonwebtoken for authentication tokens.
- Implemented user registration endpoint.
- Added password hashing before saving users.
- Implemented login validation endpoint.
- Generated authentication tokens using JWT.
- Integrated authentication routes into the main server.

**Outcome:**
Users can now register and securely log in, enabling user-specific game sessions.

**Status:**
Completed.

## Dev Log - Game API Implementation

**Date:** 2026-04-08

### Completed:

- Implemented Game API routes
- Added create game endpoint
- Added load game endpoint
- Added update game endpoint
- Added game history endpoint
- Integrated Game model with MongoDB

### API Endpoints Created:

POST   /api/games
GET    /api/games
GET    /api/games/:id
PUT    /api/games/:id

### Status:

Game persistence system successfully implemented and tested.

## Dev Log - Game Creation API Testing

**Date:** 2026-04-08

### Completed:

- Tested Game Creation API
- Verified MongoDB ObjectId validation
- Fixed userId input format
- Confirmed database write success

### Issue Encountered:

Received validation error when using username instead of ObjectId.

### Resolution:

Used actual MongoDB user `_id` as `userId`.

### Status:

Game creation API successfully tested.

## Dev Log - Board Parser Implementation

**Date:** [Today]

### Completed:

- Implemented FEN parsing logic
- Converted FEN string into 2D board array
- Represented empty squares as null
- Verified 8x8 board structure

### Status:

Board parsing utility successfully implemented.

## Dev Log - FEN Generator Implementation

**Date:** [Today]

### Completed:

- Implemented board-to-FEN conversion
- Counted empty squares correctly
- Generated valid FEN format
- Ensured compatibility with parser

### Status:

FEN generator utility successfully implemented.

## Dev Log - Initial Move Engine Test

**Date:** 2026-04-08

### Completed:

- Created test script for piece movement
- Tested pawn movement (e2 -> e4)
- Verified FEN parsing accuracy
- Verified FEN regeneration accuracy
- Confirmed board state update

### Result:

Move engine successfully updates board state.

### Status:

Basic piece movement operational.
Ready to implement movement validation rules.

## Dev Log — Pawn Movement Validation (Phase 1)

**Date:** 2026-04-08

### Completed:

- Implemented pawn movement validation logic
- Supported single-square pawn movement
- Supported double-square initial pawn movement
- Prevented pawn movement through occupied squares
- Implemented direction-based pawn logic

### Status:

Pawn forward movement validation operational.
Capture logic to be implemented next.

## Dev Log — Pawn Movement Testing

**Date:** [Today]

### Completed:

- Updated testMove.js to include structured tests
- Implemented try/catch error detection
- Verified pawn forward movement
- Verified pawn double movement
- Confirmed illegal pawn move rejection

### Status:

Pawn movement validation confirmed working.
Ready to implement pawn capture logic.

## Dev Log — Pawn Capture Logic

**Date:** [Today]

### Completed:

- Implemented pawn diagonal capture logic
- Added enemy piece detection
- Prevented diagonal movement into empty squares
- Prevented forward capture attempts
- Verified capture functionality

### Tests Performed:

- Pawn forward movement
- Pawn double movement
- Pawn illegal movement rejection
- Pawn capture validation

### Status:

Pawn logic fully implemented.
Ready to implement knight movement rules.

## Dev Log — Knight Movement Implementation

**Date:** [Today]

### Completed:

- Implemented knight movement validation
- Integrated knight logic into move engine
- Verified L-shaped movement logic
- Blocked invalid knight movement

### Tests Performed:

- Valid knight move
- Invalid knight move rejection

### Status:

Knight movement operational.
Ready to implement rook movement logic.