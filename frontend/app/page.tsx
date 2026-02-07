"use client";

import { motion, easeInOut } from "framer-motion";
// import { useGameStore } from "@/store/gameStore";
// import Link from 'next/link'
import { useEffect, useState } from "react";
import RoomModal from "@/components/RoomModal";
// import { useRouter } from "next/navigation";

export default function Home() {
  // useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showRoom, setShowRoom] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 3, repeat: Infinity, ease: easeInOut },
    },
  };

  const colorVariants = [
    "rgba(85, 189, 146, 0.15)", // primary
    "rgba(157, 123, 198, 0.15)", // secondary
    "rgba(230, 197, 131, 0.15)", // accent
  ];

  // const getRandomColor = (i: number) => colorVariants[i % colorVariants.length];

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-foreground overflow-hidden relative">
      {/* Background image with overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url(/landingBG.png)",
        }}
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const randomColor =
            colorVariants[Math.floor(Math.random() * colorVariants.length)];
          const randomDuration = 12 + Math.random() * 8;
          const randomDelay = Math.random() * 2;
          const randomSize = 200 + Math.random() * 300;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-2xl"
              style={{
                background: `radial-gradient(circle, ${randomColor.slice(0, -4)} 1), transparent 70%)`,
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, Math.random() * 100 - 50, 0],
                x: [0, Math.random() * 80 - 40, 0],
                scale: [0.8, 1.3, 0.8],
                opacity: [0.08, 0.2, 0.08],
              }}
              transition={{
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                ease: easeInOut,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col h-screen px-4 md:px-12 relative">
          {/* Header Section - Always on top, below navbar */}
          <motion.div
            className="flex flex-col items-center gap-2 md:gap-4 pt-8 md:pt-12 pb-8 md:pb-12 flex-shrink-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animated visual elements around headline */}
            <div className="flex items-center gap-4 md:gap-8 justify-center drop-shadow-2xl">
              <motion.div
                className="text-2xl md:text-5xl font-pixel text-cyan-300 drop-shadow-lg"
                variants={itemVariants}
                animate={floatingVariants.animate}
                style={{
                  WebkitTextStroke: "2px rgba(0,0,0,0.4)",
                }}
              >
                {"<"}
              </motion.div>
              <motion.h1
                className="font-pixel text-3xl md:text-5xl text-balance leading-tight drop-shadow-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.4)",
                }}
                variants={itemVariants}
              >
                CODE ROYALE
              </motion.h1>
              <motion.div
                className="text-2xl md:text-5xl font-pixel text-orange-300 drop-shadow-lg"
                variants={itemVariants}
                animate={floatingVariants.animate}
                transition={{ delay: 0.1 }}
                style={{
                  WebkitTextStroke: "2px rgba(0,0,0,0.4)",
                }}
              >
                {">"}
              </motion.div>
            </div>

            {/* Mini tagline */}
            <motion.p
              className="text-xs md:text-sm font-mono tracking-widest drop-shadow-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-600 to-orange-700 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              SURVIVE • OUTPLAY • WIN
            </motion.p>
          </motion.div>

          {/* Main Content Area - Flexible center */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* CENTER: DOMINANT CTA or ROOM SECTION */}
            {!showRoom && (
              <motion.div
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {/* Glow background */}
                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl -z-10" />

                {/* Main CTA Button */}
                <motion.button
                  onClick={() => setShowRoom(true)}
                  className="px-12 md:px-20 py-6 md:py-8 rounded-2xl bg-gradient-to-br from-cyan-400/50 via-blue-500/50 to-cyan-400/30 text-white border-3 border-cyan-300 font-pixel text-2xl md:text-4xl hover:from-cyan-400/70 hover:via-blue-500/70 hover:to-cyan-400/50 transition-all shadow-2xl drop-shadow-lg font-bold"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)",
                    borderColor: "rgb(165, 243, 252)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: easeInOut },
                  }}
                >
                  PLAY NOW
                </motion.button>

                {/* Quick stats under button */}
                <motion.div
                  className="flex gap-8 md:gap-12 text-center drop-shadow-lg"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { num: "5K+", label: "Players" },
                    { num: "50K+", label: "Matches" },
                    { num: "98%", label: "Fun" },
                  ].map((stat) => (
                    <motion.div key={stat.label} variants={itemVariants}>
                      <p className="font-pixel text-lg md:text-2xl text-cyan-300 font-bold drop-shadow-lg">
                        {stat.num}
                      </p>
                      <p className="text-xs md:text-sm text-white font-bold drop-shadow-md">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Bottom Section - Mechanics with visuals */}
          {!showRoom && (
            <motion.div
              className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-2xl mx-auto pb-8 flex-shrink-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: "🧩", label: "CODE" },
                { icon: "⚔️", label: "ATTACK" },
                { icon: "🏆", label: "WIN" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="bg-black/40 border-2 border-white/30 rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 hover:bg-black/60 hover:border-cyan-400/60 transition-all backdrop-blur-sm drop-shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <span className="text-3xl md:text-4xl">{item.icon}</span>
                  <span className="font-pixel text-xs md:text-sm text-white text-center font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          <RoomModal
            open={showRoom}
            onClose={() => setShowRoom(false)}
            onCreate={(roomId) => {
              console.log("Create room:", roomId);
              setShowRoom(false);
            }}
            onJoin={(roomId) => {
              console.log("Join room:", roomId);
              setShowRoom(false);
            }}
          />

          {/* Footer text */}
          <motion.p
            className="text-xs text-white text-center pb-3 md:pb-4 flex-shrink-0 drop-shadow-md font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Built for developers who code under pressure
          </motion.p>
        </div>
      </div>
    </div>
  );
}
