import { io } from "socket.io-client";
import { useRoomStore } from "@/store/roomStore";

export const socket = io("http://localhost:5001", {
  autoConnect: true,
});

// expose for debugging
if (typeof window !== "undefined") {
  (window as any).socket = socket;
}


socket.on("connect", () => {
  console.log("🟢 Connected:", socket.id);
});

socket.on("room_update", (room) => {
  const store = useRoomStore.getState();

  store.setRoom(room.roomId, room.hostId);
  store.setPlayers(room.players);
});


