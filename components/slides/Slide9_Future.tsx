"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";
import { Crosshair, Target } from "lucide-react";

export default function Slide9_Future({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "future_targets")?.data || { target_students: 0, target_year: 2026, target_workshops: 0 };
    if (!slideData) console.error("Slide 9 data missing");
    const [locked, setLocked] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // Scanning
            await controls.start("scan");
            // Lock on
            setLocked(true);
            await controls.start("lock");
            setTimeout(onComplete, 6000);
        };
        sequence();
    }, [controls, onComplete]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-deep-void overflow-hidden">
            {/* HUD Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            {/* Scanning Line */}
            <motion.div
                className="absolute inset-x-0 h-1 bg-neon-green/50 shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Target Reticle */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={controls}
                variants={{
                    scan: { scale: 1.2, opacity: 0.5 },
                    lock: { scale: 1, opacity: 1, transition: { ...physics.heavy } as any }
                }}
            >
                <div className="relative p-12 border-2 border-neon-green rounded-lg bg-black/80 backdrop-blur-md">
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-neon-green -mt-1 -ml-1" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-neon-green -mt-1 -mr-1" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-neon-green -mb-1 -ml-1" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-neon-green -mb-1 -mr-1" />

                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-neon-green mb-4 animate-pulse">
                            <Target size={24} />
                            <span className="uppercase tracking-widest font-mono">Target Locked</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black text-white font-mono tracking-tighter">
                            {slideData?.target_students?.toLocaleString()}
                        </h2>
                        <p className="text-xl text-gray-400 uppercase tracking-widest mt-2 font-mono">
                            Students in {slideData?.target_year}
                        </p>
                    </div>
                </div>

                {/* Focus Area */}
                {locked && (
                    <motion.div
                        className="absolute -bottom-32 flex items-center gap-4 bg-neon-green/10 border border-neon-green px-6 py-3 rounded"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Crosshair className="text-neon-green" />
                        <div className="text-neon-green font-mono uppercase">
                            Target Workshops: <span className="font-bold text-white">{slideData?.target_workshops}</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
