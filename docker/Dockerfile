FROM node:20

WORKDIR /app

# Install Stockfish
RUN apt-get update && \
    apt-get install -y stockfish && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy server dependencies
COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

WORKDIR /app

# Copy project files
COPY server ./server
COPY client ./client

EXPOSE 3000

CMD ["node", "server/server.js"]
