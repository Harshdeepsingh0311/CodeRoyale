const { getAllRooms, deleteRoom } = require("../rooms");

function handleDisconnect(socket, io) {
  return () => {
    const rooms = getAllRooms();

    for (const [roomId, room] of rooms.entries()) {
      const index = room.players.findIndex((p) => p.id === socket.id);

      if (index === -1) continue;

      room.players.splice(index, 1);

      // Reassign host if needed
      if (room.hostId === socket.id && room.players.length > 0) {
        room.hostId = room.players[0].id;
      }

      // Delete empty room
      if (room.players.length === 0) {
        deleteRoom(roomId);
        return;
      }

      io.to(roomId).emit("room_update", {
        type: "ROOM_UPDATE",
        room,
      });

      break;
    }
  };
}

module.exports = handleDisconnect;
