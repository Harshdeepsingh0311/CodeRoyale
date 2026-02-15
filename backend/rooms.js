const rooms = new Map();

function createRoom(roomId, hostSocketId, playerName) {
  const room = {
    roomId,
    hostId: hostSocketId,
    players: [
      { id: hostSocketId, name: playerName }
    ],
  };

  rooms.set(roomId, room);
  return room;
}

function getRoom(roomId) {
  return rooms.get(roomId);
}

function deleteRoom(roomId) {
  rooms.delete(roomId);
}

function getAllRooms() {
  return rooms;
}

module.exports = {
  createRoom,
  getRoom,
  deleteRoom,
  getAllRooms,
};
