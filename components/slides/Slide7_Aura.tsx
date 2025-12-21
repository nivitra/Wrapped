"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

const TRANSFORMATION = {
    before: "CONSUMER",
    after: "BUILDER",
};

const IMPACT_STATS = [
    { value: 82, label: "First project built" },
    { value: 64, label: "First AI experience" },
    { value: 91, label: "First deployment" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide7_Aura({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'before' | 'after' | 'stats'>('before');
    const [statValues, setStatValues] = useState([0, 0, 0]);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('after'), 2000);
        const t2 = setTimeout(() => setPhase('stats'), 3500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    // Animate stats when phase is 'stats'
    useEffect(() => {
        if (phase === 'stats') {
            IMPACT_STATS.forEach((stat, i) => {
                let count = 0;
                const interval = setInterval(() => {
                    count += 3;
                    if (count >= stat.value) {
                        setStatValues(prev => {
                            const copy = [...prev];
                            copy[i] = stat.value;
                            return copy;
                        });
                        clearInterval(interval);
                    } else {
                        setStatValues(prev => {
                            const copy = [...prev];
                            copy[i] = count;
                            return copy;
                        });
                    }
                }, 30 + i * 10);
            });
        }
    }, [phase]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black flex flex-col items-center justify-center">

            {/* Background Glow */}
            <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                    background: phase === 'before'
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(80,40,40,0.1) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at 50% 50%, rgba(74,122,255,0.08) 0%, transparent 60%)',
                }}
            />

            {/* Header */}
            <div className="absolute top-6 md:top-12 left-0 right-0 text-center z-40">
                <motion.span
                    className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40"
                    key={phase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {phase === 'before' ? 'They walked in as' : 'They walked out as'}
                </motion.span>
            </div>

            {/* Main Word */}
            <div className="relative z-30 text-center mb-8">
                {phase === 'before' ? (
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-5xl md:text-[10rem] font-black text-white/15 leading-none"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        {TRANSFORMATION.before}
                    </motion.h1>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <h1
                            className="text-6xl md:text-[12rem] font-black text-white leading-none"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            {TRANSFORMATION.after}
                        </h1>
                        {/* Underline */}
                        <motion.div
                            className="h-1 md:h-2 bg-gradient-to-r from-[#4a7aff] to-[#00ff9d] rounded-full mt-4 mx-auto"
                            initial={{ width: 0 }}
                            animate={{ width: '80%' }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                    </motion.div>
                )}
            </div>

            {/* Stats - BIG NUMBERS */}
            {phase === 'stats' && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-30 w-full max-w-4xl px-4"
                >
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        {IMPACT_STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="text-center p-4 md:p-6 rounded-2xl"
                                style={{
                                    background: 'rgba(74,122,255,0.05)',
                                    border: '1px solid rgba(74,122,255,0.15)',
                                }}
                            >
                                {/* BIG NUMBER */}
                                <div className="flex items-baseline justify-center">
                                    <span
                                        className="text-6xl md:text-9xl font-black text-white"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    >
                                        {statValues[i]}
                                    </span>
                                    <span className="text-3xl md:text-5xl font-bold text-[#4a7aff]">
                                        %
                                    </span>
                                </div>

                                {/* Label */}
                                <p className="text-sm md:text-lg text-white/50 mt-2">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Bottom Caption */}
            <motion.div
                className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'stats' ? 1 : 0 }}
                transition={{ delay: 1 }}
            >
                <p className="text-xs md:text-sm text-white/30">
                    n = 4,860 verified post-workshop responses
                </p>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 opacity-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M0 20V0H20" stroke="white" strokeWidth="1" />
                </svg>
            </div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M20 20V0H0" stroke="white" strokeWidth="1" />
                </svg>
            </div>
        </div>
    );
}
