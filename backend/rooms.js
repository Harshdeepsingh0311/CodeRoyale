const rooms = new Map();

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createRoom(hostSocketId, playerName) {
  const roomId = generateRoomId();

  const room = {
    roomId,
    hostId: hostSocketId,
    players: [{ id: hostSocketId, name: playerName }],
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
