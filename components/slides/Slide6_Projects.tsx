"use client";

import { motion, useTime, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

// --- CONFIGURATION ---
const BUZZWORDS = [
    "RAG Pipeline", "Autonomous Agent", "DeFi Bot", "Vision AI", "Legal LLM",
    "Voice Clone", "Code Gen", "Sales Auto", "HR Screener", "Edu-Tutor",
    "Agri-Drone", "Space-Sim", "Crypto-Arb", "Med-Diagnosis", "Content-Engine",
    "Fraud Detect", "Traffic Opt", "Supply Chain", "Personal Stylist", "Music Gen",
    "Video Synth", "3D Asset Gen", "Game NPC", "Chatbot", "Search Engine",
    "Recommendation", "Sentiment Analysis", "Predictive Maint", "Robotics", "IoT Swarm",
    "Smart Home", "Energy Grid", "Climate Model", "Bio-Folding", "Drug Discovery",
    "Material Science", "Quantum Sim", "Cyber Defense", "Phishing Detect", "Deepfake Spotter"
];

export default function Slide6_Projects({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'flood' | 'impact'>('flood');

    useEffect(() => {
        const timer = setTimeout(() => setPhase('impact'), 2500); // Flood for 2.5s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">

            {/* --- FLOOD BACKGROUND --- */}
            <div className={`absolute inset-0 overflow-hidden flex flex-col justify-center transition-opacity duration-500 ${phase === 'impact' ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                {/* Multiple scrolling rows with different speeds/directions */}
                <FloodRow words={BUZZWORDS.slice(0, 10)} speed={20} direction={1} />
                <FloodRow words={BUZZWORDS.slice(10, 20)} speed={30} direction={-1} />
                <FloodRow words={BUZZWORDS.slice(20, 30)} speed={25} direction={1} />
                <FloodRow words={BUZZWORDS.slice(30, 40)} speed={35} direction={-1} />
                <FloodRow words={BUZZWORDS.slice(0, 10)} speed={15} direction={1} />
                <FloodRow words={BUZZWORDS.slice(10, 20)} speed={40} direction={-1} />
                <FloodRow words={BUZZWORDS.slice(20, 30)} speed={22} direction={1} />
            </div>

            {/* --- IMPACT REVEAL --- */}
            {phase === 'impact' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    {/* Shockwave Flash */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white mix-blend-overlay"
                    />

                    <motion.h1
                        initial={{ scale: 5, opacity: 0, filter: 'blur(20px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-[20vw] md:text-[15rem] font-black text-white tracking-tighter leading-none mix-blend-difference"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        1,340+
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 md:mt-8 flex flex-col items-center"
                    >
                        <span
                            className="text-2xl md:text-5xl font-bold text-white uppercase tracking-widest"
                            style={{
                                fontFamily: 'var(--font-playfair)',
                                textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
                            }}
                        >
                            Projects Shipped
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-[3px] bg-white mt-4 rounded-full"
                            style={{ boxShadow: '0 0 20px rgba(255,255,255,0.8)' }}
                        />
                    </motion.div>

                    {/* Completion Badge (Re-integrated) */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-12 right-6 md:top-24 md:right-24 bg-[#0a0a0a]/80 border border-[#4a7aff] rounded-xl px-4 py-2 backdrop-blur-md"
                    >
                        <span className="text-[#4a7aff] font-bold text-xl md:text-2xl">74% Completion</span>
                    </motion.div>
                </div>
            )}

        </div>
    );
}

function FloodRow({ words, speed, direction }: { words: string[], speed: number, direction: number }) {
    const time = useTime();
    const x = useTransform(time, (t) => {
        const distance = (t / 1000) * speed * 10; // Base speed multiplier
        return direction === 1 ? -distance % 1000 : (distance % 1000) - 1000;
    });

    return (
        <div className="flex overflow-hidden whitespace-nowrap opacity-50 my-2 md:my-4">
            <motion.div style={{ x }} className="flex gap-8 md:gap-16">
                {/* Repeat words enough times to fill screen + buffer */}
                {[...words, ...words, ...words, ...words].map((word, i) => (
                    <span
                        key={i}
                        className={`text-2xl md:text-6xl font-bold uppercase tracking-tighter ${i % 3 === 0 ? 'text-white' : 'text-[#333]'}`}
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        {word}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
