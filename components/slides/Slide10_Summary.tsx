"use client";

import { motion } from 'framer-motion';

export default function Slide10_Summary({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-6 border-[8px] border-white/85 box-border">

            {/* --- TITLE --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-24 md:top-32 text-center w-full"
            >
                <h1
                    className="text-4xl md:text-6xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    LearnApart<br />Wrapped 2025
                </h1>
            </motion.div>

            {/* --- SUMMARY GRID --- */}
            <div className="grid grid-cols-2 gap-px bg-[#2a2a2a] border border-[#2a2a2a] w-full max-w-md aspect-square">
                {[
                    { val: "4,860+", label: "Students" },
                    { val: "1,340+", label: "Projects" },
                    { val: "11+", label: "Cities" },
                    { val: "22", label: "Workshops" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="bg-[#0a0a0a] flex flex-col items-center justify-center p-4"
                    >
                        <span
                            className="text-4xl md:text-5xl font-black text-white mb-2"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            {item.val}
                        </span>
                        <span className="text-sm md:text-lg text-[#b0b0b0] font-normal">
                            {item.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* --- FOOTER & ACCENT --- */}
            <div className="absolute bottom-24 md:bottom-32 text-center w-full">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-[2px] bg-[#4a7aff] opacity-40 mx-auto mb-8"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl md:text-3xl text-[#4a7aff] italic"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Learning that ships.
                </motion.p>
            </div>

            {/* --- QR CODE PLACEHOLDER --- */}
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center">
                <span className="text-[8px] text-white/50">QR</span>
            </div>

        </div>
    );
}
