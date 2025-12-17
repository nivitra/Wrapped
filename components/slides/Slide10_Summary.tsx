"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedData } from "@/data/wrappedData";
import { physics } from "@/utils/physics";
import { Share2, RotateCcw } from "lucide-react";

export default function Slide10_Summary({ onComplete }: { onComplete: () => void }) {
    const [showActions, setShowActions] = useState(false);

    // Helper to safely access data with fallback
    const getData = (id: string) => (wrappedData.slides.find(s => s.id === id)?.data || {}) as any;
    const hookData = getData("hook");
    const scaleData = getData("scale");
    const mapData = getData("geographic_reach");
    const fandomData = getData("engagement");
    const auraData = getData("transformation");

    useEffect(() => {
        const timer = setTimeout(() => setShowActions(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-deep-void overflow-hidden p-4">
            {/* Holographic Beam */}
            <motion.div
                className="absolute top-0 w-full h-full bg-gradient-to-b from-neon-blue/20 via-transparent to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
            />

            {/* Summary Card */}
            <motion.div
                className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)]"
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, ...physics.heavy } as any}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-neon-purple to-neon-blue p-6 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        2025 WRAPPED
                    </h2>
                    <p className="text-white/80 text-sm uppercase tracking-widest font-mono">
                        LearnApart Workshop Universe
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Students</div>
                        <div className="text-2xl font-black text-white">{scaleData?.students_taught?.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Cities</div>
                        <div className="text-2xl font-black text-white">{mapData?.cities_reached}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Rating</div>
                        <div className="text-2xl font-black text-neon-yellow">{fandomData?.avg_rating || fandomData?.average_rating}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Builders</div>
                        <div className="text-xl font-black text-neon-purple truncate">{auraData?.first_time_project_builders_percent}%</div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 text-center">
                    <div className="text-neon-green font-mono text-xs uppercase tracking-widest animate-pulse">
            // SYSTEM_OPTIMIZED_FOR_2026
                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            {showActions && (
                <motion.div
                    className="mt-8 flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                        <Share2 size={20} /> Share
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white/20 transition-colors"
                    >
                        <RotateCcw size={20} /> Replay
                    </button>
                </motion.div>
            )}
        </div>
    );
}
