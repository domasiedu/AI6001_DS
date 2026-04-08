# Phase 1 — Part 6  
## Authentication API

**Objective**

Implement user registration and login functionality.

Modify:

server/api/auth.js

---

# TASK 1 — Import Dependencies

Import:

express  
bcryptjs  
jsonwebtoken  
User model  

Create:

router = express.Router()

---

# TASK 2 — Register Route

Create:

POST /register

Functionality:

- Receive username, email, password
- Check if user exists
- Hash password using bcrypt
- Create new user
- Save to MongoDB
- Return success message

Error handling:

If user exists → return error.

---

# TASK 3 — Login Route

Create:

POST /login

Functionality:

- Receive email and password
- Find user
- Compare hashed password
- Generate JWT token
- Return token

Error handling:

If invalid credentials → return error.

---

# TASK 4 — Export Router

Export:

router

---

# EXPECTED RESULT

Authentication API routes created.

Users can register and login.