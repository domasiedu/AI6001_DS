# AI-BASED CHESSS GAME WITH PERSISTENT GAMEPLAY

# Project Group Members

- Dominic Asiedu (202296254, dasiedu@mun.ca)  
- Sifat Sabrina Rahman (202286725, ssrahman@mun.ca)

---

# Project URL

Link to be shared


---


## Project Presentation

Link to be shared

---

# Project Setup / Installation

## System Requirements

Before running the project, ensure the following software is installed:

- **Node.js (Version 18 or higher)**  
  Required to run the backend server.

  Download:  
  https://nodejs.org/

- **MongoDB (Local or Cloud Instance)**  
  Required for storing user accounts, game states, and match history.

  Download:  
  https://www.mongodb.com/

- **Docker (Optional — for deployment stage)**  
  Required later for containerized deployment.

  Download:  
  https://www.docker.com/

- **Visual Studio Code (VS Code)**  
  Recommended IDE for editing and running the project.

  Download:  
  https://code.visualstudio.com/

- **Modern Web Browser**  
  Recommended:

  - Google Chrome  
  - Microsoft Edge  
  - Mozilla Firefox

---

# Installation Steps

Follow these steps to run the project locally.

## Step 1 — Clone Repository

```bash
git clone <repository-url>
cd my-chess-game
```

## Step 2 — Install Backend Dependencies

Navigate to the project root directory:

```bash
cd my-chess-game
```

## Step 3- Install Dependencies
```bash
npm install express cors dotenv mongoose
```
## Step 4 - configure .env

```bash
server/.env
PORT=3000
MONGO_URI=mongodb://localhost:27017/chessdb
```

## step 5 - Start the server
```bash
node server/server.js
```

## Step 6 - Open the application browser
```bash
http://localhost:3000

```