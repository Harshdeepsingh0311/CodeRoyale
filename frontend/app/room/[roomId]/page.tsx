"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRoomStore } from "@/store/roomStore";
import "@/lib/socket";

const ROOM_ID_REGEX = /^[A-Z0-9]{4,8}$/;

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = Array.isArray(params.roomId)
    ? params.roomId[0]
    : params.roomId;

  const { players, hostId } = useRoomStore();

  /* ------------------ Validate Room ID ------------------ */
  useEffect(() => {
    if (!roomId) return;

    if (!ROOM_ID_REGEX.test(roomId)) {
      router.replace("/");
    }
  }, [roomId, router]);

  if (!roomId) return null;

  console.log("Room ID:", roomId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Room Lobby</h1>

        <p className="text-sm text-white/70 text-center mb-4">Room ID</p>

        <p className="text-2xl font-mono tracking-widest font-bold text-cyan-300 text-center mb-8">
          {roomId}
        </p>

        <div className="mt-6 space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-white/10 rounded-xl p-3 flex justify-between items-center"
            >
              <span>{player.name}</span>

              {player.id === hostId && (
                <span className="text-yellow-400 text-sm">👑 Host</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
