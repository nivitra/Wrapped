"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";

export default function Slide7_Aura({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "transformation")?.data || { first_time_project_builders_percent: 0, aura: "Loading..." };
    if (!slideData) console.error("Slide 7 data missing");
    const [particles, setParticles] = useState<{ x: number; y: number; yOffset: number; duration: number }[]>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 20 }).map(() => ({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            yOffset: Math.random() * -100,
            duration: 2 + Math.random() * 3
        })));
    }, []);

    useEffect(() => {
        const timer = setTimeout(onComplete, 6000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-deep-void overflow-hidden">
            {/* Liquid Blobs Background */}
            <div className="absolute inset-0 filter blur-[100px] opacity-70 mix-blend-screen pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Main Content */}
            <div className="z-10 relative text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Transformation Rate</p>
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        {slideData?.first_time_project_builders_percent}%
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="max-w-md mx-auto"
                >
                    <p className="text-xl md:text-2xl text-neon-blue font-light leading-relaxed">
                        First-time Builders
                    </p>
                </motion.div>
            </div>

            {/* Floating Particles */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    initial={{
                        x: p.x,
                        y: p.y,
                    }}
                    animate={{
                        y: [null, p.yOffset],
                        opacity: [0.2, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
