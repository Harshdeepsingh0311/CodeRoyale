const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const handleCreateRoom = require("./socket/createRoom");
const handleJoinRoom = require("./socket/joinRoom");
const handleDisconnect = require("./socket/disconnect");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Code Royale Backend Running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("create_room", handleCreateRoom(socket, io));
  socket.on("join_room", handleJoinRoom(socket, io));
  socket.on("disconnect", handleDisconnect(socket, io));
});

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
