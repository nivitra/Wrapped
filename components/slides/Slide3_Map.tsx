"use client";

import { motion, useAnimation, useTime, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";
import { MapPin } from "lucide-react";

// Approximate relative coordinates for South India cities (0-100 scale)
const cities = [
    { name: "Hyderabad", x: 50, y: 20, isCapital: true },
    { name: "Bangalore", x: 45, y: 60 },
    { name: "Chennai", x: 70, y: 55 },
    { name: "Kochi", x: 30, y: 80 },
    { name: "Coimbatore", x: 40, y: 70 },
    { name: "Vizag", x: 80, y: 30 },
    { name: "Vijayawada", x: 60, y: 35 },
    { name: "Mysore", x: 40, y: 65 },
    { name: "Trivandrum", x: 35, y: 90 },
    { name: "Madurai", x: 45, y: 85 },
];

// --- 1. Custom Hook for Path Drawing ---
const usePathDrawer = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2, ease: "easeInOut" }
        });
    }, [controls]);

    return controls;
};

export default function Slide3_Map({ onComplete }: { onComplete: () => void }) {
    const slideData = wrappedData.slides.find(s => s.id === "geographic_reach")?.data as any;
    const pathControls = usePathDrawer();
    const time = useTime();
    const pulse = useTransform(time, (t) => 1 + Math.sin(t * 0.005) * 0.2);

    useEffect(() => {
        const timer = setTimeout(onComplete, 8000); // Longer duration for map exploration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-deep-void overflow-hidden">

            {/* --- LAYER A: HEADER --- */}
            <motion.div
                className="absolute top-12 z-20 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="text-xs font-mono text-neon-green border border-neon-green/30 px-3 py-1 rounded-full inline-block mb-2">
                    GEOGRAPHIC REACH
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                    Inevitable <span className="text-neon-green">Growth</span>
                </h2>
            </motion.div>

            {/* --- LAYER B: SVG MAP CONTAINER --- */}
            <div className="relative w-full max-w-2xl aspect-square">
                {/* Map Background Shape */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 20 10 L 80 10 L 90 90 L 10 90 Z" // Abstract South India shape
                            fill="none"
                            stroke="#333"
                            strokeWidth="0.5"
                        />
                    </svg>
                </div>

                {/* Connecting Lines (The "Laser" Network) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0, 255, 0, 0)" />
                            <stop offset="50%" stopColor="rgba(0, 255, 0, 0.5)" />
                            <stop offset="100%" stopColor="rgba(0, 255, 0, 0)" />
                        </linearGradient>
                    </defs>
                    {cities.map((city, i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1="50%"
                            y1="20%" // Originating from Hyderabad (approx)
                            x2={`${city.x}%`}
                            y2={`${city.y}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={pathControls}
                            transition={{ delay: i * 0.1, duration: 1.5, ease: "easeOut" }}
                        />
                    ))}
                </svg>

                {/* --- LAYER C: CITY NODES --- */}
                {cities.map((city, i) => (
                    <div key={i} className="absolute z-20" style={{ left: `${city.x}%`, top: `${city.y}%` }}>
                        {/* Pulse Effect for Capital/Hub */}
                        {city.isCapital && (
                            <motion.div
                                className="absolute -inset-4 bg-neon-green/20 rounded-full blur-md"
                                style={{ scale: pulse }}
                            />
                        )}

                        {/* The Node Dot */}
                        <motion.div
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_15px_rgba(0,255,0,0.5)] -translate-x-1/2 -translate-y-1/2 ${city.isCapital ? 'bg-white border-2 border-neon-green' : 'bg-neon-green'}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + 0.5, type: "spring", stiffness: 300, damping: 20 }}
                        />

                        {/* City Label */}
                        <motion.div
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-mono whitespace-nowrap pointer-events-none"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.8 }}
                        >
                            <span className={`${city.isCapital ? 'text-white font-bold text-sm' : 'text-gray-400'}`}>
                                {city.name}
                            </span>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* --- LAYER D: FOOTER IMPACT --- */}
            <motion.div
                className="absolute bottom-20 z-20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, ...physics.heavy } as any}
            >
                <div className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                    {slideData?.cities_reached}
                </div>
                <div className="text-xl text-gray-400 uppercase tracking-widest font-bold">
                    Cities Conquered
                </div>
            </motion.div>
        </div>
    );
}
