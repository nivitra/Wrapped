
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";

export default function Slide4_Genres({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "categories")?.data;
    const controls = useAnimation();

    const [floatingWords, setFloatingWords] = useState<{ text: string; x: number; y: number; z: number; scale: number; targetX: number; targetY: number; rotate: number }[]>([]);

    useEffect(() => {
        if (slideData?.categories) {
            setFloatingWords(slideData.categories
                .filter((c: string) => c !== slideData.primary_category)
                .map((c: string) => ({
                    text: c,
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                    z: (Math.random() - 0.5) * 400,
                    scale: 0.5,
                    targetX: (Math.random() - 0.5) * 1000,
                    targetY: (Math.random() - 0.5) * 1000,
                    rotate: (Math.random() - 0.5) * 45
                }))
            );
        }
    }, [slideData]);

    useEffect(() => {
        const sequence = async () => {
            // Initial drift
            await controls.start("drift");
            // Shockwave entry
            await controls.start("surge");
            setTimeout(onComplete, 5000);
        };
        sequence();
    }, [controls, onComplete]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-deep-void overflow-hidden perspective-[1000px]">
            {/* Background Gradient Shift */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0"
                animate={{ opacity: [0, 0.5, 0.2] }}
                transition={{ delay: 2, duration: 0.5 }} // Sync with surge
            />

            {/* Floating Background Words */}
            {floatingWords.map((word, i) => (
                <motion.div
                    key={word.text}
                    className="absolute text-4xl font-bold text-gray-700 opacity-30 whitespace-nowrap"
                    initial={{
                        x: word.x,
                        y: word.y,
                        z: word.z,
                        scale: word.scale
                    }}
                    animate={{
                        x: word.targetX,
                        y: word.targetY,
                        rotate: word.rotate,
                        opacity: [0.3, 0], // Fade out on shockwave
                    }}
                    transition={{ duration: 4, delay: 2 }} // Drift away when main text hits
                >
                    {word.text}
                </motion.div>
            ))}

            {/* Main Kinetic Typography */}
            <motion.div
                className="z-10 relative text-center"
                initial={{ scale: 0, z: -1000, opacity: 0 }}
                animate={{ scale: 1, z: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1.5, delay: 2 }} // Heavy impact
            >
                <h1 className="text-[12vw] font-black text-white leading-[0.8] tracking-tighter mix-blend-screen drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                    AI &<br />
                    <span className="text-neon-blue">AUTO</span><br />
                    MATION
                </h1>
            </motion.div>

            {/* Shockwave Rings */}
            <motion.div
                className="absolute rounded-full border-4 border-neon-blue"
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: "200vw", height: "200vw", opacity: 0 }}
                transition={{ delay: 2, duration: 1, ease: "circOut" }}
            />
        </div>
    );
}

