"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ROOM_ID_REGEX = /^[A-Z0-9]{4,8}$/;

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = Array.isArray(params.roomId)
    ? params.roomId[0]
    : params.roomId;

  useEffect(() => {
    if (!roomId || !ROOM_ID_REGEX.test(roomId)) {
      router.replace("/");
    }
  }, [roomId, router]);

  if (!roomId || !ROOM_ID_REGEX.test(roomId)) {
    return null; // avoid flicker during redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center shadow-2xl max-w-md">
        <h1 className="text-3xl font-bold mb-4">Room Lobby</h1>

        <p className="text-sm text-white/70 mb-2">Room ID</p>
        <p className="text-2xl font-mono tracking-widest font-bold text-cyan-300">
          {roomId}
        </p>

        <p className="mt-6 text-sm text-white/60">Waiting for players…</p>
      </div>
    </div>
  );
}
