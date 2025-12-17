"use client";

import { motion } from 'framer-motion';

export default function Slide8_Fandom({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-6">

            {/* --- STAR RATING --- */}
            <div className="flex items-center gap-2 mb-16">
                {[1, 2, 3, 4, 5].map((star, i) => (
                    <div key={i} className="relative w-8 h-8 md:w-12 md:h-12">
                        {/* Empty Star Stroke */}
                        <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-[#4a7aff] fill-none stroke-current stroke-2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                        {/* Filled Star Animation */}
                        <motion.div
                            initial={{ clipPath: 'inset(100% 0 0 0)' }}
                            animate={{ clipPath: i === 4 ? 'inset(30% 0 0 0)' : 'inset(0% 0 0 0)' }} // Last star 70% filled
                            transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
                            className="absolute inset-0 bg-[#4a7aff]"
                            style={{ clipPath: 'inset(100% 0 0 0)' }} // Initial state
                        >
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#0a0a0a] fill-current">
                                <rect width="24" height="24" /> {/* Masking trick or just use fill? Better to use SVG fill */}
                            </svg>
                            {/* Better approach: Just render filled SVG clipped */}
                        </motion.div>
                        {/* Re-doing fill logic for simplicity */}
                        <motion.svg
                            viewBox="0 0 24 24"
                            className="absolute inset-0 w-full h-full text-[#4a7aff] fill-current"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.15, type: "spring" }}
                            style={{
                                clipPath: i === 4 ? 'inset(0 30% 0 0)' : 'none' // Clip right side for partial fill
                            }}
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </motion.svg>
                    </div>
                ))}
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="text-2xl md:text-4xl font-medium text-[#4a7aff] ml-4"
                >
                    4.7/5
                </motion.span>
            </div>

            {/* --- INSTITUTIONAL BADGE --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-sm bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#3a3a3a] rounded-xl p-8 text-center shadow-2xl"
            >
                <h1 className="text-8xl md:text-9xl font-black text-white mb-2 leading-none">63%</h1>
                <p className="text-xl md:text-2xl text-[#b0b0b0] font-normal mb-2">repeat invite rate</p>
                <p className="text-sm md:text-base text-[#7a7a7a] font-light">
                    Institutions invited LearnApart back
                </p>
            </motion.div>

            {/* --- HOVER/TAP REVEAL (List) --- */}
            <div className="mt-8 text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] text-[#5a5a5a] max-w-xs mx-auto leading-relaxed">
                    IIT Madras, BITS Pilani, NIT Warangal, VIT Vellore, SRM,
                    Amrita, JNTU, Osmania, DTU, IIIT Hyderabad...
                </p>
            </div>

        </div>
    );
}
