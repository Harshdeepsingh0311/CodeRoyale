const { getRoom } = require("../rooms");

function handleJoinRoom(socket, io) {
  return ({ roomId, playerName }) => {
    const room = getRoom(roomId);

    if (!room) {
      socket.emit("error_message", "Room does not exist");
      return;
    }

    if (room.players.some((p) => p.name === playerName)) {
      socket.emit("error_message", "Name already taken");
      return;
    }

    room.players.push({
      id: socket.id,
      name: playerName,
    });

    socket.join(roomId);

    io.to(roomId).emit("room_update", {
      type: "ROOM_UPDATE",
      room: {
        roomId: room.roomId,
        hostId: room.hostId,
        players: [...room.players],
      },
    });

    console.log("UPDATED ROOM:", room);
  };
}

module.exports = handleJoinRoom;
