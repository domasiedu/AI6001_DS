# Phase 1 — Part 5  
## Create Game Model

**Objective**

Create a MongoDB schema for storing chess game data.

Modify:

server/models/Game.js

---

# TASK 1 — Import Dependencies

Import:

mongoose

---

# TASK 2 — Create Game Schema

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

# TASK 3 — Create Game Model

Use:

mongoose.model()

Model name:

Game

---

# TASK 4 — Export Model

Export:

Game

---

# EXPECTED RESULT

Game model created.

Database ready to store chess matches.