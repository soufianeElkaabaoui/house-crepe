'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Plus,
  Check,
  Clock,
  Flame,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useLoaderStore } from '@/store/loaderStore';
import { MENU_ITEMS } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { CinematicLoader } from './CinematicLoader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 150;
const FRAME_URL = (index: number) =>
  `/sequence/frame_${String(index + 1).padStart(4, '0')}.webp`;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastRenderedFrameRef = useRef<number>(-1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const playheadRef = useRef({ frame: 0 });

  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isAllFramesLoaded, setIsAllFramesLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { hasLoaded, setHasLoaded } = useLoaderStore();
  const [showLoader, setShowLoader] = useState(!hasLoaded);

  useEffect(() => {
    // Clean up stale sessionStorage key from previous session-storage approach
    try {
      sessionStorage.removeItem('house-crepe-loader-seen');
    } catch {}
  }, []);

  const { addItem, setIsOpen } = useCartStore();
  const signatureItem = MENU_ITEMS[0]; // Nutella Dream with strawberries

  // Render a specific frame on canvas with responsive "cover" aspect ratio & integer pixel alignment
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIndex = Math.min(Math.max(0, Math.round(frameIndex)), FRAME_COUNT - 1);

    // Skip redundant drawing if the frame hasn't changed
    if (clampedIndex === lastRenderedFrameRef.current) return;

    const ctx = ctxRef.current || canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    if (!ctxRef.current) {
      ctxRef.current = ctx;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
    }

    // Find loaded image or closest earlier loaded frame fallback
    let img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = clampedIndex; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastRenderedFrameRef.current = clampedIndex;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "cover" math: fill entire canvas without distortion
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const renderW = Math.round(iw * ratio);
    const renderH = Math.round(ih * ratio);
    const shiftX = Math.round((cw - renderW) / 2);
    const shiftY = Math.round((ch - renderH) / 2);

    ctx.drawImage(img, 0, 0, iw, ih, shiftX, shiftY, renderW, renderH);
  }, []);

  // Resize canvas according to devicePixelRatio for retina sharpness (capped at 1.5 for 60fps blit speed)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    // Force redraw on resize
    lastRenderedFrameRef.current = -1;
    renderFrame(playheadRef.current.frame);
  }, [renderFrame]);

  // Preload and decode all 150 frames into memory
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const decodeImg = (img: HTMLImageElement) => {
      if ('decode' in img) {
        return img.decode().catch(() => {});
      }
      return Promise.resolve();
    };

    // Preload first frame with highest priority
    const firstImg = new Image();
    firstImg.src = FRAME_URL(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      decodeImg(firstImg).then(() => {
        if (isCancelled) return;
        setIsFirstFrameLoaded(true);
        resizeCanvas();
        renderFrame(0);
      });
    };
    images[0] = firstImg;

    // Preload & decode remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_URL(i);
      img.onload = () => {
        if (isCancelled) return;
        decodeImg(img).then(() => {
          if (isCancelled) return;
          loadedCount++;
          // When 90%+ frames are decoded in memory, mark all frames ready
          if (loadedCount >= FRAME_COUNT - 10) {
            setIsAllFramesLoaded(true);
          }
          if (loadedCount === 25 || loadedCount === FRAME_COUNT - 1) {
            ScrollTrigger.refresh();
          }
        });
      };
      images[i] = img;
    }

    imagesRef.current = images;

    // Safety fallback: if some frame takes long, release loader after 4s
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsAllFramesLoaded(true);
      }
    }, 4000);

    window.addEventListener('resize', resizeCanvas);
    ScrollTrigger.addEventListener('refreshInit', resizeCanvas);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.removeEventListener('refreshInit', resizeCanvas);
    };
  }, [resizeCanvas, renderFrame]);

  // Master GSAP ScrollTrigger Sequence with buttery smooth scrub & inertia
  useGSAP(
    () => {
      if (!containerRef.current || !pinContainerRef.current) return;

      const playhead = playheadRef.current;

      // Master Timeline pinned over 3500px of scroll for optimal pacing and smooth motion
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3500',
          pin: pinContainerRef.current,
          scrub: 1.2, // 1.2-second organic inertia smoothing
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Frame sequence scrubbing tween (continuous float interpolation)
      masterTl.to(
        playhead,
        {
          frame: FRAME_COUNT - 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => {
            renderFrame(playhead.frame);
          },
        },
        0
      );

      // 1b. GPU-accelerated scrub progress bar (zero React re-renders)
      masterTl.fromTo(
        '.hero-progress-bar',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', duration: 1 },
        0
      );

      // 2. Intro Text Overlay (0.00 -> 0.20)
      masterTl.fromTo(
        '.hero-intro-text',
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, ease: 'sine.inOut', duration: 0.18 },
        0.14
      );

      // 3. Step 1: 24h Cold Fermentation & Blistering (0.22 -> 0.44)
      masterTl.fromTo(
        '.hero-step-1',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: 'power1.out', duration: 0.1 },
        0.22
      );
      masterTl.to(
        '.hero-step-1',
        { opacity: 0, x: -20, ease: 'power1.in', duration: 0.08 },
        0.42
      );

      // 4. Step 2: Fresh Mountain Strawberries (0.46 -> 0.68)
      masterTl.fromTo(
        '.hero-step-2',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, ease: 'power1.out', duration: 0.1 },
        0.46
      );
      masterTl.to(
        '.hero-step-2',
        { opacity: 0, x: 20, ease: 'power1.in', duration: 0.08 },
        0.66
      );

      // 5. Step 3: Chantilly Whip & Molten Belgian Ganache (0.70 -> 0.88)
      masterTl.fromTo(
        '.hero-step-3',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: 'power1.out', duration: 0.1 },
        0.70
      );
      masterTl.to(
        '.hero-step-3',
        { opacity: 0, x: -20, ease: 'power1.in', duration: 0.08 },
        0.87
      );

      // 6. Finale: Completed Masterpiece & WhatsApp COD Dispatch Card (0.88 -> 1.0)
      masterTl.fromTo(
        '.hero-step-4',
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.12 },
        0.88
      );

      // 7. Scroll indicator fade out early
      masterTl.to(
        '.hero-scroll-prompt',
        { opacity: 0, y: 15, duration: 0.08 },
        0.05
      );
    },
    { scope: containerRef }
  );

  const handleQuickAdd = () => {
    if (!signatureItem) return;
    addItem({
      id: signatureItem.id,
      name: signatureItem.name,
      price: signatureItem.price,
      image: signatureItem.image,
      dietaryNotes: signatureItem.dietaryNotes,
    });
    setIsAdded(true);
    setIsOpen(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const whatsappOrderUrl = `https://wa.me/212600000000?text=${encodeURIComponent(
    `Bonjour House Crepe! Je souhaite commander la crêpe signature "${signatureItem?.name || 'Nutella Dream'}" en Paiement à la Livraison (Cash on Delivery).`
  )}`;

  return (
    <>
      {showLoader && !hasLoaded && (
        <CinematicLoader
          minDurationMs={3500}
          isReady={isFirstFrameLoaded && isAllFramesLoaded}
          onComplete={() => {
            setHasLoaded(true);
            setShowLoader(false);
            if (typeof window !== 'undefined') {
              ScrollTrigger.refresh();
            }
          }}
        />
      )}

      <section
        id="hero-section"
        ref={containerRef}
        className="relative w-full bg-[#120d0a] text-cream-whip"
      >
        {/* Pinned Viewport Container */}
        <div
          ref={pinContainerRef}
          className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* HTML5 Canvas Frame Sequence Display */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(18,13,10,0.85)_95%)]" />

          {/* Subtle Top & Bottom Gradient Shadows */}
          <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#120d0a]/90 via-[#120d0a]/50 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#120d0a]/90 via-[#120d0a]/50 to-transparent pointer-events-none z-10" />

        {/* Narrative Overlay Choreography */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between py-20 pointer-events-none">

          {/* Center Stage Floating Narrative Steps */}
          <div className="relative w-full h-full flex items-center justify-center">

            {/* PHASE 1: Hero Introduction (Progress 0.00 -> 0.20) */}
            <div className="hero-intro-text absolute text-center max-w-3xl px-4 flex flex-col items-center pointer-events-auto">
              <div className="inline-flex items-center gap-2 bg-crepe-gold/15 text-crepe-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-crepe-gold/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
                <span>Parisian Craft × Gourmet Disruptor</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-cream-whip tracking-tight leading-[1.08] drop-shadow-md">
                The Artisanal Crêpe, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-crepe-gold via-crepe-gold-light to-cream-whip">
                  Blistered to Perfection.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-cream-whip/85 max-w-2xl font-body leading-relaxed drop-shadow">
                24-hour slow fermented batter sizzled on hot cast iron, crowned with fresh fruit and molten Belgian chocolate. Delivered warm with Cash on Delivery.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/menu"
                  className="px-7 py-3.5 rounded-full bg-crepe-gold hover:bg-crepe-gold-light text-[#2b1b18] font-bold text-sm sm:text-base transition-all shadow-crepe-glow flex items-center gap-2 group"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-cream-whip border border-white/20 backdrop-blur-md font-bold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-mint-leaf" />
                  <span>Order via WhatsApp (COD)</span>
                </a>
              </div>
            </div>

            {/* PHASE 2: Step 1 Callout - 24h Cold Fermentation & Cast Iron Sizzle (0.22 -> 0.44) */}
            <div className="hero-step-1 opacity-0 absolute left-2 md:left-8 lg:left-12 max-w-sm sm:max-w-md pointer-events-auto">
              <div className="bg-[#1f1510]/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-crepe-gold/30 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 text-crepe-gold text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-crepe-gold" />
                  <span>Phase 01 • The Foundation</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-cream-whip leading-snug">
                  24-Hour Cold Rested French Batter
                </h3>
                <p className="text-sm text-cream-whip/80 leading-relaxed font-body">
                  Organic stone-ground flour and Normandy butter rested a full day. Sizzled at 210°C to create golden micro-bubbles and crisp, delicate lace edges.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-crepe-gold font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-crepe-gold/15 border border-crepe-gold/30">
                    210°C Griddle
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-crepe-gold/15 border border-crepe-gold/30">
                    Zero Synthetic Additives
                  </span>
                </div>
              </div>
            </div>

            {/* PHASE 3: Step 2 Callout - Fresh Mountain Strawberries (0.46 -> 0.68) */}
            <div className="hero-step-2 opacity-0 absolute right-2 md:right-8 lg:right-12 max-w-sm sm:max-w-md pointer-events-auto">
              <div className="bg-[#1f1510]/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-strawberry-red/35 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 text-strawberry-red-light text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-strawberry-red fill-strawberry-red" />
                  <span>Phase 02 • Fresh Harvest</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-cream-whip leading-snug">
                  Sliced Mountain Strawberries
                </h3>
                <p className="text-sm text-cream-whip/80 leading-relaxed font-body">
                  Selected sweet alpine strawberries, sliced in real time onto the steaming fold so rich tart juices melt directly into the warm buttery crumb.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-strawberry-red-light font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-strawberry-red/20 border border-strawberry-red/30">
                    100% Fresh Daily
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-strawberry-red/20 border border-strawberry-red/30">
                    No Frozen Fruit
                  </span>
                </div>
              </div>
            </div>

            {/* PHASE 4: Step 3 Callout - Chantilly Cream & Molten Ganache (0.70 -> 0.88) */}
            <div className="hero-step-3 opacity-0 absolute left-2 md:left-8 lg:left-12 max-w-sm sm:max-w-md pointer-events-auto">
              <div className="bg-[#1f1510]/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-crepe-gold/30 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 text-crepe-gold text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-crepe-gold" />
                  <span>Phase 03 • The Crown</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-cream-whip leading-snug">
                  Madagascar Chantilly & Belgian Cocoa
                </h3>
                <p className="text-sm text-cream-whip/80 leading-relaxed font-body">
                  Piped cloud-soft whipped cream infused with pure vanilla caviar, finished with an indulgent cascade of 70% dark Belgian ganache drizzle.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-crepe-gold font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-crepe-gold/15 border border-crepe-gold/30">
                    70% Valrhona Ganache
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-crepe-gold/15 border border-crepe-gold/30">
                    Vanilla Caviar
                  </span>
                </div>
              </div>
            </div>

            {/* PHASE 5: Grand Finale Masterpiece Card (0.88 -> 1.0) */}
            <div className="hero-step-4 opacity-0 absolute max-w-xl w-full px-4 text-center pointer-events-auto">
              <div className="bg-[#1f1510]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-4xl border border-crepe-gold/40 shadow-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-crepe-gold text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-crepe-gold/15 border border-crepe-gold/25">
                  <ShieldCheck className="w-3.5 h-3.5 text-mint-leaf" />
                  <span>The Completed Signature • Warm COD Dispatch</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-cream-whip leading-tight">
                  Nutella Dream & Mountain Strawberry
                </h3>

                <p className="text-xs sm:text-sm text-cream-whip/80 max-w-lg mx-auto font-body leading-relaxed">
                  Boxed in thermal-ventilated packaging to preserve crispy blistered edges. Hand-delivered warm to your doorstep. Pay with cash only after inspecting your dessert.
                </p>

                <div className="flex items-center justify-center gap-4 text-xs font-bold text-cream-whip/70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-crepe-gold" /> 25–35 Min Express
                  </span>
                  <span>•</span>
                  <span className="text-crepe-gold font-display text-lg font-bold">
                    {formatPrice(signatureItem?.price || 11.5)}
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleQuickAdd}
                    className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${isAdded
                        ? 'bg-mint-leaf text-[#2b1b18]'
                        : 'bg-crepe-gold hover:bg-crepe-gold-light text-[#2b1b18]'
                      }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Drawer!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Quick Add to Order</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-cream-whip border border-white/20 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-mint-leaf" />
                    <span>WhatsApp Order (COD)</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom HUD: Progress Bar & Scroll Indicator */}
          <div className="flex flex-col items-center gap-3 pointer-events-auto">
            {/* Scroll Indicator Prompt */}
            <div className="hero-scroll-prompt flex items-center gap-2 text-xs font-medium text-cream-whip/70 tracking-wider uppercase animate-bounce">
              <span>Scroll to build the crêpe</span>
              <ChevronDown className="w-4 h-4 text-crepe-gold" />
            </div>

            {/* Micro Scrub Timeline Bar */}
            <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
              <div
                className="hero-progress-bar h-full bg-gradient-to-r from-crepe-gold via-crepe-gold-light to-mint-leaf origin-left will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  </>
  );
}

export default HeroSection;
