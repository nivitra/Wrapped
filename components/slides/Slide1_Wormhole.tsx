"use client";

import { motion, useTime, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// DATA: "2025 WAS UNREAL"
const DATA = {
    year: 2025,
    words: ["2025", "WAS", "UNREAL"],
    timings: [500, 500, 2000] // 0.5s, 0.5s, then hold
};

// Placeholder colors/gradients for photo blocks until real images are provided
const PHOTO_PLACEHOLDERS = [
    "bg-gradient-to-br from-neon-purple to-neon-blue",
    "bg-gradient-to-br from-neon-green to-emerald-600",
    "bg-gradient-to-br from-neon-yellow to-orange-500",
    "bg-zinc-800 border border-white/20",
];

interface BlockData {
    id: number;
    x: number;
    y: number;
    zOffset: number;
    rotation: number;
    color: string;
    size: number;
}

const PhotoBlock = ({ block, time }: { block: BlockData; time: MotionValue<number> }) => {
    // Continuous movement towards viewer
    const z = useTransform(time, (t) => {
        // Loop every 2000ms equivalent of distance
        // Speed = 0.5 units/ms -> 1000 units in 2000ms
        const speed = 0.2;
        const loopDist = 2000;
        const currentZ = (block.zOffset + t * speed) % loopDist;
        return currentZ;
    });

    const scale = useTransform(z, [0, 2000], [0, 1.5]);
    const opacity = useTransform(z, [0, 1500, 2000], [0, 1, 0]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: `calc(50% + ${block.x}px)`,
                top: `calc(50% + ${block.y}px)`,
                width: block.size,
                height: block.size,
                scale,
                opacity,
                rotate: block.rotation,
                zIndex: z, // rough z-sorting
            }}
            className={`absolute rounded-sm shadow-lg ${block.color}`}
        />
    );
};

export default function Slide1_Wormhole({ onComplete }: { onComplete: () => void }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [showText, setShowText] = useState(true);

    // Physics: Time-based acceleration
    const time = useTime();
    const tunnelRotation = useTransform(time, (t) => t * 0.02);

    // Generate random positions for photo blocks
    const photoBlocks = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            // Spread widely on x/y
            x: (Math.random() - 0.5) * 600, // Wider spread
            y: (Math.random() - 0.5) * 800,
            // Staggered depth
            zOffset: i * (2000 / 30),
            rotation: (Math.random() - 0.5) * 45,
            color: PHOTO_PLACEHOLDERS[i % PHOTO_PLACEHOLDERS.length],
            size: 40 + Math.random() * 60 // Larger sizes
        }));
    }, []);

    // --- Text Sequence Control ---
    useEffect(() => {
        let currentStep = 0;
        let timeoutId: NodeJS.Timeout;

        const runSequence = () => {
            if (currentStep < DATA.words.length) {
                setWordIndex(currentStep);
                const duration = DATA.timings[currentStep];
                currentStep++;
                timeoutId = setTimeout(runSequence, duration);
            } else {
                // Sequence complete, trigger exit
                setShowText(false);
                setTimeout(onComplete, 1000);
            }
        };

        // Start after a brief delay
        timeoutId = setTimeout(runSequence, 500);

        return () => clearTimeout(timeoutId);
    }, [onComplete]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black perspective-[1000px]">
            {/* Tunnel Effect */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ rotate: tunnelRotation }}
            >
                {photoBlocks.map(block => (
                    <PhotoBlock key={block.id} block={block} time={time} />
                ))}
            </motion.div>

            {/* Text Overlay */}
            <AnimatePresence mode="wait">
                {showText && (
                    <motion.div
                        key={wordIndex}
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mix-blend-difference text-center">
                            {DATA.words[wordIndex]}
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
