const { createRoom } = require("../rooms");

function handleCreateRoom(socket, io) {
  return ({ playerId }) => {
    const room = createRoom(socket.id, playerId);

    socket.join(room.roomId);

    console.log("🏠 Room created:", room.roomId);

    io.to(room.roomId).emit("room_update", room);
  };
}

module.exports = handleCreateRoom;
