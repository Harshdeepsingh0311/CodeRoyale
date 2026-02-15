import { create } from "zustand";

type Player = {
  id: string;
  name: string;
};

type RoomStore = {
  roomId: string | null;
  hostId: string | null;
  players: Player[];

  setRoom: (roomId: string, hostId: string) => void;
  setPlayers: (players: Player[]) => void;
  clearRoom: () => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: null,
  hostId: null,
  players: [],

  setRoom: (roomId, hostId) =>
    set(() => ({
      roomId,
      hostId,
    })),

  setPlayers: (players) =>
    set(() => ({
      players,
    })),

  clearRoom: () =>
    set(() => ({
      roomId: null,
      hostId: null,
      players: [],
    })),
}));
