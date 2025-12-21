"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

const FINAL_STATS = [
    { value: 4860, label: "BUILDERS", suffix: "+" },
    { value: 1340, label: "PROJECTS", suffix: "+" },
    { value: 22, label: "WORKSHOPS", suffix: "" },
    { value: 11, label: "CITIES", suffix: "" },
];

const STATEMENT = {
    line1: "From classrooms to production.",
    line2: "From ideas to impact.",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide10_Summary({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const timings = [500, 1500, 2500, 1500, 1500];
        let totalDelay = 0;

        const timers = timings.map((delay, i) => {
            totalDelay += delay;
            return setTimeout(() => {
                if (mountedRef.current) setPhase(i + 1);
            }, totalDelay);
        });

        return () => {
            mountedRef.current = false;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#000000] flex flex-col items-center justify-center">

            {/* Background Effects */}
            <BackgroundEffects phase={phase} />

            {/* Border Frame */}
            <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none" />

            {/* Corner Accents */}
            <CornerAccents phase={phase} />

            {/* Top Labels */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-8 md:top-16 left-8 md:left-16 z-40"
            >
                <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.5em]">
                    Wrapped
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-8 md:top-16 right-8 md:right-16 z-40"
            >
                <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.5em]">
                    2025
                </span>
            </motion.div>

            {/* =================================================================== */}
            {/* MAIN CONTENT */}
            {/* =================================================================== */}
            <div className="relative z-30 flex flex-col items-center justify-center px-6">

                {/* Brand Name */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: phase >= 1 ? 1 : 0,
                        y: phase >= 1 ? 0 : 30
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h1
                        className="text-6xl md:text-[10rem] font-black text-white tracking-tight leading-none"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        LearnApart
                    </h1>
                </motion.div>

                {/* Bootstrapped Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: phase >= 3 ? 1 : 0,
                        scale: phase >= 3 ? 1 : 0.8
                    }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="mb-8 md:mb-12"
                >
                    <div
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,255,157,0.1) 0%, rgba(74,122,255,0.1) 100%)',
                            border: '1px solid rgba(0,255,157,0.3)',
                        }}
                    >
                        <span className="text-xl">🚀</span>
                        <span
                            className="text-sm md:text-lg font-black text-[#00ff9d] uppercase tracking-widest"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            All Bootstrapped
                        </span>
                        <span className="text-xl">💪</span>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-10 md:mb-14"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {FINAL_STATS.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} active={phase >= 2} />
                    ))}
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: phase >= 4 ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-32 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-10 md:mb-14"
                />

                {/* Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: phase >= 4 ? 1 : 0,
                        y: phase >= 4 ? 0 : 20
                    }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl"
                >
                    <p
                        className="text-2xl md:text-4xl text-white font-light leading-relaxed"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        {STATEMENT.line1}
                    </p>
                    <p
                        className="text-2xl md:text-4xl text-white/50 font-light leading-relaxed mt-2"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        {STATEMENT.line2}
                    </p>
                </motion.div>
            </div>

            {/* Signature Line */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: phase >= 5 ? 1 : 0,
                    y: phase >= 5 ? 0 : 20
                }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-8 md:bottom-16 text-center z-40"
            >
                <p
                    className="text-white text-xl md:text-3xl font-bold italic"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Learning that ships.
                </p>
            </motion.div>
        </div>
    );
}

// =============================================================================
// STAT CARD
// =============================================================================

function StatCard({ stat, index, active }: {
    stat: typeof FINAL_STATS[0];
    index: number;
    active: boolean;
}) {
    const [displayValue, setDisplayValue] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (active && !hasAnimated.current) {
            hasAnimated.current = true;

            const duration = 1500;
            const steps = 40;
            const increment = stat.value / steps;
            let current = 0;
            let intervalId: NodeJS.Timeout;

            const timerId = setTimeout(() => {
                intervalId = setInterval(() => {
                    current += increment;
                    if (current >= stat.value) {
                        setDisplayValue(stat.value);
                        clearInterval(intervalId);
                    } else {
                        setDisplayValue(Math.floor(current));
                    }
                }, duration / steps);
            }, index * 100);

            return () => {
                clearTimeout(timerId);
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [active, stat.value, index]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: active ? 1 : 0,
                y: active ? 0 : 20,
            }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative text-center p-4 md:p-6 rounded-xl"
            style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            {/* Number */}
            <div
                className="text-4xl md:text-6xl font-black text-white mb-2"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                {displayValue.toLocaleString()}{stat.suffix}
            </div>

            {/* Label */}
            <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em]">
                {stat.label}
            </div>

            {/* Top accent line */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-[#4a7aff] to-[#00ff9d] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: active ? '60%' : 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            />
        </motion.div>
    );
}

// =============================================================================
// BACKGROUND EFFECTS
// =============================================================================

function BackgroundEffects({ phase }: { phase: number }) {
    return (
        <>
            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Center Glow */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: phase >= 4 ? 1 : 0.5,
                }}
                transition={{ duration: 1 }}
                style={{
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(74,122,255,0.06) 0%, transparent 60%)',
                }}
            />
        </>
    );
}

// =============================================================================
// CORNER ACCENTS
// =============================================================================

function CornerAccents({ phase }: { phase: number }) {
    return (
        <>
            {/* Top Left */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-4 left-4 md:top-8 md:left-8"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M0 24V0H24" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>

            {/* Top Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute top-4 right-4 md:top-8 md:right-8"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M24 24V0H0" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M0 0V24H24" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M24 0V24H0" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>
        </>
    );
}
