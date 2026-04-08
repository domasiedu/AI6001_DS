# Dev Logs
---
I refactored the AI layer into a dedicated server/ai module 
to improve separation of concerns and align with backend architecture.

## Phase 1 — Part 2: Express Server Setup

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