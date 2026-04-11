Create Dockerfile inside docker folder.

-----------------------------------
STEP 1 — Create Dockerfile
-----------------------------------

Create:

docker/Dockerfile

Add:

FROM node:20

WORKDIR /app

COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

WORKDIR /app

COPY server ./server
COPY client ./client

EXPOSE 3000

CMD ["node", "server/app.js"]
