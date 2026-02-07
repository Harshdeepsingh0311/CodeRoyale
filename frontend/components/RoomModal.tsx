"use client";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";

type RoomModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (roomId: string) => void;
  onJoin: (roomId: string) => void;
};

export default function RoomModal({
  open,
  onClose,
  onCreate,
  onJoin,
}: RoomModalProps) {
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setRoomId("");
      setJoinRoomId("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 9).toUpperCase();
    setRoomId(id);
    handleJoin(id);
  };

  const handleJoin = (id: string) => {
    if (id.length < 4) {
      setError("Invalid Room ID");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onJoin(id);
      setLoading(false);
    }, 300);
  };

  const handlePasteAndJoin = () => {
    if (!joinRoomId.trim()) {
      setError("Room ID cannot be empty");
      return;
    }
    handleJoin(joinRoomId.toUpperCase());
  };

  // Keyboard support
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handlePasteAndJoin();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, joinRoomId]);

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
            className="w-full max-w-lg bg-black/50 border-3 border-cyan-400/50 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ ease: easeInOut }}
          >
            <h2 className="font-pixel text-xl md:text-2xl text-white text-center drop-shadow-lg">
              JOIN ROOM
            </h2>

            {/* CREATE */}
            <div className="space-y-3">
              <p className="font-pixel text-sm text-cyan-300">CREATE NEW</p>
              <motion.button
                onClick={generateRoomId}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/40 to-blue-500/40 text-white border-2 border-cyan-400 font-bold text-sm hover:from-cyan-500/60 hover:to-blue-500/60 transition-all disabled:opacity-50"
              >
                {loading ? "JOINING..." : "GENERATE & JOIN"}
              </motion.button>

              {roomId && (
                <div className="bg-cyan-500/20 border border-cyan-400/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-cyan-200">Room ID</p>
                  <p className="font-pixel text-lg text-cyan-300 font-bold">
                    {roomId}
                  </p>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-cyan-400/30" />
              <span className="text-xs text-cyan-300 font-mono font-bold">
                OR
              </span>
              <div className="flex-1 h-px bg-cyan-400/30" />
            </div>

            {/* JOIN */}
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
                  placeholder="Paste room ID"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-orange-400/50 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />
                <motion.button
                  onClick={handlePasteAndJoin}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/40 to-red-500/40 text-white border-2 border-orange-400 font-bold"
                >
                  JOIN
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
