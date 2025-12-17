"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BufferSlide({ onComplete }: { onComplete?: () => void }) {
    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full h-full"
            >
                <Image
                    src="/wormhole-buffer.png"
                    alt="2025 Was Unreal Wormhole"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Optional overlay for text if needed, but text is in image */}
                <div className="absolute inset-0 bg-black/10" />
            </motion.div>
        </div>
    );
}
