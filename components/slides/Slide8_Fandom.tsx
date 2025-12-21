"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

const QUOTES = [
    {
        text: "We did more in 6 hours than we did in the entire last semester.",
        source: "Student"
    },
    {
        text: "Usually students leave early. Today, they stayed 2 hours late to finish deployment.",
        source: "Faculty"
    },
    {
        text: "This was the first time I felt like an engineer, not just a student.",
        source: "Student DM"
    },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide8_Fandom({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(0);
    const [quoteIdx, setQuoteIdx] = useState(0);
    const [percent, setPercent] = useState(0);

    // Phase progression
    useEffect(() => {
        // Quote 1
        const t1 = setTimeout(() => setQuoteIdx(1), 2500);
        // Quote 2
        const t2 = setTimeout(() => setQuoteIdx(2), 5000);
        // Switch to stats
        const t3 = setTimeout(() => setPhase(1), 7500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    // Count animation
    useEffect(() => {
        if (phase === 1) {
            let count = 0;
            const target = 63;
            const interval = setInterval(() => {
                count += 2;
                if (count >= target) {
                    setPercent(target);
                    clearInterval(interval);
                } else {
                    setPercent(count);
                }
            }, 40);

            return () => clearInterval(interval);
        }
    }, [phase]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#050505] flex items-center justify-center">

            {/* Header */}
            <motion.div
                className="absolute top-6 md:top-12 left-0 right-0 text-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30">
                    {phase === 0 ? 'Unfiltered Feedback' : 'The Proof'}
                </span>
            </motion.div>

            {/* === QUOTE PHASE === */}
            {phase === 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={quoteIdx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-30 text-center max-w-3xl px-8"
                    >
                        {/* Quote Mark */}
                        <div className="text-8xl text-white/5 font-serif absolute -top-12 left-1/2 -translate-x-1/2">
                            "
                        </div>

                        {/* Quote Text */}
                        <blockquote
                            className="text-2xl md:text-5xl text-white font-light leading-snug"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            {QUOTES[quoteIdx].text}
                        </blockquote>

                        {/* Source */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                            <span className="text-sm text-[#4a7aff] uppercase tracking-widest font-medium">
                                {QUOTES[quoteIdx].source}
                            </span>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* === STATS PHASE === */}
            {phase === 1 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-30 text-center"
                >
                    {/* The Big Number */}
                    <div className="relative">
                        {/* Glow */}
                        <div
                            className="absolute inset-0 blur-3xl opacity-30"
                            style={{
                                background: 'radial-gradient(circle, rgba(74,122,255,0.5) 0%, transparent 70%)',
                                transform: 'scale(1.5)',
                            }}
                        />

                        {/* Number */}
                        <div className="relative flex items-baseline justify-center">
                            <span
                                className="text-[10rem] md:text-[18rem] font-black text-white leading-none"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                {percent}
                            </span>
                            <span className="text-5xl md:text-8xl font-bold text-white/40 ml-2">
                                %
                            </span>
                        </div>
                    </div>

                    {/* Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-3xl text-white/50 mt-4"
                    >
                        Repeat Invite Rate
                    </motion.p>

                    {/* Comparison Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-full"
                        style={{
                            background: 'rgba(0,255,157,0.1)',
                            border: '1px solid rgba(0,255,157,0.2)',
                        }}
                    >
                        <span className="text-sm text-white/40">Industry average: 20%</span>
                        <span className="text-lg font-bold text-[#00ff9d]">3.2x better</span>
                    </motion.div>

                    {/* Proof Points */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-10 grid grid-cols-2 gap-6 max-w-md mx-auto"
                    >
                        <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <span className="text-2xl font-bold text-white">3</span>
                            <p className="text-xs text-white/30 mt-1">colleges re-invited before workshop ended</p>
                        </div>
                        <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <span className="text-2xl font-bold text-white">&lt;5%</span>
                            <p className="text-xs text-white/30 mt-1">attrition in 5-hour sessions</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Quote Progress Dots */}
            {phase === 0 && (
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
                    {QUOTES.map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                                background: i === quoteIdx ? '#4a7aff' : 'rgba(255,255,255,0.15)',
                                transform: i === quoteIdx ? 'scale(1.2)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Bottom Tagline */}
            {phase === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center"
                >
                    <p className="text-sm text-white/20" style={{ fontFamily: 'var(--font-playfair)' }}>
                        If 63% are bringing us back, what does that tell you?
                    </p>
                </motion.div>
            )}
        </div>
    );
}
