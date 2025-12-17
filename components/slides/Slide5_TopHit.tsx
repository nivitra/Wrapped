"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- CONFIGURATION ---
const STATS = [
    { value: "5", label: "institutions", delay: 0 },
    { value: "2,200+", label: "active participants", delay: 0.2 },
    { value: "3,000+", label: "production agents", delay: 0.4 }
];

const CONFETTI = ["{ }", "[ ]", "=>", "fn", "&&", "||", "</>", "01"];

export default function Slide5_TopHit({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-6">

            {/* --- CODE CONFETTI --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {CONFETTI.map((char, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
                        animate={{ y: '-10vh', opacity: [0, 0.15, 0] }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        className="absolute text-2xl font-mono text-[#1f1f1f]"
                    >
                        {char}
                    </motion.div>
                ))}
            </div>

            {/* --- CARD CONTAINER --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-md md:max-w-3xl bg-[#1a1a1a] border border-[#3a3a3a] rounded-2xl p-8 md:p-12 shadow-2xl"
            >
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-2"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        Agentsphere Series
                    </h1>
                    <p
                        className="text-lg md:text-2xl text-[#7a7a7a]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        Automating Using First Principles
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + stat.delay, duration: 0.5 }}
                            className="flex flex-col items-center md:items-start"
                        >
                            <span
                                className="text-5xl md:text-6xl font-black text-white mb-2"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                {stat.value}
                            </span>
                            <span className="text-sm md:text-base font-light text-[#5a5a5a] uppercase tracking-wide">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Footer / Logos Placeholder */}
                <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex justify-center md:justify-start gap-4 opacity-30 grayscale">
                    {/* Placeholders for college logos */}
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-[#3a3a3a]" />
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
