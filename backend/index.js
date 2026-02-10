const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

/* ------------------ Middleware ------------------ */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

/* ------------------ Basic Route ------------------ */
app.get("/", (req, res) => {
  res.send("Code Royale Backend Running 🚀");
});

/* ------------------ HTTP + Socket Server ------------------ */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/* ------------------ Socket Events ------------------ */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
  console.log("Client headers:", socket.handshake.headers.origin);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

/* ------------------ Start Server ------------------ */
const PORT = 5001;

server.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
