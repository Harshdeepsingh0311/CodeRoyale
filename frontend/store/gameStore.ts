import { create } from "zustand";

type GameState = {
  playerId: string | null;
  roomId: string | null;
  phase: "idle" | "lobby" | "playing" | "ended";

  setPlayerId: (id: string) => void;
  setRoomId: (id: string) => void;
  setPhase: (phase: GameState["phase"]) => void;
};

export const useGameStore = create<GameState>((set) => ({
  playerId: null,
  roomId: null,
  phase: "idle",

  setPlayerId: (id) => set({ playerId: id }),
  setRoomId: (id) => set({ roomId: id }),
  setPhase: (phase) => set({ phase }),
}));
