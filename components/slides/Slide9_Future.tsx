"use client";

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

const CURRENT_METRICS = {
    builders: 4860,
    projects: 1340,
    clubs: 15,
    cities: 11,
};

const TARGET_METRICS = {
    builders: 20000,
    projects: 5000,
    clubs: 1000,
    cities: 40,
};

const STRATEGIC_PILLARS = [
    {
        id: 'verticals',
        title: 'Building Verticals',
        description: 'AI Agents, Full Stack, No-Code, Python',
        icon: '🏗️',
        status: 'active',
    },
    {
        id: 'community',
        title: 'Community Leverage',
        description: 'Student-led growth engine',
        icon: '👥',
        status: 'active',
    },
    {
        id: 'clubs',
        title: '1000+ Club Network',
        description: 'Campus partnerships at scale',
        icon: '🎯',
        status: 'target',
    },
];

const TRACTION_SIGNALS = [
    { label: 'Active Pilots', value: '8+', sublabel: 'Running' },
    { label: 'Club Inquiries', value: '50+', sublabel: 'Pipeline' },
    { label: 'Repeat Rate', value: '63%', sublabel: 'Retention' },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide9_Future({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'pillars' | 'product' | 'projection' | 'final'>('intro');

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 500));
            setPhase('pillars');
            await new Promise(r => setTimeout(r, 1500));
            setPhase('product');
            await new Promise(r => setTimeout(r, 1500));
            setPhase('projection');
            await new Promise(r => setTimeout(r, 1500));
            setPhase('final');
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#030303] flex flex-col items-center justify-center p-4 md:p-6">

            {/* =================================================================== */}
            {/* BACKGROUND */}
            {/* =================================================================== */}
            <BackgroundGrid phase={phase} />

            {/* =================================================================== */}
            {/* HEADER */}
            {/* =================================================================== */}
            <motion.div
                className="absolute top-4 md:top-8 left-0 right-0 text-center z-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30">
                    {phase === 'intro' ? 'Loading...' :
                        phase === 'pillars' ? 'Strategic Pillars' :
                            phase === 'product' ? 'The Vehicle' :
                                'Growth Trajectory'}
                </span>
            </motion.div>

            {/* =================================================================== */}
            {/* MAIN CONTENT AREA */}
            {/* =================================================================== */}
            <div className="relative z-30 w-full max-w-2xl">

                {/* --- STRATEGIC PILLARS --- */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase !== 'intro' ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                        {STRATEGIC_PILLARS.map((pillar, i) => (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{
                                    opacity: phase !== 'intro' ? 1 : 0,
                                    y: phase !== 'intro' ? 0 : 20,
                                    scale: phase !== 'intro' ? 1 : 0.9
                                }}
                                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                                className="relative rounded-xl p-3 md:p-4 text-center overflow-hidden"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: pillar.status === 'target'
                                        ? '1px solid rgba(0,255,157,0.3)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                {/* Target Glow */}
                                {pillar.status === 'target' && (
                                    <motion.div
                                        className="absolute inset-0 rounded-xl"
                                        animate={{
                                            boxShadow: ['0 0 20px rgba(0,255,157,0.1)', '0 0 40px rgba(0,255,157,0.2)', '0 0 20px rgba(0,255,157,0.1)']
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}

                                <span className="text-2xl md:text-3xl mb-2 block">{pillar.icon}</span>
                                <h3 className="text-xs md:text-sm font-bold text-white mb-1">{pillar.title}</h3>
                                <p className="text-[9px] md:text-[10px] text-white/40 leading-tight">{pillar.description}</p>

                                {pillar.status === 'active' && (
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00ff9d]" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- PROJECT VISHWAKARMA --- */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: phase === 'product' || phase === 'projection' || phase === 'final' ? 1 : 0,
                        scale: phase === 'product' || phase === 'projection' || phase === 'final' ? 1 : 0.95
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <div
                        className="relative rounded-2xl p-6 md:p-8 text-center overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(74,122,255,0.1) 0%, rgba(0,255,157,0.05) 100%)',
                            border: '1px solid rgba(74,122,255,0.2)',
                        }}
                    >
                        {/* Glow Effect */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{
                                boxShadow: phase === 'product'
                                    ? ['0 0 60px rgba(74,122,255,0.2)', '0 0 80px rgba(74,122,255,0.3)', '0 0 60px rgba(74,122,255,0.2)']
                                    : '0 0 40px rgba(74,122,255,0.1)'
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-3 py-1 rounded-full mb-4"
                            style={{
                                background: 'rgba(74,122,255,0.2)',
                                border: '1px solid rgba(74,122,255,0.3)',
                            }}
                        >
                            <span className="text-[10px] text-[#4a7aff] uppercase tracking-wider font-bold">
                                Single Product Agenda
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h2
                            className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            Project <span className="text-[#4a7aff]">Vishwa</span>karma
                        </h2>

                        {/* Subtitle */}
                        <p className="text-sm md:text-base text-white/50">
                            One platform. Every campus. All builders.
                        </p>

                        {/* Connecting Lines */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gradient-to-b from-transparent to-white/10" />
                    </div>
                </motion.div>

                {/* --- PROJECTION BARS --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: phase === 'projection' || phase === 'final' ? 1 : 0,
                        y: phase === 'projection' || phase === 'final' ? 0 : 20
                    }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    {/* Clubs Target - Main Focus */}
                    <div className="rounded-xl p-4" style={{ background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.15)' }}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-white">Club Partnerships</span>
                            <span className="text-xs text-[#00ff9d] font-bold">🎯 PRIMARY TARGET</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#4a7aff] to-[#00ff9d] rounded-lg"
                                    initial={{ width: 0 }}
                                    animate={{ width: phase === 'projection' || phase === 'final' ? '1.5%' : 0 }}
                                    transition={{ duration: 1 }}
                                    style={{ minWidth: '4px' }}
                                />
                                <motion.div
                                    className="absolute top-0 bottom-0 rounded-lg border-2 border-dashed border-[#00ff9d]/50"
                                    initial={{ width: 0, left: 0 }}
                                    animate={{
                                        width: phase === 'final' ? '100%' : 0,
                                        left: 0
                                    }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    style={{
                                        background: 'repeating-linear-gradient(90deg, rgba(0,255,157,0.08) 0px, rgba(0,255,157,0.08) 6px, transparent 6px, transparent 12px)'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-xs text-white/60">{CURRENT_METRICS.clubs} clubs</span>
                            <motion.span
                                className="text-lg font-black text-[#00ff9d]"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: phase === 'final' ? 1 : 0,
                                    scale: phase === 'final' ? 1 : 0.5
                                }}
                                transition={{ delay: 1, type: 'spring' }}
                            >
                                → {TARGET_METRICS.clubs.toLocaleString()}+ clubs
                            </motion.span>
                        </div>
                    </div>

                    {/* Other Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Builders */}
                        <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <span className="text-[10px] text-white/40 uppercase tracking-wider">Builders</span>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xl font-black text-white">{(CURRENT_METRICS.builders / 1000).toFixed(1)}K</span>
                                <span className="text-xs text-[#00ff9d]">→ {TARGET_METRICS.builders / 1000}K</span>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <span className="text-[10px] text-white/40 uppercase tracking-wider">Projects</span>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xl font-black text-white">{(CURRENT_METRICS.projects / 1000).toFixed(1)}K</span>
                                <span className="text-xs text-[#00ff9d]">→ {TARGET_METRICS.projects / 1000}K</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* =================================================================== */}
            {/* TRACTION SIGNALS - BOTTOM */}
            {/* =================================================================== */}
            <motion.div
                className="absolute bottom-4 md:bottom-8 left-0 right-0 z-40"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: phase === 'final' ? 1 : 0,
                    y: phase === 'final' ? 0 : 20
                }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center justify-center gap-6 md:gap-10">
                    {TRACTION_SIGNALS.map((signal, i) => (
                        <motion.div
                            key={signal.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: phase === 'final' ? 1 : 0,
                                y: phase === 'final' ? 0 : 10
                            }}
                            transition={{ delay: 0.7 + i * 0.15 }}
                            className="text-center"
                        >
                            <div className="text-2xl md:text-3xl font-black text-white">{signal.value}</div>
                            <div className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-wider">
                                {signal.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Credibility Line */}
                <motion.p
                    className="text-center text-[10px] md:text-xs text-white/20 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'final' ? 1 : 0 }}
                    transition={{ delay: 1.2 }}
                >
                    Traction that compounds. Growth that sustains.
                </motion.p>
            </motion.div>
        </div>
    );
}

// =============================================================================
// BACKGROUND GRID
// =============================================================================

function BackgroundGrid({ phase }: { phase: string }) {
    return (
        <>
            {/* Subtle Grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Center Glow */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: phase === 'product' || phase === 'projection' || phase === 'final'
                        ? 'radial-gradient(ellipse at 50% 40%, rgba(74,122,255,0.08) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 40%)',
                }}
                transition={{ duration: 1 }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
                }}
            />
        </>
    );
}
