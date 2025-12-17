"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";
import { Star } from "lucide-react";

export default function Slide8_Fandom({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "engagement")?.data || { avg_rating: "0.0", repeat_invite_percent: 0 };
    if (!slideData) console.error("Slide 8 data missing");
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // Stars ignite
            await controls.start("ignite");
            // Stamp impact
            await controls.start("stamp");
            setTimeout(onComplete, 6000);
        };
        sequence();
    }, [controls, onComplete]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-deep-void overflow-hidden">
            {/* Background Pulse */}
            <motion.div
                className="absolute inset-0 bg-neon-yellow/5"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Massive Stars */}
            <div className="flex gap-2 md:gap-4 mb-12 z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={controls}
                        variants={{
                            ignite: {
                                scale: 1,
                                opacity: 1,
                                transition: { delay: i * 0.2, type: "spring", stiffness: 300, damping: 20, mass: 1.5 }
                            }
                        }}
                    >
                        <Star
                            size={window.innerWidth < 768 ? 40 : 80}
                            className="fill-neon-yellow text-neon-yellow drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Rating Stamp */}
            <motion.div
                className="z-20 relative"
                initial={{ scale: 3, opacity: 0, rotate: -15 }}
                animate={controls}
                variants={{
                    stamp: {
                        scale: 1,
                        opacity: 1,
                        rotate: -5,
                        transition: { delay: 1.5, type: "spring", stiffness: 300, damping: 20, mass: 1.5 }
                    }
                }}
            >
                <div className="border-8 border-white p-4 md:p-8 rounded-lg bg-black/50 backdrop-blur-sm transform rotate-[-5deg]">
                    <h2 className="text-8xl md:text-[10rem] font-black text-white leading-none tracking-tighter">
                        {slideData?.avg_rating}
                    </h2>
                    <p className="text-xl md:text-3xl text-center text-white font-bold uppercase tracking-widest mt-2">
                        Average Rating
                    </p>
                </div>
            </motion.div>

            {/* Repeat Invites */}
            <motion.div
                className="absolute bottom-20 flex items-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <div className="text-neon-green text-4xl font-black">{slideData?.repeat_invite_percent}%</div>
                <div className="text-gray-400 text-sm uppercase tracking-widest">Repeat Invites</div>
            </motion.div>
        </div>
    );
}
