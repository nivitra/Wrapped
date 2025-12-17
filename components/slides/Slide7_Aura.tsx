"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- CONFIGURATION ---
const QUOTES = [
    { text: "I didn't know I could build this.", author: "Raj, VIT" },
    { text: "First time my code touched a real API.", author: "Priya, NIT Warangal" },
    { text: "The workshop didn't end at 5 PM.", author: "Aman, DTU" }
];

export default function Slide7_Aura({ onComplete }: { onComplete: () => void }) {
    const [quoteIndex, setQuoteIndex] = useState(0);

    // Rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- MORPHING BLOBS --- */}
            <div className="relative w-full h-[50vh] flex items-center justify-center">
                {/* Left Blob (Consumer) - Fades out */}
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute w-64 h-64 bg-[#3a3a3a] rounded-full blur-3xl"
                />

                {/* Right Blob (Builder) - Fades in & Glows */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute w-64 h-64 bg-[#4a7aff] rounded-full blur-[60px] opacity-40"
                />
            </div>

            {/* --- STATS OVERLAY --- */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-7xl md:text-9xl font-black text-[#4a7aff] leading-none">82%</h1>
                    <p className="text-lg md:text-2xl text-[#b0b0b0] font-normal">+ built first project</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-7xl md:text-9xl font-black text-[#4a7aff] leading-none">64%</h1>
                    <p className="text-lg md:text-2xl text-[#b0b0b0] font-normal">+ first-time AI experience</p>
                </motion.div>
            </div>

            {/* --- QUOTES CAROUSEL --- */}
            <div className="absolute bottom-24 w-full px-6 text-center h-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={quoteIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-lg md:text-xl text-[#7a7a7a] italic mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                            &quot;{QUOTES[quoteIndex].text}&quot;
                        </p>
                        <p className="text-sm text-[#5a5a5a] font-medium">
                            — {QUOTES[quoteIndex].author}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- FOOTER --- */}
            <div className="absolute bottom-8 text-[#5a5a5a] text-[10px]">
                n=4860, verified post-workshop submissions
            </div>

        </div>
    );
}
