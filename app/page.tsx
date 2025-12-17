"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WrappedContainer from "@/components/WrappedContainer";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [showSlides, setShowSlides] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Landing Page (Always rendered, maybe hidden or blurred when slides are open if desired, but keeping it simple for now) */}
      <LandingPage onOpenSlides={() => setShowSlides(true)} />

      {/* Slides Overlay */}
      <AnimatePresence>
        {showSlides && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring/ease
            className="fixed inset-0 z-[200]"
          >
            <WrappedContainer onClose={() => setShowSlides(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
