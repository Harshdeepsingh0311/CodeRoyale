const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

/* ------------------ In-Memory Rooms ------------------ */
const rooms = new Map();

/*
Room Structure:

{
  roomId,
  hostId,           // socket.id
  players: [
    { id: socket.id, name: "Harsh" }
  ]
}
*/

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/* ------------------ Middleware ------------------ */
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

/* ------------------ Socket Events ------------------ */
io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  /* ---------- CREATE ROOM ---------- */
  socket.on("create_room", ({ playerId }) => {
    const roomId = generateRoomId();

    const room = {
      roomId,
      hostId: socket.id,
      players: [{ id: socket.id, name: playerId }],
    };

    rooms.set(roomId, room);

    socket.join(roomId);

    console.log("🏠 Room created:", roomId);

    io.to(roomId).emit("room_update", room);
  });

  /* ---------- JOIN ROOM ---------- */
  socket.on("join_room", ({ roomId, playerId }) => {
    const room = rooms.get(roomId);

    if (!room) {
      socket.emit("error_message", "Room does not exist");
      return;
    }

    // Prevent duplicate names
    if (room.players.some((p) => p.name === playerId)) {
      socket.emit("error_message", "Name already taken");
      return;
    }

    room.players.push({
      id: socket.id,
      name: playerId,
    });

    socket.join(roomId);

    console.log("👤 Joined:", playerId, "→", roomId);

    io.to(roomId).emit("room_update", room);
  });

  /* ---------- DISCONNECT HANDLING ---------- */
  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);

    for (const [roomId, room] of rooms.entries()) {
      const playerIndex = room.players.findIndex((p) => p.id === socket.id);

      if (playerIndex === -1) continue;

      const removedPlayer = room.players.splice(playerIndex, 1)[0];

      console.log(`Removed ${removedPlayer.name} from ${roomId}`);

      // Reassign host if needed
      if (room.hostId === socket.id && room.players.length > 0) {
        room.hostId = room.players[0].id;
        console.log("👑 New host assigned");
      }

      // Delete room if empty
      if (room.players.length === 0) {
        rooms.delete(roomId);
        console.log(`🗑️ Deleted room ${roomId}`);
        return;
      }

      io.to(roomId).emit("room_update", room);

      break;
    }
  });
});

/* ------------------ Start Server ------------------ */
const PORT = 5001;

server.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
