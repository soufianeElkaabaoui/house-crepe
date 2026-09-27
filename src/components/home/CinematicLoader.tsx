'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
  isReady?: boolean;
}

const STAGES = [
  { progress: 0, text: 'Heating cast iron griddle to 210°C...' },
  { progress: 28, text: 'Slow-fermenting 24-hour French batter...' },
  { progress: 58, text: 'Slicing alpine strawberries & whipping Chantilly...' },
  { progress: 84, text: 'Drizzling molten Belgian ganache...' },
  { progress: 96, text: 'Unlocking 360° crêpe show...' },
];

export function CinematicLoader({
  onComplete,
  minDurationMs = 3600,
  isReady = true,
}: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState(STAGES[0].text);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const intervalTime = 30; // update every 30ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress(rawPct);

      // Find current stage text
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (rawPct >= STAGES[i].progress) {
          setStageText(STAGES[i].text);
          break;
        }
      }

      // Check if finished
      if (rawPct >= 100 && isReady) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [minDurationMs, isReady, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0806] text-cream-whip selection:bg-crepe-gold select-none"
        >
          {/* Ambient Warm Golden Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(249,168,37,0.18)_0%,_rgba(13,8,6,0.96)_65%)]" />

          {/* Center Brand Core */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Spinning Emblem Icon with Official Logo */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-crepe-gold/40"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-18 h-18 rounded-full overflow-hidden bg-white p-1.5 shadow-crepe-glow flex items-center justify-center border-2 border-crepe-gold"
              >
                <Image
                  src="/images/logo.png"
                  alt="HOUSE CREPE Logo"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.25em] text-crepe-gold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
                <span>Parisian Heritage</span>
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-cream-whip tracking-tight">
                HOUSE CREPE
              </h1>
              <p className="text-xs text-cream-whip/60 tracking-wider uppercase font-body">
                Gourmet Disruptor • Cash on Delivery
              </p>
            </motion.div>

            {/* Dynamic Stage Text */}
            <div className="h-8 mt-10 flex items-center justify-center">
              <motion.p
                key={stageText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm text-crepe-gold font-body font-medium"
              >
                {stageText}
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-4 flex flex-col items-center gap-2">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-crepe-gold via-crepe-gold-light to-mint-leaf rounded-full shadow-crepe-glow"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Monospace Progress Value */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-cream-whip/50 px-0.5">
                <span className="flex items-center gap-1 text-[10px] uppercase">
                  <Clock className="w-3 h-3 text-crepe-gold" /> Crafting
                </span>
                <span className="text-crepe-gold font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Micro Footer */}
          <div className="absolute bottom-8 text-[11px] text-cream-whip/40 tracking-wider uppercase flex items-center gap-2 font-mono">
            <span>Freshly Sizzled</span>
            <span>•</span>
            <span>Delivered Warm</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CinematicLoader;
