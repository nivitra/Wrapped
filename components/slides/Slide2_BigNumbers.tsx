"use client";

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Users, Code, TrendingUp } from 'lucide-react';

const DATA = {
    count: 4860,
    workshops: 27,
    highlight: "Across 27 high-intensity workshops",
    sub: "Students turned Builders"
};

// --- 1. Custom Physics-based Counter Hook (The "Weight") ---
function useWeightedCounter({ value }: { value: number }) {
    const ref = useRef(null);
    // Check if component is visible
    const isInView = useInView(ref, { once: true });

    // High stiffness ensures a quick but powerful overshoot and snap-back
    const springValue = useSpring(0, { stiffness: 500, damping: 30, mass: 1 });
    // Round to display integer value
    const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        if (isInView) {
            springValue.set(value); // Trigger the physics animation
        }
    }, [isInView, value, springValue]);

    return { displayValue, ref };
}

// Counter Component to display the value
const WeightedCounterDisplay = ({ value }: { value: number }) => {
    const { displayValue, ref } = useWeightedCounter({ value });
    return <motion.span ref={ref}>{displayValue}</motion.span>;
};


export default function Slide2_TheScale({ onComplete }: { onComplete: () => void }) {

    useEffect(() => {
        const timer = setTimeout(onComplete, 6000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    // Simple animation for the background grid pulse
    const DensityNode = ({ i }: { i: number }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, Math.random() * 0.2, 0] }}
            transition={{ delay: i * 0.05, duration: 3, repeat: Infinity }}
            className="bg-white rounded-full w-1 h-1"
        />
    );

    return (
        <div className="relative w-full h-full flex flex-col justify-between p-8 pt-24 pb-12 bg-[#030305] overflow-hidden">

            {/* --- LAYER A: DENSITY GRID BACKGROUND (4860 people visualization) --- */}
            <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 gap-4 opacity-10 mask-image-radial-gradient-at-center pointer-events-none">
                {Array.from({ length: 96 }).map((_, i) => (
                    <DensityNode key={i} i={i} />
                ))}
            </div>

            {/* --- LAYER B: HEADER (Sequenced Entry) --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-10"
            >
                <div className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-3 py-1 rounded-full inline-block mb-4">
                    SCALE REPORT
                </div>
                <h3 className="text-2xl text-gray-400 font-medium max-w-[200px]">
                    How big was this <span className="text-white font-bold">really?</span>
                </h3>
            </motion.div>

            {/* --- LAYER C: CENTER STAGE: THE NUMBER (with Reflection) --- */}
            <div className="z-10 flex flex-col items-center justify-center flex-1">
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, filter: "blur(20px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                >
                    {/* Main Number */}
                    <h1 className="text-[14vh] font-black text-white leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-xl">
                        <WeightedCounterDisplay value={DATA.count} />
                    </h1>
                    {/* Mirrored Reflection (for depth) */}
                    <h1 className="text-[14vh] font-black text-white leading-none tracking-tighter absolute top-full left-0 opacity-10 scale-y-[-1] mask-image-linear-to-b-50">
                        <WeightedCounterDisplay value={DATA.count} />
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-xl font-medium text-gray-300 mt-4 tracking-wide"
                >
                    {DATA.sub}
                </motion.p>
            </div>

            {/* --- LAYER D: BOTTOM STATS CARD (Final Anchor) --- */}
            <motion.div
                initial={{ y: 50, opacity: 0, rotateX: 30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 2.0, type: "spring", stiffness: 100 }}
                className="z-10 bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl"
            >
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={40} className="text-neon-green" />
                        <div>
                            <div className="text-3xl font-bold text-white">{DATA.workshops}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest">Workshops <br /> Conducted</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-neon-purple">{DATA.highlight.split(' ')[0]} {DATA.highlight.split(' ')[1]}</div>
                        <div className="text-[10px] text-gray-500">Zero Filler.</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
