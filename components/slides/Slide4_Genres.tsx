"use client";

import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback } from 'react';

// =============================================================================
// CONFIGURATION
// =============================================================================

interface GenreCard {
    id: string;
    title: string;
    subtitle: string;
    workshopCount: number;
    icon: string;
    description: string;
    color: {
        primary: string;
        secondary: string;
        glow: string;
    };
    highlights: string[];
    isHero?: boolean;
}

const GENRES: GenreCard[] = [
    {
        id: 'ai-agents',
        title: 'AI Agents',
        subtitle: 'The Future of Automation',
        workshopCount: 14,
        icon: '🤖',
        description: 'Building autonomous systems that think, decide, and act',
        color: {
            primary: '#8B5CF6',
            secondary: '#A78BFA',
            glow: 'rgba(139, 92, 246, 0.4)',
        },
        highlights: ['LangChain', 'AutoGPT', 'Multi-Agent Systems', 'Tool Calling'],
        isHero: true,
    },
    {
        id: 'fullstack',
        title: 'Full Stack Web',
        subtitle: 'Core Engineering',
        workshopCount: 3,
        icon: '🌐',
        description: 'End-to-end web development with modern frameworks',
        color: {
            primary: '#3B82F6',
            secondary: '#60A5FA',
            glow: 'rgba(59, 130, 246, 0.4)',
        },
        highlights: ['React', 'Next.js', 'Node.js', 'APIs'],
    },
    {
        id: 'nocode',
        title: 'No-Code',
        subtitle: 'Velocity Track',
        workshopCount: 2,
        icon: '⚡',
        description: 'Ship products without writing a single line of code',
        color: {
            primary: '#10B981',
            secondary: '#34D399',
            glow: 'rgba(16, 185, 129, 0.4)',
        },
        highlights: ['Bubble', 'Webflow', 'Zapier', 'Make'],
    },
    {
        id: 'python',
        title: 'Python for AI',
        subtitle: 'Foundation',
        workshopCount: 2,
        icon: '🐍',
        description: 'Master Python for machine learning and data science',
        color: {
            primary: '#F59E0B',
            secondary: '#FBBF24',
            glow: 'rgba(245, 158, 11, 0.4)',
        },
        highlights: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    },
    {
        id: 'startup',
        title: 'Startup Engineering',
        subtitle: 'Strategy',
        workshopCount: 1,
        icon: '🚀',
        description: 'Build and scale startups from zero to one',
        color: {
            primary: '#EF4444',
            secondary: '#F87171',
            glow: 'rgba(239, 68, 68, 0.4)',
        },
        highlights: ['MVP', 'Product-Market Fit', 'Growth', 'Fundraising'],
    },
];

// Extended list for slot machine spinning (repeat genres for smooth loop)
const SLOT_SEQUENCE = [...GENRES, ...GENRES, ...GENRES, ...GENRES, GENRES[0]];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Slide4_Genres({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'idle' | 'spinning' | 'slowing' | 'landing' | 'reveal' | 'showcase'>('idle');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCards, setShowCards] = useState(false);
    const slotControls = useAnimationControls();

    const cardHeight = 280;
    const totalCards = SLOT_SEQUENCE.length;
    const heroIndex = totalCards - 1; // Land on the hero (AI Agents)
    const finalPosition = -(heroIndex * cardHeight);

    // Start the slot machine sequence
    useEffect(() => {
        const runSequence = async () => {
            // Brief idle state
            await new Promise(r => setTimeout(r, 500));
            setPhase('spinning');

            // Fast spin
            await slotControls.start({
                y: finalPosition * 0.5,
                transition: { duration: 0.8, ease: 'linear' },
            });

            setPhase('slowing');

            // Slow down
            await slotControls.start({
                y: finalPosition * 0.85,
                transition: { duration: 0.8, ease: 'easeOut' },
            });

            setPhase('landing');

            // Final landing with bounce
            await slotControls.start({
                y: finalPosition,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    mass: 1,
                },
            });

            setPhase('reveal');
            await new Promise(r => setTimeout(r, 800));

            setPhase('showcase');
            setShowCards(true);
        };

        runSequence();
    }, [slotControls, finalPosition]);

    const heroCard = GENRES[0]; // AI Agents

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#030303] flex flex-col items-center justify-center">

            {/* =================================================================== */}
            {/* BACKGROUND EFFECTS */}
            {/* =================================================================== */}
            <BackgroundEffects phase={phase} heroColor={heroCard.color} />

            {/* =================================================================== */}
            {/* TOP HEADER */}
            {/* =================================================================== */}
            <motion.div
                className="absolute top-6 md:top-12 left-0 right-0 text-center z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.div
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: heroCard.color.primary }}
                        animate={{
                            opacity: phase === 'spinning' || phase === 'slowing' ? [1, 0.3, 1] : 1,
                            scale: phase === 'spinning' || phase === 'slowing' ? [1, 0.8, 1] : 1,
                        }}
                        transition={{ duration: 0.3, repeat: phase === 'spinning' ? Infinity : 0 }}
                    />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50">
                        {phase === 'idle' ? 'Initializing...' :
                            phase === 'spinning' ? 'Shuffling Genres...' :
                                phase === 'slowing' ? 'Finding #1...' :
                                    phase === 'landing' ? 'Locking In...' :
                                        'Curriculum Architecture'}
                    </span>
                </motion.div>
            </motion.div>

            {/* =================================================================== */}
            {/* SLOT MACHINE */}
            {/* =================================================================== */}
            <div className="relative z-30 w-full max-w-lg px-4">

                {/* Slot Machine Frame */}
                <SlotMachineFrame phase={phase} heroColor={heroCard.color}>

                    {/* The Spinning Reel */}
                    <div
                        className="relative overflow-hidden"
                        style={{ height: cardHeight }}
                    >
                        {/* Top Gradient Mask */}
                        <div
                            className="absolute top-0 left-0 right-0 h-20 z-20 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(3,3,3,1) 0%, transparent 100%)',
                            }}
                        />

                        {/* Bottom Gradient Mask */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to top, rgba(3,3,3,1) 0%, transparent 100%)',
                            }}
                        />

                        {/* The Reel Track */}
                        <motion.div
                            animate={slotControls}
                            className="absolute left-0 right-0"
                            style={{ top: 0 }}
                        >
                            {SLOT_SEQUENCE.map((genre, index) => (
                                <SlotCard
                                    key={`${genre.id}-${index}`}
                                    genre={genre}
                                    height={cardHeight}
                                    isActive={phase === 'reveal' || phase === 'showcase'}
                                    isHero={index === heroIndex}
                                />
                            ))}
                        </motion.div>
                    </div>

                </SlotMachineFrame>

                {/* Selection Indicator */}
                <motion.div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 pointer-events-none z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase !== 'idle' ? 1 : 0 }}
                >
                    <motion.div
                        className="w-3 h-3 border-l-2 border-t-2 border-b-2 rounded-l"
                        style={{ borderColor: heroCard.color.primary }}
                        animate={{
                            opacity: phase === 'reveal' || phase === 'showcase' ? 1 : 0.5,
                        }}
                    />
                    <motion.div
                        className="w-3 h-3 border-r-2 border-t-2 border-b-2 rounded-r"
                        style={{ borderColor: heroCard.color.primary }}
                        animate={{
                            opacity: phase === 'reveal' || phase === 'showcase' ? 1 : 0.5,
                        }}
                    />
                </motion.div>
            </div>

            {/* =================================================================== */}
            {/* EXPANDED CARDS SHOWCASE */}
            {/* =================================================================== */}
            <AnimatePresence>
                {showCards && (
                    <motion.div
                        className="absolute bottom-4 md:bottom-8 left-0 right-0 z-40 px-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-stretch justify-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {GENRES.filter(g => !g.isHero).map((genre, index) => (
                                <MiniCard
                                    key={genre.id}
                                    genre={genre}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =================================================================== */}
            {/* CELEBRATION PARTICLES */}
            {/* =================================================================== */}
            {(phase === 'reveal' || phase === 'showcase') && (
                <CelebrationParticles color={heroCard.color.primary} />
            )}
        </div>
    );
}

// =============================================================================
// SLOT MACHINE FRAME
// =============================================================================

function SlotMachineFrame({
    children,
    phase,
    heroColor
}: {
    children: React.ReactNode;
    phase: string;
    heroColor: GenreCard['color'];
}) {
    return (
        <div className="relative">
            {/* Outer Glow */}
            <motion.div
                className="absolute -inset-4 rounded-3xl"
                animate={{
                    boxShadow: phase === 'reveal' || phase === 'showcase'
                        ? `0 0 60px ${heroColor.glow}, 0 0 120px ${heroColor.glow}`
                        : '0 0 30px rgba(255,255,255,0.05)',
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Main Frame */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, rgba(30,30,30,0.8) 0%, rgba(15,15,15,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 -1px 0 rgba(0,0,0,0.3),
                        0 25px 50px -12px rgba(0,0,0,0.5)
                    `,
                }}
            >
                {/* Top Metallic Strip */}
                <div
                    className="h-3 w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(60,60,60,0.8) 0%, rgba(100,100,100,0.8) 50%, rgba(60,60,60,0.8) 100%)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                />

                {/* Content Area */}
                <div className="px-3 py-2">
                    {children}
                </div>

                {/* Bottom Metallic Strip */}
                <div
                    className="h-3 w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(50,50,50,0.8) 0%, rgba(80,80,80,0.8) 50%, rgba(50,50,50,0.8) 100%)',
                        borderTop: '1px solid rgba(255,255,255,0.03)',
                    }}
                />

                {/* Side Rails */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{
                        background: 'linear-gradient(180deg, rgba(80,80,80,0.5) 0%, rgba(40,40,40,0.5) 100%)',
                    }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{
                        background: 'linear-gradient(180deg, rgba(80,80,80,0.5) 0%, rgba(40,40,40,0.5) 100%)',
                    }}
                />
            </div>

            {/* Decorative Bolts */}
            {[
                { top: '8px', left: '8px' },
                { top: '8px', right: '8px' },
                { bottom: '8px', left: '8px' },
                { bottom: '8px', right: '8px' },
            ].map((pos, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        ...pos,
                        background: 'radial-gradient(circle at 30% 30%, rgba(150,150,150,0.8) 0%, rgba(60,60,60,0.8) 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.5)',
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// SLOT CARD (Individual Genre Card in the Reel)
// =============================================================================

function SlotCard({
    genre,
    height,
    isActive,
    isHero,
}: {
    genre: GenreCard;
    height: number;
    isActive: boolean;
    isHero: boolean;
}) {
    return (
        <motion.div
            className="relative px-4 py-4 flex items-center justify-center"
            style={{
                height,
                background: isHero && isActive
                    ? `linear-gradient(135deg, ${genre.color.primary}15 0%, transparent 50%)`
                    : 'transparent',
            }}
            animate={{
                scale: isHero && isActive ? 1 : 0.95,
            }}
        >
            {/* Card Content */}
            <div
                className="w-full h-full rounded-xl p-4 flex flex-col justify-between relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(20,20,20,0.95) 100%)`,
                    border: `1px solid ${isHero && isActive ? genre.color.primary + '40' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isHero && isActive
                        ? `0 0 30px ${genre.color.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
            >
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(${genre.color.primary} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Top Row */}
                <div className="relative flex items-start justify-between">
                    {/* Icon Badge */}
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${genre.color.primary}30 0%, ${genre.color.secondary}20 100%)`,
                            border: `1px solid ${genre.color.primary}40`,
                            boxShadow: `0 4px 20px ${genre.color.glow}`,
                        }}
                    >
                        {genre.icon}
                    </div>

                    {/* Workshop Count Badge */}
                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <span
                            className="text-lg font-black"
                            style={{ color: genre.color.primary }}
                        >
                            {genre.workshopCount}
                        </span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">
                            workshops
                        </span>
                    </div>
                </div>

                {/* Middle Content */}
                <div className="relative flex-1 flex flex-col justify-center py-3">
                    <h2
                        className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                        {genre.title}
                    </h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-3">
                        {genre.subtitle}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                        {genre.description}
                    </p>
                </div>

                {/* Bottom Tags */}
                <div className="relative flex flex-wrap gap-1.5">
                    {genre.highlights.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider"
                            style={{
                                background: `${genre.color.primary}15`,
                                color: genre.color.secondary,
                                border: `1px solid ${genre.color.primary}30`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Hero Badge */}
                {genre.isHero && isActive && (
                    <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        <div
                            className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider"
                            style={{
                                background: `linear-gradient(135deg, ${genre.color.primary} 0%, ${genre.color.secondary} 100%)`,
                                color: '#000',
                            }}
                        >
                            #1 Genre
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

// =============================================================================
// MINI CARD (Bottom showcase)
// =============================================================================

function MiniCard({ genre, index }: { genre: GenreCard; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.1, type: 'spring' }}
            className="flex-shrink-0 w-32 md:w-40 rounded-xl p-3 relative overflow-hidden"
            style={{
                background: 'rgba(20,20,20,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Accent Line */}
            <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                    background: `linear-gradient(90deg, ${genre.color.primary} 0%, transparent 100%)`,
                }}
            />

            {/* Content */}
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{genre.icon}</span>
                <span
                    className="text-xs font-bold"
                    style={{ color: genre.color.primary }}
                >
                    {genre.workshopCount}
                </span>
            </div>
            <h3 className="text-sm font-bold text-white/80 mb-0.5">
                {genre.title}
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">
                {genre.subtitle}
            </p>
        </motion.div>
    );
}

// =============================================================================
// BACKGROUND EFFECTS
// =============================================================================

function BackgroundEffects({ phase, heroColor }: { phase: string; heroColor: GenreCard['color'] }) {
    return (
        <>
            {/* Base Grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Radial Glow */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: phase === 'reveal' || phase === 'showcase'
                        ? `radial-gradient(ellipse at 50% 40%, ${heroColor.glow} 0%, transparent 50%)`
                        : 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 50%)',
                }}
                transition={{ duration: 0.8 }}
            />

            {/* Animated Scan Line */}
            {(phase === 'spinning' || phase === 'slowing') && (
                <motion.div
                    className="absolute left-0 right-0 h-[2px] z-50 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    }}
                    animate={{
                        top: ['30%', '70%', '30%'],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            )}

            {/* Corner Vignettes */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
                }}
            />
        </>
    );
}

// =============================================================================
// CELEBRATION PARTICLES
// =============================================================================

function CelebrationParticles({ color }: { color: string }) {
    const particles = useMemo(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            size: 2 + Math.random() * 4,
            duration: 1 + Math.random() * 1,
            delay: Math.random() * 0.5,
        }))
        , []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        background: color,
                        boxShadow: `0 0 ${particle.size * 2}px ${color}`,
                    }}
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0,
                    }}
                    animate={{
                        x: particle.x,
                        y: particle.y,
                        opacity: [1, 1, 0],
                        scale: [0, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}
