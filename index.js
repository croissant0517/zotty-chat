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

const userNames = {};

app.get("/", (req, res) => {
  res.send("Vic Sever is running!");
});

io.on("connection", (socket) => {
  socket.on("setname", (name) => {
    userNames[socket.id] = name;
    io.emit("chat message", `${name} has joined the chat!`);
  });
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", `${userNames[socket.id]}: ${msg}`);
  });

  socket.on("disconnect", () => {
    io.emit("chat message", `${userNames[socket.id]} has left the chat!`);
    delete userNames[socket.id];
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log("Node server listening on port " + port));
