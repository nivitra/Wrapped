"use client";

import { motion } from 'framer-motion';

// --- CONFIGURATION ---
// Placeholder colors for screenshots
const PROJECTS = [
    "bg-blue-900", "bg-indigo-900", "bg-purple-900",
    "bg-pink-900", "bg-rose-900", "bg-red-900"
];

export default function Slide6_Projects({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- TETRIS GRID --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-1 w-full max-w-4xl px-4">
                {PROJECTS.map((bg, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -1000, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 50,
                            delay: i * 0.1 // Staggered fall
                        }}
                        className={`aspect-video ${bg} rounded-sm border border-[#2a2a2a] relative group cursor-pointer overflow-hidden`}
                    >
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-mono">VIEW DEPLOYMENT</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- HERO NUMBER OVERLAY --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-[20vw] md:text-[12rem] font-black text-white tracking-tighter"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    1,340+
                </motion.h1>
            </div>

            {/* --- COMPLETION BADGE (Top Right) --- */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", damping: 12 }}
                className="absolute top-24 right-6 md:top-12 md:right-12 bg-[rgba(74,122,255,0.1)] border border-[#4a7aff] rounded-xl px-4 py-2 md:px-6 md:py-3 backdrop-blur-md"
            >
                <div className="flex flex-col items-end leading-none">
                    <span className="text-3xl md:text-5xl font-black text-[#4a7aff]">74%</span>
                    <span className="text-xs md:text-sm text-white font-medium">completion rate</span>
                </div>
            </motion.div>

            {/* --- FOOTER --- */}
            <div className="absolute bottom-8 text-center w-full">
                <p className="text-[10px] md:text-xs text-[#4a7aff] underline decoration-1 underline-offset-4 opacity-80">
                    All projects deployable at time of reporting. Link list available.
                </p>
            </div>

        </div>
    );
}
