"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Slide1_Wormhole from "./slides/Slide1_Wormhole";
import Slide2_BigNumbers from "./slides/Slide2_BigNumbers";
import Slide3_Map from "./slides/Slide3_Map";
import Slide4_Genres from "./slides/Slide4_Genres";
import Slide5_TopHit from "./slides/Slide5_TopHit";
import Slide6_Projects from "./slides/Slide6_Projects";
import Slide7_Aura from "./slides/Slide7_Aura";
import Slide8_Fandom from "./slides/Slide8_Fandom";
import Slide9_Future from "./slides/Slide9_Future";
import Slide10_Summary from "./slides/Slide10_Summary";

export default function WrappedContainer({ onClose }: { onClose?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % 10);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + 10) % 10);
    }, []);

    const slides = [
        <Slide1_Wormhole key="slide1" onComplete={nextSlide} />,
        <Slide2_BigNumbers key="slide2" onComplete={nextSlide} />,
        <Slide3_Map key="slide3" onComplete={nextSlide} />,
        <Slide4_Genres key="slide4" onComplete={nextSlide} />,
        <Slide5_TopHit key="slide5" onComplete={nextSlide} />,
        <Slide6_Projects key="slide6" onComplete={nextSlide} />,
        <Slide7_Aura key="slide7" onComplete={nextSlide} />,
        <Slide8_Fandom key="slide8" onComplete={nextSlide} />,
        <Slide9_Future key="slide9" onComplete={nextSlide} />,
        <Slide10_Summary key="slide10" onComplete={nextSlide} />,
    ];

    return (
        <div className="w-screen h-[100dvh] bg-deep-void overflow-hidden relative group">
            {/* Global Noise Overlay */}
            <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {slides[currentIndex]}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-0 z-[102] pointer-events-none flex justify-between items-center px-4 md:px-8">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[105] p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer pointer-events-auto"
                >
                    <X size={24} />
                </button>
            )}

            {/* Progress Bar */}
            <div className="absolute top-2 left-0 w-full px-2 flex gap-1 z-[101]">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= currentIndex ? "bg-white" : "bg-white/20"}`}
                    />
                ))}
            </div>
        </div>
    );
}
