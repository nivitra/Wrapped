"use client";

import { motion, useAnimationControls, PanInfo } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION ---
const CARDS = [
    { id: "ai_agents", title: "AI Agents", subtitle: "Solving Problems in AI", stats: "14 Workshops", color: "from-purple-500 to-indigo-600" },
    { id: "web", title: "Full Stack Web", subtitle: "Core Engineering", stats: "3 Workshops", color: "from-blue-500 to-cyan-400" },
    { id: "nocode", title: "No-Code", subtitle: "Velocity Track", stats: "2 Workshops", color: "from-emerald-500 to-teal-400" },
    { id: "python", title: "Python for AI", subtitle: "Foundation", stats: "2 Workshops", color: "from-amber-500 to-orange-600" },
    { id: "startup", title: "Startup Eng", subtitle: "Strategy", stats: "1 Workshop", color: "from-rose-500 to-pink-600" },
    // Duplicate for infinite loop illusion
    { id: "ai_agents_dup", title: "AI Agents", subtitle: "Solving Problems in AI", stats: "14 Workshops", color: "from-purple-500 to-indigo-600" },
    { id: "web_dup", title: "Full Stack Web", subtitle: "Core Engineering", stats: "3 Workshops", color: "from-blue-500 to-cyan-400" },
];

export default function Slide4_Genres({ onComplete }: { onComplete: () => void }) {
    const controls = useAnimationControls();

    // Auto-scroll logic (Fast Glide)
    useEffect(() => {
        controls.start({
            x: "-50%", // Move to halfway point
            transition: {
                duration: 10, // Faster glide (was 20)
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
            }
        });
    }, [controls]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- HEADER --- */}
            <div className="absolute top-12 md:top-24 text-center z-20">
                <h1
                    className="text-4xl md:text-6xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Curriculum<br />Architecture
                </h1>
                <p className="text-sm md:text-lg text-[#7a7a7a] uppercase tracking-widest">
                    What We Shipped
                </p>
            </div>

            {/* --- CAROUSEL TRACK --- */}
            <div className="relative w-full h-[70vh] flex items-center overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 md:gap-8 px-12 md:px-32"
                    animate={controls}
                    style={{ width: "max-content" }}
                >
                    {CARDS.map((card, i) => (
                        <Card key={`${card.id}-${i}`} card={card} />
                    ))}
                </motion.div>
            </div>

        </div>
    );
}

function Card({ card }: { card: any }) {
    return (
        <div className="relative w-[220px] h-[500px] md:w-[280px] md:h-[600px] flex-shrink-0">
            {/* Glassmorphic Pillar */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-2xl">

                {/* Gradient Orb */}
                <div className={`absolute top-0 inset-x-0 h-full bg-gradient-to-b ${card.color} opacity-20`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-center pb-12">
                    <div className="mb-auto mt-12">
                        <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] text-white/80 uppercase tracking-wide">
                            {card.subtitle}
                        </span>
                    </div>

                    <h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        {card.title}
                    </h2>

                    <div className="w-12 h-[1px] bg-white/30 mx-auto my-4" />

                    <span className="text-lg text-white font-medium">
                        {card.stats}
                    </span>
                </div>
            </div>
        </div>
    );
}
