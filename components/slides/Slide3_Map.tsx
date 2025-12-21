"use client";

import { motion } from 'framer-motion';

// --- CONFIGURATION ---
// Coordinates calibrated to match the India map image bounds
// Map image sits roughly at: x: 15-65%, y: 5-95% of container
// Adjusted for actual geographic positions
const CITIES = [
    { name: "Kashmir", x: 32, y: 12, pulse: 2.0, label: "& many more...", type: "ghost" },
    { name: "Delhi", x: 38, y: 32, pulse: 2.5, highlight: true },
    { name: "Noida", x: 42, y: 34, pulse: 2.5, highlight: true },
    { name: "Mumbai", x: 22, y: 55, pulse: 2.2 },
    { name: "Pune", x: 26, y: 60, pulse: 2.0 },
    { name: "Hyderabad", x: 36, y: 62, pulse: 1.8 },
    { name: "Warangal", x: 40, y: 58, pulse: 1.5 },
    { name: "Vizag", x: 48, y: 54, pulse: 1.8 },
    { name: "Vijayawada", x: 42, y: 64, pulse: 1.5 },
    { name: "Bangalore", x: 32, y: 74, pulse: 2.0 },
    { name: "Chennai", x: 42, y: 72, pulse: 2.2 },
];

export default function Slide3_Map({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">

            {/* --- UNIFIED MAP + NODES CONTAINER --- */}
            {/* This container holds both the map image and city nodes, ensuring they align */}
            <div className="relative w-[85vw] h-[85vw] max-w-[500px] max-h-[500px] md:w-[70vh] md:h-[70vh] md:max-w-none md:max-h-none">

                {/* Base Map Image - fills the container */}
                <motion.img
                    src="/india-map-dark.png"
                    alt="Map of India"
                    className="absolute inset-0 w-full h-full object-contain opacity-30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.30, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Glow effect behind map */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(100, 150, 255, 0.15) 0%, transparent 70%)'
                    }}
                />

                {/* City Nodes - positioned relative to the same container as the map */}
                {CITIES.map((city, i) => (
                    <CityNode key={city.name} city={city} index={i} />
                ))}

                {/* Connection Lines (decorative network effect) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <motion.line
                        x1="42%" y1="28%" x2="40%" y2="75%"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.line
                        x1="28%" y1="52%" x2="45%" y2="62%"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.2 }}
                    />
                    <motion.line
                        x1="45%" y1="62%" x2="52%" y2="76%"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.4 }}
                    />
                </svg>
            </div>

            {/* --- LEGEND (Top Right) --- */}
            <motion.div
                className="absolute top-6 right-4 md:top-10 md:right-10 text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] md:text-xs text-gray-500">Node size</span>
                        <div className="w-3 h-3 rounded-full bg-white/60" />
                        <span className="text-[10px] md:text-xs text-gray-400">Partnerships</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] md:text-xs text-gray-500">Pulse rate</span>
                        <motion.div
                            className="w-2 h-2 rounded-full bg-white/80"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[10px] md:text-xs text-gray-400">Builder density</span>
                    </div>
                </div>
            </motion.div>

            {/* --- TITLE (Bottom Left) --- */}
            <motion.div
                className="absolute bottom-6 left-4 md:bottom-10 md:left-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <h2
                    className="text-2xl md:text-4xl font-bold text-white mb-1"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Geographic
                </h2>
                <h2
                    className="text-2xl md:text-4xl font-bold text-white/70"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    Reach
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                    11 cities · Pan-India presence
                </p>
            </motion.div>

        </div>
    );
}

function CityNode({ city, index }: { city: typeof CITIES[0], index: number }) {
    const isHighlight = city.highlight;
    const isGhost = city.type === "ghost";

    // Node sizes
    const nodeSize = isHighlight ? 14 : (isGhost ? 6 : 10);
    const pulseSize = nodeSize * 3;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.1,
                type: "spring",
                damping: 15
            }}
            className="absolute flex items-center justify-center"
            style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHighlight ? 20 : 10
            }}
        >
            {/* Pulse Ring Animation */}
            {!isGhost && (
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: pulseSize,
                        height: pulseSize,
                        background: isHighlight
                            ? 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                        duration: city.pulse,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Core Node */}
            <motion.div
                className={`rounded-full ${isGhost ? 'border border-gray-600' : ''}`}
                style={{
                    width: nodeSize,
                    height: nodeSize,
                    background: isGhost
                        ? 'transparent'
                        : isHighlight
                            ? 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)'
                            : 'rgba(255,255,255,0.85)',
                    boxShadow: isHighlight
                        ? '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)'
                        : '0 0 10px rgba(255,255,255,0.3)'
                }}
                whileHover={{ scale: 1.3 }}
            />

            {/* City Label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="absolute whitespace-nowrap pointer-events-none"
                style={{
                    top: nodeSize / 2 + 8,
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                <span
                    className={`text-[9px] md:text-[11px] ${isHighlight
                            ? 'font-semibold text-white'
                            : isGhost
                                ? 'italic text-gray-600 text-[8px] md:text-[10px]'
                                : 'font-medium text-gray-300'
                        }`}
                    style={{
                        fontFamily: 'var(--font-inter)',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}
                >
                    {city.label || city.name}
                </span>
            </motion.div>
        </motion.div>
    );
}
