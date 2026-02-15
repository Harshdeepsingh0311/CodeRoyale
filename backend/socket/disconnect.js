const { getAllRooms, deleteRoom } = require("../rooms");

function handleDisconnect(socket, io) {
  return () => {
    console.log("🔴 Disconnected:", socket.id);

    const rooms = getAllRooms();

    for (const [roomId, room] of rooms.entries()) {
      const index = room.players.findIndex((p) => p.id === socket.id);

      if (index === -1) continue;

      const removed = room.players.splice(index, 1)[0];
      console.log(`Removed ${removed.name} from ${roomId}`);

      if (room.hostId === socket.id && room.players.length > 0) {
        room.hostId = room.players[0].id;
        console.log("👑 New host assigned");
      }

      if (room.players.length === 0) {
        deleteRoom(roomId);
        console.log(`🗑️ Deleted room ${roomId}`);
        return;
      }

      io.to(roomId).emit("room_update", room);
      break;
    }
  };
}

module.exports = handleDisconnect;
