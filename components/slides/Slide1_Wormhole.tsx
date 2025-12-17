"use client";

import { motion, useTime, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// --- CONFIGURATION ---
const CITIES = [
    "HYDERABAD", "BANGALORE", "DELHI", "MUMBAI", "CHENNAI",
    "PUNE", "WARANGAL", "VIZAG", "MYSORE", "NOIDA"
];

const SNIPPETS = [
    "npm run dev", "git push origin", "ERROR: 404", "SUCCESS",
    "await fetch()", "console.log()", "sudo rm -rf", "init_sequence"
];

export default function Slide1_Wormhole({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'accel' | 'impact' | 'hold'>('accel');
    const time = useTime();

    // Sequence Timer
    useEffect(() => {
        const t1 = setTimeout(() => setPhase('impact'), 2000); // 2s accel
        const t2 = setTimeout(() => setPhase('hold'), 2100);   // 100ms flash
        const t3 = setTimeout(onComplete, 6000);               // End after 6s
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    // --- 3D Tunnel Elements ---
    const tunnelItems = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            text: i % 2 === 0 ? CITIES[i % CITIES.length] : SNIPPETS[i % SNIPPETS.length],
            angle: (i * 137.5) * (Math.PI / 180), // Golden angle distribution
            radius: 300 + Math.random() * 200,
            delay: i * 0.05
        }));
    }, []);

    // Speed Control: 0-2s = Exponential Accel
    const zSpeed = useTransform(time, [0, 2000], [2000, 15000]);

    // Shake Effect (Active during impact)
    const shake = useTransform(time, (t) => {
        if (t > 2000 && t < 2300) return Math.sin(t * 0.5) * 20; // Violent shake
        return 0;
    });

    return (
        <div className="relative w-full h-full overflow-hidden bg-black perspective-[500px]">

            {/* --- TUNNEL CONTAINER --- */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center transform-style-3d"
                style={{ x: shake, y: shake }}
            >
                {/* Tunnel Rings */}
                {phase !== 'hold' && tunnelItems.map((item) => (
                    <TunnelItem
                        key={item.id}
                        item={item}
                        time={time}
                        speed={zSpeed}
                    />
                ))}
            </motion.div>

            {/* --- IMPACT FLASH --- */}
            <AnimatePresence>
                {phase === 'impact' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute inset-0 bg-white z-50 mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            {/* --- HERO TEXT --- */}
            {phase !== 'accel' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
                    <motion.h1
                        initial={{ scale: 5, opacity: 0, filter: 'blur(20px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                        className="text-8xl md:text-[10rem] font-black text-white tracking-tighter leading-none text-center mix-blend-difference"
                        style={{ fontFamily: 'var(--font-inter)' }} // Using Inter Black for impact
                    >
                        2025
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                    >
                        <h2
                            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue tracking-widest"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            WAS UNREAL
                        </h2>
                    </motion.div>

                    {/* Glitch Overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-50"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        style={{
                            backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                            backgroundSize: '200px 200px'
                        }}
                    />
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENT: Tunnel Item ---
function TunnelItem({ item, time, speed }: { item: any, time: any, speed: any }) {
    const z = useTransform(time, (t) => {
        // Loop z from 1000 (far) to -500 (behind camera)
        const currentSpeed = speed.get();
        const distance = (t * (currentSpeed / 1000) + item.delay * 1000) % 2000;
        return 1000 - distance;
    });

    const opacity = useTransform(z, [500, 0, -200], [0, 1, 0]);
    const scale = useTransform(z, [1000, 0], [0, 2]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                x: Math.cos(item.angle) * item.radius,
                y: Math.sin(item.angle) * item.radius,
                z: z,
                opacity,
                scale,
                rotateZ: item.angle * (180 / Math.PI) + 90
            }}
            className="text-neon-blue/50 font-mono text-sm whitespace-nowrap"
        >
            {item.text}
        </motion.div>
    );
}
