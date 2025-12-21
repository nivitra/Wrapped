"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Slide5_TopHit({ onComplete }: { onComplete: () => void }) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center px-6">

            {/* --- THE CONTENT --- */}
            <div className="max-w-2xl w-full">

                {/* Series Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <span className="text-[11px] md:text-xs text-white/30 uppercase tracking-[0.4em]">
                        Our Flagship
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Agent<br />
                    <span className="text-white/40">sphere</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-base md:text-xl text-white/50 font-light mb-16 max-w-md"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    Teaching builders to automate <em className="text-white/70 not-italic">from first principles</em>—not prompts.
                </motion.p>

                {/* --- THE NUMBERS --- */}
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: revealed ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Stat 1 */}
                    <div className="flex items-baseline gap-4">
                        <motion.span
                            className="text-6xl md:text-8xl font-black text-white"
                            style={{ fontFamily: 'var(--font-inter)' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            5
                        </motion.span>
                        <motion.span
                            className="text-lg md:text-2xl text-white/40 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: revealed ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            tier-2 colleges. <span className="text-white/60">The real India.</span>
                        </motion.span>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-baseline gap-4">
                        <motion.span
                            className="text-6xl md:text-8xl font-black text-white"
                            style={{ fontFamily: 'var(--font-inter)' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            2,200
                        </motion.span>
                        <motion.span
                            className="text-lg md:text-2xl text-white/40 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: revealed ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                        >
                            builders. <span className="text-white/60">Zero dropouts.</span>
                        </motion.span>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-baseline gap-4">
                        <motion.span
                            className="text-6xl md:text-8xl font-black text-white"
                            style={{ fontFamily: 'var(--font-inter)' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            3,000
                        </motion.span>
                        <motion.span
                            className="text-lg md:text-2xl text-white/40 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: revealed ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                        >
                            agents. <span className="text-white/60">In production.</span>
                        </motion.span>
                    </div>
                </motion.div>

            </div>

            {/* --- BOTTOM ACCENT --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-6 md:left-12"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-white/20" />
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">
                        Series 01
                    </span>
                </div>
            </motion.div>

        </div>
    );
}
