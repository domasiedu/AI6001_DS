# Phase 1 — Part 4  
## Create User Model

**Objective**

Create a MongoDB schema for storing user accounts.

Modify:

server/models/User.js

---

# TASK 1 — Import Mongoose

Import:

mongoose

---

# TASK 2 — Create User Schema

Define fields:

username:
- type: String
- required: true
- unique: true

email:
- type: String
- required: true
- unique: true

password:
- type: String
- required: true

createdAt:
- type: Date
- default: Date.now

---

# TASK 3 — Create User Model

Use:

mongoose.model()

Model name:

User

---

# TASK 4 — Export Model

Export:

User

---

# EXPECTED RESULT

User model created.

MongoDB ready to store user data.