const { getRoom } = require("../rooms");

function handleJoinRoom(socket, io) {
  return ({ roomId, playerId }) => {
    const room = getRoom(roomId);

    if (!room) {
      socket.emit("error_message", "Room does not exist");
      return;
    }

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
  };
}

module.exports = handleJoinRoom;
