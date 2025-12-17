"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";

export default function Slide6_Projects({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "output")?.data;
    const [count, setCount] = useState(0);
    const [blocks, setBlocks] = useState<{ delay: number }[]>([]);
    const springValue = useSpring(0, physics.heavy);
    const displayValue = useTransform(springValue, (value) => Math.floor(value));

    useEffect(() => {
        setBlocks(Array.from({ length: 40 }).map(() => ({
            delay: Math.random() * 2
        })));
    }, []);

    useEffect(() => {
        if (slideData) {
            springValue.set(slideData.projects_built || 0);
        }
        const unsubscribe = displayValue.on("change", (latest) => setCount(latest));
        const timer = setTimeout(onComplete, 6000);
        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, [springValue, displayValue, onComplete, slideData]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-20 bg-deep-void overflow-hidden">
            {/* Tetris Blocks Stack */}
            <div className="absolute inset-0 flex items-end justify-center opacity-50">
                <div className="flex flex-wrap-reverse justify-center w-full max-w-2xl gap-1">
                    {blocks.map((b, i) => (
                        <motion.div
                            key={i}
                            className="w-8 h-8 md:w-12 md:h-12 border border-neon-blue/50 bg-neon-blue/20 rounded-sm"
                            initial={{ y: -1000, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: b.delay,
                                ease: "circOut"
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Stats */}
            <div className="z-10 text-center mb-20 relative mix-blend-difference">
                <motion.h2
                    className="text-[20vw] font-black text-white mb-2 leading-none tracking-tighter"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...physics.heavy } as any}
                >
                    {count.toLocaleString()}
                </motion.h2>
                <p className="text-xl md:text-3xl text-neon-green uppercase tracking-widest font-bold bg-black/50 px-4 py-2 inline-block backdrop-blur-md">
                    Projects Shipped
                </p>
            </div>

            {/* Overlay Text */}
            <motion.div
                className="absolute top-20 w-full text-center pointer-events-none"
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3, ...physics.heavy } as any}
            >
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic transform -rotate-2 drop-shadow-[0_5px_0_rgba(0,0,0,1)]">
                    NO PASSIVE
                </h3>
                <h3 className="text-4xl md:text-6xl font-black text-neon-purple uppercase italic transform rotate-2 drop-shadow-[0_5px_0_rgba(0,0,0,1)]">
                    OBSERVERS.
                </h3>
            </motion.div>
        </div>
    );
}
