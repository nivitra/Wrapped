"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

const RING_COUNT = 20;
const PARTICLE_COUNT = 60;
const STAR_COUNT = 100;

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide1_Wormhole({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'warp' | 'flash' | 'reveal'>('warp');
    const [ringProgress, setRingProgress] = useState(0);

    useEffect(() => {
        // Ring expansion animation
        let frame = 0;
        const maxFrames = 60;
        const ringInterval = setInterval(() => {
            frame++;
            setRingProgress(frame / maxFrames);
            if (frame >= maxFrames) {
                clearInterval(ringInterval);
            }
        }, 33);

        // Phase transitions
        const t1 = setTimeout(() => setPhase('flash'), 2500);
        const t2 = setTimeout(() => setPhase('reveal'), 2650);
        const t3 = setTimeout(onComplete, 7000);

        return () => {
            clearInterval(ringInterval);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">

            {/* =================================================================== */}
            {/* LAYER 1: STAR FIELD */}
            {/* =================================================================== */}
            <StarField phase={phase} />

            {/* =================================================================== */}
            {/* LAYER 2: WORMHOLE TUNNEL */}
            {/* =================================================================== */}
            <WormholeTunnel phase={phase} progress={ringProgress} />

            {/* =================================================================== */}
            {/* LAYER 3: PARTICLE STREAMS */}
            {/* =================================================================== */}
            <ParticleStreams phase={phase} />

            {/* =================================================================== */}
            {/* LAYER 4: CENTER VORTEX */}
            {/* =================================================================== */}
            <CenterVortex phase={phase} />

            {/* =================================================================== */}
            {/* LAYER 5: LIGHT RAYS */}
            {/* =================================================================== */}
            <LightRays phase={phase} />

            {/* =================================================================== */}
            {/* IMPACT FLASH */}
            {/* =================================================================== */}
            <AnimatePresence>
                {phase === 'flash' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 bg-white z-50"
                    />
                )}
            </AnimatePresence>

            {/* =================================================================== */}
            {/* HERO TEXT REVEAL */}
            {/* =================================================================== */}
            <AnimatePresence>
                {phase === 'reveal' && (
                    <HeroReveal />
                )}
            </AnimatePresence>

            {/* =================================================================== */}
            {/* CORNER FRAME */}
            {/* =================================================================== */}
            <CornerFrame phase={phase} />
        </div>
    );
}

// =============================================================================
// STAR FIELD - Deep space background
// =============================================================================

function StarField({ phase }: { phase: string }) {
    const stars = useMemo(() =>
        Array.from({ length: STAR_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 0.5 + Math.random() * 2,
            opacity: 0.2 + Math.random() * 0.5,
            speed: 5 + Math.random() * 10,
        }))
        , []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={
                        phase === 'warp'
                            ? {
                                x: ['0vw', '-50vw'],
                                y: ['0vh', '-50vh'],
                                opacity: [star.opacity, 0],
                            }
                            : { opacity: star.opacity * 0.3 }
                    }
                    transition={{
                        duration: star.speed,
                        repeat: phase === 'warp' ? Infinity : 0,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// WORMHOLE TUNNEL - Expanding rings
// =============================================================================

function WormholeTunnel({ phase, progress }: { phase: string; progress: number }) {
    const rings = useMemo(() =>
        Array.from({ length: RING_COUNT }, (_, i) => ({
            id: i,
            delay: i * 0.1,
            baseSize: 50 + i * 40,
            color: i % 3 === 0
                ? 'rgba(74,122,255,0.4)'
                : i % 3 === 1
                    ? 'rgba(0,255,157,0.3)'
                    : 'rgba(139,92,246,0.35)',
        }))
        , []);

    if (phase !== 'warp') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
            {rings.map((ring, i) => {
                const scale = 0.1 + progress * (1 + i * 0.15);
                const opacity = Math.max(0, 1 - (scale / 4));
                const zTranslate = -100 + progress * (i * 50);

                return (
                    <motion.div
                        key={ring.id}
                        className="absolute rounded-full"
                        style={{
                            width: ring.baseSize,
                            height: ring.baseSize,
                            border: `2px solid ${ring.color}`,
                            boxShadow: `0 0 20px ${ring.color}, inset 0 0 20px ${ring.color}`,
                            transform: `scale(${scale}) translateZ(${zTranslate}px)`,
                            opacity,
                        }}
                        animate={{
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                );
            })}
        </div>
    );
}

// =============================================================================
// PARTICLE STREAMS - Flying toward center
// =============================================================================

function ParticleStreams({ phase }: { phase: string }) {
    const particles = useMemo(() =>
        Array.from({ length: PARTICLE_COUNT }, (_, i) => {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            return {
                id: i,
                startX: Math.cos(angle) * distance,
                startY: Math.sin(angle) * distance,
                size: 1 + Math.random() * 3,
                duration: 1 + Math.random() * 1.5,
                delay: Math.random() * 2,
                color: i % 2 === 0 ? '#4a7aff' : '#00ff9d',
            };
        })
        , []);

    if (phase !== 'warp') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        background: particle.color,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                        left: '50%',
                        top: '50%',
                    }}
                    animate={{
                        x: [`${particle.startX}vw`, '0vw'],
                        y: [`${particle.startY}vh`, '0vh'],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeIn',
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// CENTER VORTEX - Glowing center point
// =============================================================================

function CenterVortex({ phase }: { phase: string }) {
    if (phase !== 'warp') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Core glow */}
            <motion.div
                className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(74,122,255,0.4) 40%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Outer pulse */}
            <motion.div
                className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border-2 border-white/20"
                animate={{
                    scale: [0.8, 1.5],
                    opacity: [0.5, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                }}
            />

            {/* Second pulse */}
            <motion.div
                className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-[#4a7aff]/30"
                animate={{
                    scale: [0.8, 1.8],
                    opacity: [0.4, 0],
                }}
                transition={{
                    duration: 1.5,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                }}
            />
        </div>
    );
}

// =============================================================================
// LIGHT RAYS - Emanating from center
// =============================================================================

function LightRays({ phase }: { phase: string }) {
    const rays = useMemo(() =>
        Array.from({ length: 16 }, (_, i) => ({
            id: i,
            angle: (i / 16) * 360,
            length: 150 + Math.random() * 100,
            width: 1 + Math.random(),
            opacity: 0.1 + Math.random() * 0.2,
        }))
        , []);

    if (phase !== 'warp') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {rays.map((ray) => (
                <motion.div
                    key={ray.id}
                    className="absolute origin-center"
                    style={{
                        width: ray.length,
                        height: ray.width,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                        transform: `rotate(${ray.angle}deg) translateX(${ray.length / 2}px)`,
                        opacity: ray.opacity,
                    }}
                    animate={{
                        opacity: [ray.opacity, ray.opacity * 2, ray.opacity],
                        scaleX: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: ray.id * 0.1,
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// HERO REVEAL - The big moment
// =============================================================================

function HeroReveal() {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background subtle glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(74,122,255,0.1) 0%, transparent 50%)',
                }}
            />

            {/* Year - MASSIVE */}
            <motion.h1
                initial={{ scale: 3, opacity: 0, filter: 'blur(30px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-[8rem] md:text-[16rem] font-black text-white leading-none tracking-tighter"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                2025
            </motion.h1>

            {/* Tagline */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="relative"
            >
                {/* Gradient text */}
                <h2
                    className="text-3xl md:text-6xl font-bold tracking-[0.2em] uppercase"
                    style={{
                        fontFamily: 'var(--font-playfair)',
                        background: 'linear-gradient(90deg, #4a7aff 0%, #ffffff 50%, #00ff9d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Was Unreal
                </h2>

                {/* Underline */}
                <motion.div
                    className="h-[2px] md:h-1 bg-gradient-to-r from-[#4a7aff] via-white to-[#00ff9d] mt-4 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                />
            </motion.div>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/40 text-sm md:text-lg uppercase tracking-[0.3em] mt-8"
            >
                LearnApart Wrapped
            </motion.p>
        </motion.div>
    );
}

// =============================================================================
// CORNER FRAME
// =============================================================================

function CornerFrame({ phase }: { phase: string }) {
    if (phase === 'warp') return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 md:top-8 md:left-8"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M0 30V0H30" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.1 }}
                className="absolute top-4 right-4 md:top-8 md:right-8"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M30 30V0H0" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M0 0V30H30" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.3 }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M30 0V30H0" stroke="white" strokeWidth="1" />
                </svg>
            </motion.div>
        </>
    );
}
