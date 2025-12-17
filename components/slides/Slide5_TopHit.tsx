"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";
import { Zap, Camera, Star } from "lucide-react";

export default function Slide5_TopHit({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "top_workshop")?.data;
    const [isFlipped, setIsFlipped] = useState(false);
    const [confetti, setConfetti] = useState<{ x: number; duration: number }[]>([]);
    const controls = useAnimation();

    useEffect(() => {
        setConfetti(Array.from({ length: 50 }).map(() => ({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            duration: 2 + Math.random()
        })));
    }, []);

    useEffect(() => {
        const sequence = async () => {
            // Drop
            await controls.start("drop");
            // Wait a beat
            await new Promise(r => setTimeout(r, 500));
            // Flip
            setIsFlipped(true);
            setTimeout(onComplete, 6000);
        };
        sequence();
    }, [controls, onComplete]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-deep-void overflow-hidden perspective-[1000px]">
            {/* Confetti Rain (Hidden initially) */}
            {isFlipped && (
                <div className="absolute inset-0 pointer-events-none">
                    {confetti.map((c, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-neon-yellow"
                            initial={{ y: -100, x: c.x, rotate: 0 }}
                            animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, rotate: 360 }}
                            transition={{ duration: c.duration, ease: "linear" }}
                        >
                            <Zap size={20} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* 3D Card Container */}
            <motion.div
                className="relative w-72 h-96 cursor-pointer preserve-3d"
                variants={{
                    drop: { y: [-1000, 0], scale: [0.5, 1] }
                }}
                initial={{ y: -1000 }}
                animate={controls}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1.5 }} // Heavy thud
                style={{ transformStyle: "preserve-3d" }}
            >
                <motion.div
                    className="w-full h-full relative transition-all duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front Face (Vinyl Cover Style) */}
                    <div className="absolute inset-0 backface-hidden bg-black border border-white/20 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="w-full aspect-square bg-gradient-to-br from-neon-purple to-neon-blue rounded-full animate-spin-slow flex items-center justify-center mb-6">
                            <div className="w-1/3 h-1/3 bg-black rounded-full" />
                        </div>
                        <h2 className="text-2xl font-black text-white text-center leading-tight uppercase">
                            {slideData?.title}
                        </h2>
                        <div className="mt-4 text-gray-400 text-sm tracking-widest uppercase">
                            Top Workshop
                        </div>

                        {/* Specular Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Back Face (Stats) */}
                    <div
                        className="absolute inset-0 backface-hidden bg-white rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 rotate-y-180"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex items-center justify-between border-b border-black/10 pb-4">
                                <div className="flex items-center gap-2 text-black font-bold">
                                    <Star className="text-neon-yellow fill-neon-yellow" />
                                    Rating
                                </div>
                                <div className="text-3xl font-black text-black">{slideData?.rating}</div>
                            </div>

                            <div className="flex items-center justify-between border-b border-black/10 pb-4">
                                <div className="flex items-center gap-2 text-black font-bold">
                                    <Camera className="text-black" />
                                    Photos
                                </div>
                                <div className="text-3xl font-black text-black">{slideData?.photos_count}</div>
                            </div>

                            <div className="text-center mt-2">
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Location</div>
                                <div className="text-xl font-black text-black uppercase">{slideData?.city}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
