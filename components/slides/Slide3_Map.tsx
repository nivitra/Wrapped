"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- CONFIGURATION ---
// Approximate relative coordinates for India map (0-100 scale)
const CITIES = [
    { name: "Hyderabad", x: 45, y: 60, pulse: 1.5 },
    { name: "Bangalore", x: 42, y: 75, pulse: 1.5 },
    { name: "Chennai", x: 52, y: 78, pulse: 2.2 },
    { name: "Vizag", x: 55, y: 58, pulse: 2.2 },
    { name: "Delhi", x: 40, y: 25, pulse: 3.0, highlight: true },
    { name: "Noida", x: 42, y: 24, pulse: 3.0, highlight: true },
    { name: "Mumbai", x: 25, y: 55, pulse: 3.0 },
    { name: "Pune", x: 28, y: 58, pulse: 3.0 },
    { name: "Warangal", x: 48, y: 58, pulse: 3.0 },
    { name: "Vijayawada", x: 50, y: 62, pulse: 3.0 },
    { name: "Kashmir", x: 35, y: 10, pulse: 0, label: "many more", type: "ghost" }
];

export default function Slide3_Map({ onComplete }: { onComplete: () => void }) {
    // Simple SVG Path for India (Abstract/Geometric representation)
    // This is a simplified polygon to resemble India
    const indiaPath = "M 30 5 L 50 5 L 60 15 L 70 30 L 60 50 L 50 85 L 40 95 L 30 85 L 20 50 L 10 30 L 20 15 Z";
    // Note: The above path is very abstract. For a "Strategic intelligence brief" look, 
    // we might want a more detailed path or just rely on the nodes if we can't import a complex SVG.
    // Let's use a slightly better polygon or just the nodes on a dark bg if path is too hard to get right without assets.
    // Actually, let's try to make it look decent.

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#1a1a1a] flex flex-col items-center justify-center">

            {/* --- MAP CONTAINER --- */}
            <div className="relative w-[90vw] h-[70vh] md:w-[60vh] md:h-[80vh]">
                {/* Base Map */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                    {/* Using a very rough approximation of India's shape for context */}
                    <path
                        d="M35 5 L55 5 L65 15 L75 35 L65 55 L55 90 L45 98 L35 90 L25 55 L15 35 L25 15 Z"
                        fill="none"
                        stroke="#3a3a3a"
                        strokeWidth="0.5"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* City Nodes */}
                {CITIES.map((city, i) => (
                    <CityNode key={city.name} city={city} index={i} />
                ))}
            </div>

            {/* --- LEGEND (Top Right) --- */}
            <div className="absolute top-8 right-6 md:top-12 md:right-12 text-right">
                <p className="text-[10px] md:text-xs text-[#5a5a5a] font-light leading-relaxed">
                    Node size = Institutional partnerships<br />
                    Pulse rate = Builder density
                </p>
            </div>

            {/* --- TITLE (Bottom Left - Optional context) --- */}
            <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
                <h2
                    className="text-2xl md:text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Geographic<br />Legitimacy
                </h2>
            </div>

        </div>
    );
}

function CityNode({ city, index }: { city: any, index: number }) {
    const isHighlight = city.highlight;
    const isGhost = city.type === "ghost";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isGhost ? 0.5 : (isHighlight ? 0.95 : 0.85), scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.15, // Sequential reveal
                type: "spring",
                damping: 12
            }}
            className="absolute flex flex-col items-center"
            style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            {/* Label */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: -10 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className={`absolute bottom-full mb-2 whitespace-nowrap ${isHighlight ? 'z-20' : 'z-10'}`}
            >
                <span
                    className={`${isHighlight ? 'text-base font-bold text-white drop-shadow-md' : isGhost ? 'text-xs italic text-[#5a5a5a]' : 'text-xs font-medium text-white'}`}
                    style={{ fontFamily: isHighlight ? 'var(--font-playfair)' : 'var(--font-inter)' }}
                >
                    {city.name}
                </span>
                {/* Connector Line */}
                {!isGhost && <div className="w-[1px] h-[10px] bg-[#4a4a4a] mx-auto" />}
            </motion.div>

            {/* Node Circle */}
            <div className="relative">
                {/* Pulse Ring */}
                {!isGhost && (
                    <motion.div
                        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                        transition={{
                            duration: city.pulse,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                        className={`absolute inset-0 rounded-full ${isHighlight ? 'bg-white' : 'bg-white'}`}
                    />
                )}

                {/* Core Node */}
                <div
                    className={`rounded-full ${isGhost ? 'border border-[#5a5a5a]' : 'bg-white'}`}
                    style={{
                        width: isHighlight ? 15 : (isGhost ? 12 : 8),
                        height: isHighlight ? 15 : (isGhost ? 12 : 8),
                        opacity: isHighlight ? 1 : (isGhost ? 0 : 0.85)
                    }}
                />
            </div>
        </motion.div>
    );
}
