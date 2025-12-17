"use client";

import { motion } from 'framer-motion';

// --- CONFIGURATION ---
const MECHANICS = [
    { title: "Cohorts", desc: "4 sessions/city/year" },
    { title: "Builder Pass", desc: "Scalable certification" },
    { title: "Campus Partnerships", desc: "Revenue-share model" }
];

export default function Slide9_Future({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-6">

            {/* --- HUD RETICLE & TARGET --- */}
            <div className="relative mb-16">
                {/* Crosshair Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 2, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="absolute inset-0 -m-8 border border-[#4a7aff] rounded-full opacity-50"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.2 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-1 h-4 bg-[#4a7aff]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.2 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-2 w-1 h-4 bg-[#4a7aff]"
                />

                {/* Target Number */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-6xl md:text-9xl font-black text-white tracking-tighter"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    25,000+
                </motion.h1>
            </div>

            {/* --- PROGRESS BAR --- */}
            <div className="w-full max-w-xl h-2 bg-[#2a2a2a] rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: "19%" }} // 4860 / 25000 approx
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
                    className="h-full bg-[#4a7aff]"
                />
            </div>

            {/* --- MECHANICS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center md:text-left">
                {MECHANICS.map((mech, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 + i * 0.2 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <div className="w-6 h-6 border border-[#4a7aff] rounded-full mb-3" /> {/* Icon placeholder */}
                        <h3 className="text-lg font-medium text-white mb-1">{mech.title}</h3>
                        <p className="text-sm text-[#b0b0b0]">{mech.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* --- FOOTER --- */}
            <div className="absolute bottom-8 text-center w-full px-6">
                <p className="text-[10px] text-[#5a5a5a]">
                    Targets based on 2025 unit economics and confirmed 2026 pilot commitments.
                </p>
            </div>

        </div>
    );
}
