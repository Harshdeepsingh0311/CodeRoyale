const { createRoom } = require("../rooms");

function handleCreateRoom(socket, io, generateRoomId) {
  return ({ playerName }) => {
    const roomId = generateRoomId();

    const room = createRoom(roomId, socket.id, playerName);

    socket.join(roomId);

    io.to(roomId).emit("room_update", {
      type: "ROOM_UPDATE",
      room: {
        roomId: room.roomId,
        hostId: room.hostId,
        players: [...room.players],
      },
    });

    console.log("ROOM SENT TO CLIENT:", room);
  };
}

module.exports = handleCreateRoom;
