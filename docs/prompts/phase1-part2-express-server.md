# Phase 1 — Part 2  
## Express Server Setup

**Objective**

Set up an Express server to serve frontend pages.

Modify:

server/server.js

---

# TASK 1 — Initialize Node Project

Run:

npm init -y

Install dependencies:

npm install express cors dotenv

---

# TASK 2 — Create Express Server

Open:

server/server.js

Add:

- express
- path
- cors

Set:

PORT = 3000

Enable:

app.use(cors())

---

# TASK 3 — Serve Static Client Files

Serve:

../client

Use:

express.static()

---

# TASK 4 — Root Route

Route:

"/"

Return:

index.html

---

# TASK 5 — Start Server

Add:

app.listen(PORT)

Log:

Server running on port 3000

---

# EXPECTED RESULT

Run:

node server/server.js

Open:

http://localhost:3000

Expected:

index.html loads successfully