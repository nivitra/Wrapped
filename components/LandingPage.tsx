"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Zap, Globe } from "lucide-react";
import WorkshopsSection from "./WorkshopsSection";

export default function LandingPage({ onOpenSlides }: { onOpenSlides: () => void }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-purple selection:text-white overflow-x-hidden font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/50 border-b border-white/10">
                <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    METEOROID
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Workshops</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                </div>
                <button
                    onClick={onOpenSlides}
                    className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors"
                >
                    Launch 2025
                </button>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[128px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        v2.0 is live
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                        THE FUTURE IS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue">
                            ALREADY HERE
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Experience the next generation of digital storytelling.
                        Immersive, reactive, and infinitely scalable.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={onOpenSlides}
                            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2"
                        >
                            Start Experience
                            <Play size={20} className="fill-current" />
                            <div className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-ping opacity-20" />
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                            Read Documentation
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-32 px-6 border-t border-white/5 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Built on the edge for zero-latency interactions." },
                            { icon: Star, title: "Premium Design", desc: "Crafted with obsession for every pixel and animation." },
                            { icon: Globe, title: "Global Scale", desc: "Deploy instantly to 35+ regions worldwide." }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <feature.icon size={32} className="text-neon-purple mb-6" />
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workshops Section */}
            <WorkshopsSection />

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center text-zinc-600 text-sm">
                <p>© 2025 Meteoroid Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
