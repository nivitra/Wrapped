"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

// --- CONFIGURATION ---
const DOMAINS = [
    { id: "web", label: "Web Dev", stats: "3 workshops, 420 builders", angle: 0 },
    { id: "nocode", label: "No-Code", stats: "2 workshops, 150 builders", angle: 90 },
    { id: "python", label: "Python", stats: "2 workshops, 340 builders", angle: 180 },
    { id: "startup", label: "Startup Practice", stats: "1 workshop, 80 builders", angle: 270 }
];

export default function Slide4_Genres({ onComplete }: { onComplete: () => void }) {
    const [activeDomain, setActiveDomain] = useState<string | null>(null);

    return (
        <div className="relative w-full h-full overflow-hidden bg-gradient-radial from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- ORBIT SYSTEM --- */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                {/* Central Node */}
                <div className="absolute z-20 text-center">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        AI &<br />Automation
                    </h1>
                </div>

                {/* Orbit Path (Visual) */}
                <div className="absolute inset-0 rounded-full border border-[#4a4a4a] border-dashed opacity-30 animate-spin-slow" />

                {/* Satellites */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    {DOMAINS.map((domain) => (
                        <Satellite
                            key={domain.id}
                            domain={domain}
                            isActive={activeDomain === domain.id}
                            onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* --- MOBILE TOOLTIP (Bottom Sheet style if active) --- */}
            {activeDomain && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-24 left-0 right-0 text-center"
                >
                    <div className="inline-block bg-[#1a1a1a] border border-[#3a3a3a] px-6 py-3 rounded-full shadow-2xl">
                        <p className="text-white font-medium">
                            {DOMAINS.find(d => d.id === activeDomain)?.stats}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* --- PROOF ELEMENT (Bottom) --- */}
            <div className="absolute bottom-8 w-full px-6">
                <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs text-[#5a5a5a] font-light">
                    <span>AI: 14 workshops</span>
                    <span>Web: 3</span>
                    <span>No-Code: 2</span>
                    <span>Python: 2</span>
                    <span>Startup: 1</span>
                </div>
            </div>

        </div>
    );
}

function Satellite({ domain, isActive, onClick }: { domain: any, isActive: boolean, onClick: () => void }) {
    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{ transform: `rotate(${domain.angle}deg) translate(140px) rotate(-${domain.angle}deg)` }} // 140px radius for mobile
        >
            {/* Counter-rotate to keep text upright requires logic in parent or here. 
                Actually, if parent rotates, children rotate. 
                To keep text upright, we need to counter-rotate the child container.
                Or simpler: Use CSS animation on parent, and counter-animation on child.
            */}
            <motion.div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ rotate: -360 }} // Counter rotation handled by parent's animate prop? No, need dynamic.
                // Simplified: Just let them rotate for now, or use a static layout for mobile if rotation is dizzying.
                // User asked for orbit. Let's try to keep text upright.
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <div
                    onClick={onClick}
                    className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                >
                    <div className={`w-3 h-3 rounded-full mb-2 ${isActive ? 'bg-white shadow-[0_0_10px_white]' : 'bg-[#b0b0b0]'}`} />
                    <span
                        className={`text-sm md:text-lg font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-[#b0b0b0]'}`}
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        {domain.label}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
