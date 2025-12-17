"use client";

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION ---
const FINAL_NUMBER = 4860;
const DURATION = 2500; // 2.5s

// Placeholder images for the grid (using gradients/colors if real images missing)
const GRID_IMAGES = [
    "bg-zinc-800", "bg-zinc-700", "bg-zinc-600", "bg-zinc-500",
    "bg-zinc-800", "bg-zinc-700", "bg-zinc-600", "bg-zinc-500"
];

export default function Slide2_BigNumbers({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false }); // Trigger every time it comes into view? Or once? User said "on load" usually implies once per session, but for slides usually every time.

    // Number Animation
    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 20,
        duration: 2.5
    });

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest).toLocaleString());

    useEffect(() => {
        if (isInView) {
            springValue.set(FINAL_NUMBER);
            // Sequence for secondary layers
            const t1 = setTimeout(() => setShowBuilders(true), 2800); // 2.5s + 300ms
            const t2 = setTimeout(() => setShowWorkshops(true), 3300); // + 500ms
            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else {
            springValue.set(0); // Reset when out of view
            setShowBuilders(false);
            setShowWorkshops(false);
        }
    }, [isInView, springValue]);

    const [showBuilders, setShowBuilders] = useState(false);
    const [showWorkshops, setShowWorkshops] = useState(false);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#2a2a2a] flex flex-col items-center justify-center">

            {/* --- BACKGROUND GRID (Blurred) --- */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 opacity-20 pointer-events-none">
                {GRID_IMAGES.map((bg, i) => (
                    <div key={i} className={`w-full h-full ${bg} blur-[80px] transform scale-110`} />
                ))}
            </div>

            {/* --- HERO NUMBER --- */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="flex items-start leading-none">
                    <motion.span
                        className="text-[15vw] md:text-[12rem] font-black text-white tracking-tighter tabular-nums"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        {displayValue}
                    </motion.span>
                    <span className="text-[9vw] md:text-[7rem] font-bold text-[#b0b0b0] mt-[2vw] md:mt-4">+</span>
                </div>

                {/* Secondary: "builders" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showBuilders ? 1 : 0, y: showBuilders ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 md:mt-4"
                >
                    <span
                        className="text-4xl md:text-6xl text-[#b0b0b0] italic"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        builders
                    </span>
                </motion.div>

                {/* Tertiary: "workshops" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showWorkshops ? 1 : 0, y: showWorkshops ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 md:mt-12 max-w-[80%] mx-auto"
                >
                    <p
                        className="text-lg md:text-2xl font-medium text-[#7a7a7a]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        22 hands-on workshops — no passive sessions
                    </p>
                </motion.div>
            </div>

            {/* --- PROOF ELEMENT (Bottom Left) --- */}
            <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20">
                <p className="text-[10px] md:text-xs text-[#4a4a4a] font-light leading-relaxed uppercase tracking-wide">
                    Measured across:<br />
                    - 22 workshop cohorts<br />
                    - 11 cities<br />
                    - 8 workshop formats<br />
                    - 100% attendance-verified
                </p>
            </div>

        </div>
    );
}
