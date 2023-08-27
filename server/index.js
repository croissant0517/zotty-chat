const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Sever is running!");
});

io.on("connection", (socket) => {
  console.log({ socket }, "a user connected");
});

server.listen(port, () => console.log("Node server listening on port " + port));
