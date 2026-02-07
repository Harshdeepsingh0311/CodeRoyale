"use client"
import { useGameStore } from "@/store/gameStore";

export default function Home() {
  useGameStore();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-orange-400">
      <h1 className="text-5xl font-bold text-white">
        Code Royale 👑
      </h1>
    </main>
  );
}


