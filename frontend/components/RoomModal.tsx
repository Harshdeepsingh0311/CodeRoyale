"use client";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useRoomStore } from "@/store/roomStore";

type RoomModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RoomModal({ open, onClose }: RoomModalProps) {
  const router = useRouter();
  const { roomId } = useRoomStore();

  const [joinRoomId, setJoinRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roomId) return;

    setLoading(false);
    onClose();
    router.push(`/room/${roomId}`);
  }, [roomId]);

  /* ------------------ Load Saved Name ------------------ */
  useEffect(() => {
    const saved = localStorage.getItem("playerName");
    if (saved) setPlayerName(saved);
  }, []);

  /* ------------------ Redirect When Room Created ------------------ */
  // useEffect(() => {
  //   if (!roomId) return;

  //   setLoading(false);
  //   router.push(`/room/${roomId}`);
  // }, [roomId, router]);

  /* ------------------ Reset Modal When Opened ------------------ */
  useEffect(() => {
    if (open) {
      setJoinRoomId("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  /* ------------------ Name Validation ------------------ */
  const isValidName = (name: string) => {
    return /^[A-Za-z0-9_]{3,12}$/.test(name);
  };

  /* ------------------ CREATE ROOM ------------------ */
  const handleCreateRoom = () => {
    if (!isValidName(playerName)) {
      setError("Name must be 3–12 characters, one word only");
      return;
    }

    localStorage.setItem("playerName", playerName);

    setLoading(true);
    setError("");

    socket.emit("create_room", {
      playerId: playerName,
    });
  };

  /* ------------------ JOIN ROOM ------------------ */
  const handleJoinRoom = () => {
    const formattedRoomId = joinRoomId.trim().toUpperCase();

    if (!isValidName(playerName)) {
      setError("Name must be 3–12 characters, one word only");
      return;
    }

    if (!formattedRoomId) {
      setError("Room ID cannot be empty");
      return;
    }

    if (!/^[A-Z0-9]{4,8}$/.test(formattedRoomId)) {
      setError("Invalid Room ID format");
      return;
    }

    localStorage.setItem("playerName", playerName);

    setLoading(true);
    setError("");

    socket.emit("join_room", {
      roomId: formattedRoomId,
      playerId: playerName,
    });

    // Navigate immediately — state will sync via room_update
    router.push(`/room/${formattedRoomId}`);
  };

  /* ------------------ Keyboard Support ------------------ */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleJoinRoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, joinRoomId, playerName]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg bg-black/50 border-2 border-cyan-400/50 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ ease: easeInOut }}
          >
            <h2 className="font-pixel text-xl md:text-2xl text-white text-center drop-shadow-lg">
              JOIN ROOM
            </h2>

            {/* PLAYER NAME */}
            <div className="space-y-2">
              <p className="font-pixel text-sm text-white">YOUR NAME</p>
              <input
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setError("");
                }}
                placeholder="Enter one-word name"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* CREATE ROOM */}
            <div className="space-y-3">
              <p className="font-pixel text-sm text-cyan-300">CREATE NEW</p>
              <motion.button
                onClick={handleCreateRoom}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/40 to-blue-500/40 text-white border-2 border-cyan-400 font-bold text-sm disabled:opacity-50"
              >
                {loading ? "CREATING..." : "CREATE ROOM"}
              </motion.button>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-cyan-400/30" />
              <span className="text-xs text-cyan-300 font-mono font-bold">
                OR
              </span>
              <div className="flex-1 h-px bg-cyan-400/30" />
            </div>

            {/* JOIN ROOM */}
            <div className="space-y-3">
              <p className="font-pixel text-sm text-orange-300">
                JOIN EXISTING
              </p>

              <div className="flex gap-2">
                <input
                  value={joinRoomId}
                  onChange={(e) => {
                    setJoinRoomId(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter room ID"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-orange-400/50 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />

                <motion.button
                  onClick={handleJoinRoom}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/40 to-red-500/40 text-white border-2 border-orange-400 font-bold disabled:opacity-50"
                >
                  {loading ? "JOINING..." : "JOIN"}
                </motion.button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            {/* BACK */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-2 rounded-lg bg-white/10 text-white border-2 border-white/30 font-semibold text-xs hover:bg-white/20"
            >
              BACK
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
