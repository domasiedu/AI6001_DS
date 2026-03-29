# AI6001_Project_Name_Here

# PROJECT PROPOSAL  
# AI-BASED CONNECT FOUR GAME WITH PERSISTENT GAMEPLAY

---

## PROJECT TITLE
Development of an AI-Powered Connect Four Game with Persistent Game State and Replay Functionality Using CodEx

---

## Project Overview
This project proposes the design and implementation of an interactive web-based Connect Four game enhanced with an intelligent Artificial Intelligence (AI) opponent. The system will allow users to play against an AI agent that makes strategic decisions using classical search algorithms. In addition to gameplay, the system will support user authentication, persistent game storage, game resumption, and replay visualization, enabling a complete and engaging user experience.

The application will be implemented as a full-stack web-based system, with a browser-based graphical interface rendered using HTML Canvas and JavaScript, and a backend service built using Node.js and Express.js. Game data and user accounts will be stored in a MongoDB database. The final system will be containerized using Docker to ensure reproducibility and ease of deployment.

This project aims to demonstrate the integration of game logic, artificial intelligence, persistent data storage, and scalable software architecture into a cohesive application.

---

## Objectives
The primary objectives of this project are:

- To design and implement a fully functional Connect Four game engine capable of detecting valid moves, winning conditions, and draw scenarios.
- To develop a non-trivial AI opponent using the Minimax algorithm with Alpha-Beta pruning to simulate intelligent gameplay behaviour.
- To implement user authentication allowing players to create accounts and securely log in.
- To enable persistent gameplay, allowing users to save unfinished games and resume them later.
- To provide game history and replay functionality, enabling visualisation of previously completed games.
- To containerise the system using Docker, ensuring portability and consistent deployment.
- To document the incremental development process and demonstrate the use of AI tools in generating, debugging, and improving software components.

---

## System Description
The proposed system will consist of two major components: a client-side application and a server-side backend.

The client-side interface will display the Connect Four board using HTML Canvas and allow users to interact with the game through mouse input. Game logic such as move validation and win detection, will be handled through modular JavaScript components.

The server-side component will manage user authentication, game persistence, and AI computations where necessary. RESTful APIs will be used to exchange data between the client and server. MongoDB will store structured game data, including board states and move sequences.

The AI opponent will be implemented using the Minimax algorithm with Alpha-Beta pruning, allowing the system to evaluate multiple possible moves and select the optimal strategy based on heuristic scoring rules. Multiple difficulty levels will be supported by varying search depth.

---

## Artificial Intelligence Component
The AI opponent will use a heuristic search-based decision model, specifically the Minimax algorithm enhanced with Alpha-Beta pruning for performance optimization.

The AI will evaluate game states using scoring functions based on:

- Potential winning combinations
- Blocking opponent threats
- Board position control (e.g., center column advantage)
- Immediate winning opportunities

Difficulty levels will be implemented by adjusting search depth, allowing the AI to exhibit varying levels of strategic sophistication.

This approach ensures the AI demonstrates intelligent, non-trivial gameplay behavior, satisfying the requirement for meaningful AI integration.

---

## Expected Features
The final system will support the following core features:

- Interactive Connect Four gameplay
- Human vs AI game mode
- Intelligent AI opponent with adjustable difficulty
- User registration and login system
- Save and resume ongoing games
- Game history tracking
- Game replay visualization
- Responsive graphical interface
- Docker-based deployment environment

---

## Expected Outcomes
By the completion of this project, the system will demonstrate:

- A fully functional AI-driven game application
- Reliable persistent storage of user sessions and gameplay
- Structured modular software architecture
- Practical implementation of AI search algorithms
- Effective use of containerization technologies
- Documented iterative development using AI-assisted coding tools

---

## Conclusion
This project will contribute to the understanding of how classical artificial intelligence algorithms can be applied within interactive web-based systems. By combining algorithmic decision-making with scalable system architecture, the project will demonstrate the feasibility and effectiveness of integrating intelligent agents into user-facing software environments.

Project Group Members:

* Dominic Asiedu (202296254, dasiedu@mun.ca) 
* Sifat Sabrina Rahman (202286725,ssrahman@mun.ca)


Project URL

* Paste your hosted web application URL here so I can test it

Project Videos:

* Project Presentation: YouTube URL

Project Setup / Installation:

* Your project setup and installation instructions go here
* Feel free to include screenshots if you want
