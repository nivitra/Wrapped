"use client";

import { motion, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Slide9_Future({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'baseline' | 'ascent' | 'lockin'>('baseline');
    const count = useMotionValue(4860);
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        // Sequence
        const sequence = async () => {
            // Phase 1: Baseline (0-1s)
            await new Promise(r => setTimeout(r, 1000));
            setPhase('ascent');

            // Phase 2: Ascent (1-3s)
            const controls = animate(count, 25000, { duration: 2.5, ease: "circIn" });
            await controls.finished;

            // Phase 3: Lock-in
            setPhase('lockin');
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- BACKGROUND GRID --- */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10 w-full max-w-md px-6 flex flex-col h-[80vh]">

                {/* Header */}
                <div className="mb-auto pt-12">
                    <h2 className="text-sm text-[#7a7a7a] uppercase tracking-widest mb-2">The Mission</h2>
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                        Scale Velocity
                    </h1>
                </div>

                {/* GRAPH CONTAINER */}
                <div className="relative flex-1 flex items-end pb-24">

                    {/* The Curve (SVG) */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4a7aff" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#00ff9d" stopOpacity="1" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Path: Starts bottom-left, curves exponentially to top-right */}
                        <motion.path
                            d="M 0 500 C 100 500, 200 400, 350 0"
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="6"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={phase !== 'baseline' ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 2.5, ease: "circIn" }}
                        />
                    </svg>

                    {/* Start Point Label */}
                    <div className="absolute bottom-0 left-0 transform translate-y-8">
                        <div className="text-[#4a7aff] font-bold text-lg">4,860</div>
                        <div className="text-xs text-[#555] uppercase">Students</div>
                    </div>

                    {/* End Point Label (The Hero) */}
                    <motion.div
                        className="absolute top-0 right-0 text-right"
                        initial={{ opacity: 0, y: 20 }}
                        animate={phase === 'lockin' ? { opacity: 1, y: 0 } : {}}
                    >
                        <motion.div className="text-6xl md:text-7xl font-black text-[#00ff9d] tracking-tighter leading-none">
                            <MotionText value={rounded} />
                            <span className="text-4xl align-top">+</span>
                        </motion.div>
                        <motion.div
                            className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest mt-2"
                            initial={{ color: "#555" }}
                            animate={{ color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                        >
                            Builders
                        </motion.div>
                    </motion.div>

                </div>

                {/* STRATEGIC LEVERS (Mechanics) */}
                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
                    <Lever label="Campus Nodes" delay={2.5} active={phase === 'lockin'} />
                    <Lever label="Builder Pass" delay={2.7} active={phase === 'lockin'} />
                    <Lever label="Corp Partners" delay={2.9} active={phase === 'lockin'} />
                </div>

            </div>

        </div>
    );
}

function Lever({ label, delay, active }: { label: string, delay: number, active: boolean }) {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center p-2 rounded bg-white/5 border ${active ? 'border-[#00ff9d]/50 bg-[#00ff9d]/10' : 'border-white/5'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay - 2.5 }} // Adjust relative to phase start
        >
            <div className={`w-2 h-2 rounded-full mb-2 ${active ? 'bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]' : 'bg-white/20'}`} />
            <span className={`text-[10px] uppercase text-center ${active ? 'text-white' : 'text-[#555]'}`}>
                {label}
            </span>
        </motion.div>
    );
}

function MotionText({ value }: { value: import('framer-motion').MotionValue<string> }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        return value.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest;
            }
        });
    }, [value]);

    return <span ref={ref}>{value.get()}</span>;
}
