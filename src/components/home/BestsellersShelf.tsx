'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageCircle, ArrowRight, Check, Sparkles } from 'lucide-react';
import {
  SITE_SETTINGS,
  SHOWCASE_DISHES,
  SHOWCASE_MAIN_POS,
  SHOWCASE_PERIM_POS,
} from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export function BestsellersShelf() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);
  const slotsRef = useRef<number[]>([1, 2, 3, 4]);

  const { addItem, setIsOpen } = useCartStore();
  const currentDish = SHOWCASE_DISHES[activeIndex];

  // Helper to re-position all dishes instantly (used on mount & swap complete)
  const syncDishPositions = useCallback(() => {
    if (!containerRef.current) return;

    // Centerpiece main dish
    const mainEl = containerRef.current.querySelector<HTMLElement>(`[data-dish-id="${activeIndex}"]`);
    if (mainEl) {
      mainEl.classList.add('is-main');
      const ring = mainEl.querySelector<HTMLElement>('.dish-ring');
      if (ring) ring.style.borderColor = SHOWCASE_DISHES[activeIndex].accent;

      gsap.set(mainEl, {
        left: `${SHOWCASE_MAIN_POS.left}%`,
        top: `${SHOWCASE_MAIN_POS.top}%`,
        scale: SHOWCASE_MAIN_POS.scale,
        xPercent: -50,
        yPercent: -50,
        zIndex: 20,
      });
    }

    // Perimeter orbit dishes
    slotsRef.current.forEach((dishId: number, idx: number) => {
      const el = containerRef.current?.querySelector<HTMLElement>(`[data-dish-id="${dishId}"]`);
      if (el) {
        el.classList.remove('is-main');
        gsap.set(el, {
          left: `${SHOWCASE_PERIM_POS[idx].left}%`,
          top: `${SHOWCASE_PERIM_POS[idx].top}%`,
          scale: 1,
          xPercent: -50,
          yPercent: -50,
          zIndex: 15,
        });
      }
    });
  }, [activeIndex]);

  // Main Dish Swap Animation
  const swapToMain = useCallback(
    (newDishId: number) => {
      if (isAnimatingRef.current || newDishId === activeIndex) return;

      const slotIdx = slotsRef.current.indexOf(newDishId);
      if (slotIdx === -1) return;

      isAnimatingRef.current = true;
      const outgoingId = activeIndex;

      const incomingEl = containerRef.current?.querySelector<HTMLElement>(`[data-dish-id="${newDishId}"]`);
      const outgoingEl = containerRef.current?.querySelector<HTMLElement>(`[data-dish-id="${outgoingId}"]`);

      if (!incomingEl || !outgoingEl) {
        isAnimatingRef.current = false;
        return;
      }

      incomingEl.classList.remove('is-main');
      outgoingEl.classList.remove('is-main');

      gsap.set(incomingEl, { zIndex: 25 });
      gsap.set(outgoingEl, { zIndex: 18 });

      const tl = gsap.timeline({
        defaults: { duration: 0.75, ease: 'power3.inOut' },
        onComplete: () => {
          slotsRef.current[slotIdx] = outgoingId;
          setActiveIndex(newDishId);
          isAnimatingRef.current = false;
        },
      });

      tl.to(incomingEl, { left: `${SHOWCASE_MAIN_POS.left}%`, top: `${SHOWCASE_MAIN_POS.top}%`, scale: SHOWCASE_MAIN_POS.scale }, 0)
        .to(outgoingEl, { left: `${SHOWCASE_PERIM_POS[slotIdx].left}%`, top: `${SHOWCASE_PERIM_POS[slotIdx].top}%`, scale: 1 }, 0);
    },
    [activeIndex]
  );

  const stepTo = useCallback(
    (direction: number) => {
      if (isAnimatingRef.current) return;
      const total = SHOWCASE_DISHES.length;
      const next = (activeIndex + direction + total) % total;
      swapToMain(next);
    },
    [activeIndex, swapToMain]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepTo(1);
      if (e.key === 'ArrowLeft') stepTo(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepTo]);

  // GSAP Setup and lifecycle
  useGSAP(
    () => {
      syncDishPositions();

      // Ambient bobbing for leaves
      gsap.to('.ambient-leaf-1', {
        y: '+=14',
        rotate: 12,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to('.ambient-leaf-2', {
        y: '+=14',
        rotate: -10,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.4,
      });
      gsap.to('.ambient-leaf-3', {
        y: '+=14',
        rotate: 14,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      });

      // Ambient blob float & floating note bob
      gsap.to('.stage-blob', { y: '+=10', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.stage-float-note', { y: -6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // Subtle mouse parallax on stage blob
      const blob = containerRef.current?.querySelector<HTMLElement>('.stage-blob');
      const stage = containerRef.current?.querySelector<HTMLElement>('.stage-box');
      if (blob && stage) {
        const qX = gsap.quickTo(blob, 'x', { duration: 0.9, ease: 'power3.out' });
        const qY = gsap.quickTo(blob, 'y', { duration: 0.9, ease: 'power3.out' });

        const onMouseMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          qX(relX * 12);
          qY(relY * 12);
        };
        const onMouseLeave = () => {
          qX(0);
          qY(0);
        };

        stage.addEventListener('mousemove', onMouseMove);
        stage.addEventListener('mouseleave', onMouseLeave);

        return () => {
          stage.removeEventListener('mousemove', onMouseMove);
          stage.removeEventListener('mouseleave', onMouseLeave);
        };
      }
    },
    { scope: containerRef }
  );

  // Animate text characters, price, and CTA whenever activeIndex changes
  useGSAP(
    () => {
      syncDishPositions();

      gsap.fromTo(
        '.dish-title-char',
        { y: 26, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.55, ease: 'power4.out', stagger: 0.016 }
      );
      gsap.fromTo(
        '.dish-price-text',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      );
      gsap.fromTo(
        '.dish-desc-text',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.dish-eyebrow-text',
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );

      // Order button background and text color animation
      const orderBtn = containerRef.current?.querySelector<HTMLButtonElement>('.order-btn-action');
      if (orderBtn) {
        gsap.to(orderBtn, {
          backgroundColor: currentDish.accent,
          color: currentDish.accentTextColor,
          duration: 0.45,
          ease: 'power2.out',
        });
        orderBtn.style.boxShadow = `0 14px 30px -10px ${currentDish.accent}88`;
      }
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  const handleOrder = () => {
    const orderBtn = containerRef.current?.querySelector<HTMLButtonElement>('.order-btn-action');
    if (orderBtn) {
      gsap.fromTo(orderBtn, { scale: 1 }, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    }

    addItem({
      id: currentDish.item.id,
      name: currentDish.item.name,
      price: currentDish.item.price,
      image: currentDish.item.image,
      dietaryNotes: currentDish.item.dietaryNotes,
      quantity: qty,
    });
    setIsOpen(true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    `Bonjour House Crepe! Je souhaite commander ${qty}x "${currentDish.item.name}" (${formatPrice(
      currentDish.price * qty
    )}) en Paiement à la Livraison (Cash on Delivery).`
  )}`;

  return (
    <section
      id="bestsellers"
      ref={containerRef}
      className="relative w-full overflow-hidden py-14 sm:py-20 md:py-24 bg-cream-whip-50 dark:bg-chocolate-glaze-surface text-house-brown dark:text-cream-whip transition-colors duration-500 select-none"
    >
      {/* Brand Crepe Texture Overlay */}
      <div className="absolute inset-0 crepe-pattern opacity-30 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-crepe-gold/15 dark:bg-crepe-gold/10 text-house-brown dark:text-crepe-gold border border-crepe-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-crepe-gold fill-crepe-gold/30" />
            <span>Curated Tasting Menu</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-house-brown dark:text-cream-whip tracking-tight">
            The Bestsellers Showcase
          </h2>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-house-brown dark:text-crepe-gold hover:text-strawberry-red transition-colors group"
        >
          <span>Explore All Menu Creations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
        {/* EDITORIAL CONTENT (Order 2 on mobile, Order 1 on desktop) */}
        <div className="relative z-10 w-full max-w-xl order-2 lg:order-1">
          <div className="dish-eyebrow-text flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-house-brown/70 dark:text-cream-whip/70 mb-4 before:content-[''] before:w-6 before:h-px before:bg-current">
            {currentDish.eyebrow}
          </div>

          <h3 className="font-display font-bold text-3xl sm:text-5xl lg:text-[54px] leading-[1.04] tracking-tight mb-4 min-h-[1.1em] [perspective:600px] text-house-brown dark:text-cream-whip">
            {currentDish.name.split('').map((char, i) => (
              <span key={`${activeIndex}-${i}`} className="dish-title-char inline-block will-change-transform">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h3>

          <div
            className="dish-price-text font-display font-bold text-2xl sm:text-3xl mb-4 transition-colors duration-300"
            style={{ color: currentDish.accent }}
          >
            {formatPrice(currentDish.price)}
          </div>

          <p className="dish-desc-text text-sm sm:text-base leading-relaxed text-house-brown/80 dark:text-cream-whip/80 mb-6 max-w-lg min-h-[76px] font-body">
            {currentDish.desc}
          </p>

          {/* Action Row - Fit in one line on mobile */}
          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-8 w-full flex-nowrap">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 sm:gap-3.5 border border-house-brown/20 dark:border-cream-whip/20 rounded-full px-2.5 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm bg-white/70 dark:bg-white/5 backdrop-blur-md shrink-0 text-house-brown dark:text-cream-whip">
              <button
                onClick={() => setQty((q: number) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                –
              </button>
              <span className="font-mono text-xs sm:text-sm">{String(qty).padStart(2, '0')}</span>
              <button
                onClick={() => setQty((q: number) => Math.min(9, q + 1))}
                aria-label="Increase quantity"
                className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                +
              </button>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              className="order-btn-action flex-1 sm:flex-initial px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-body font-semibold text-xs sm:text-sm shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
              style={{
                backgroundColor: currentDish.accent,
                color: currentDish.accentTextColor,
                boxShadow: `0 14px 30px -10px ${currentDish.accent}88`,
              }}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  <span>Added!</span>
                </>
              ) : (
                <span>Order Now</span>
              )}
            </button>

            {/* WhatsApp COD Instant Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full font-body font-semibold text-xs sm:text-sm text-house-brown dark:text-cream-whip bg-white/80 dark:bg-white/5 border border-house-brown/20 dark:border-cream-whip/20 backdrop-blur-md hover:border-mint-leaf/50 hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-mint-leaf shrink-0" />
              <span>
                WhatsApp <span className="hidden sm:inline">COD</span>
              </span>
            </a>
          </div>

          {/* Step Navigation - Centered on mobile */}
          <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-house-brown/70 dark:text-cream-whip/70 font-medium w-full">
            <div className="font-display font-bold text-house-brown dark:text-cream-whip text-base tracking-wide">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span> /{' '}
              <span>{String(SHOWCASE_DISHES.length).padStart(2, '0')}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => stepTo(-1)}
                className="hover:text-house-brown dark:hover:text-cream-whip opacity-70 hover:opacity-100 transition-all font-semibold flex items-center gap-1.5"
              >
                ← Previous
              </button>
              <button
                onClick={() => stepTo(1)}
                className="hover:text-house-brown dark:hover:text-cream-whip opacity-70 hover:opacity-100 transition-all font-semibold flex items-center gap-1.5"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* ORBIT STAGE (Order 1 on mobile, Order 2 on desktop) */}
        <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[500px] lg:min-h-[600px] order-1 lg:order-2 mb-2 lg:mb-0">
          <div className="stage-box relative w-[88vw] h-[88vw] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] max-w-[600px] max-h-[600px]">
            {/* Background Blob - Warm Golden Crepe Batter Tone */}
            <div className="stage-blob absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_38%_32%,#FFF3D6,#FCE7C2_50%,#EBD0A7_100%)] dark:bg-[radial-gradient(circle_at_38%_32%,#3E2723,#2B1B18_70%)] shadow-[inset_0_0_80px_rgba(249,168,37,0.2)] pointer-events-none transition-colors duration-700" />

            {/* Semicircular Orbit Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 640 640">
              <path
                className="fill-none stroke-house-brown/25 dark:stroke-cream-whip/20 stroke-[1.6] [stroke-dasharray:2_10] [stroke-linecap:round]"
                d="M 410 50 C 640 120, 640 520, 410 590"
              />
            </svg>

            {/* Floating Botanical Mint Leaves (Brand mint-leaf tokens) */}
            <svg
              className="ambient-leaf-1 absolute w-6 h-6 opacity-85 pointer-events-none z-10 fill-mint-leaf stroke-mint-leaf-dark stroke-[0.5]"
              viewBox="0 0 24 24"
              style={{ left: '10%', top: '10%' }}
            >
              <path d="M12 2C7 2 2 7 2 14c0 5 3 8 6 8 5 0 12-6 12-14 0-3-3-6-8-6zM6 18c-1-2-1-5 1-8" />
            </svg>
            <svg
              className="ambient-leaf-2 absolute w-6 h-6 opacity-85 pointer-events-none z-10 fill-mint-leaf-light stroke-mint-leaf stroke-[0.5]"
              viewBox="0 0 24 24"
              style={{ left: '90%', top: '16%' }}
            >
              <path d="M12 2C7 2 2 7 2 14c0 5 3 8 6 8 5 0 12-6 12-14 0-3-3-6-8-6zM6 18c-1-2-1-5 1-8" />
            </svg>
            <svg
              className="ambient-leaf-3 absolute w-6 h-6 opacity-85 pointer-events-none z-10 fill-mint-leaf stroke-mint-leaf-dark stroke-[0.5]"
              viewBox="0 0 24 24"
              style={{ left: '6%', top: '82%' }}
            >
              <path d="M12 2C7 2 2 7 2 14c0 5 3 8 6 8 5 0 12-6 12-14 0-3-3-6-8-6zM6 18c-1-2-1-5 1-8" />
            </svg>

            {/* Dish Layer */}
            <div className="absolute inset-0">
              {SHOWCASE_DISHES.map((dish) => {
                const isMain = dish.id === activeIndex;
                return (
                  <div
                    key={dish.id}
                    data-dish-id={dish.id}
                    onClick={() => swapToMain(dish.id)}
                    className={`absolute left-0 top-0 w-[78px] h-[78px] sm:w-[105px] sm:h-[105px] -translate-x-1/2 -translate-y-1/2 will-change-transform select-none ${
                      isMain ? 'z-20 cursor-default' : 'z-15 cursor-pointer group'
                    }`}
                  >
                    {/* Active Accent Ring */}
                    <div
                      className={`dish-ring absolute -inset-[7px] rounded-full border-2 transition-all duration-300 pointer-events-none ${
                        isMain ? 'opacity-100 scale-100' : 'opacity-0 scale-85'
                      }`}
                      style={{ borderColor: dish.accent }}
                    />

                    {/* Dish Porcelain Rim Wrap */}
                    <div
                      className={`w-full h-full rounded-full relative overflow-hidden bg-cream-whip-200 dark:bg-chocolate-glaze transition-all duration-300 ${
                        isMain
                          ? 'border-[6px] sm:border-[7px] border-white/95 shadow-[0_30px_60px_-20px_rgba(104,66,38,0.28)] dark:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]'
                          : 'border-[4px] sm:border-[5px] border-white/90 shadow-[0_10px_24px_-8px_rgba(104,66,38,0.35)] dark:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] group-hover:shadow-[0_16px_32px_-6px_rgba(104,66,38,0.45)]'
                      }`}
                    >
                      <Image
                        src={dish.img}
                        alt={dish.name}
                        fill
                        sizes="320px"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Exploratory Note */}
            <div className="stage-float-note absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-4 flex items-center gap-2.5 bg-white/85 dark:bg-chocolate-glaze-card/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-house-brown/15 dark:border-cream-whip/15 shadow-warm-diffused dark:shadow-dark-diffused text-xs font-semibold text-house-brown dark:text-cream-whip whitespace-nowrap z-30">
              <span
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: currentDish.accent,
                  boxShadow: `0 0 0 4px ${currentDish.accent}44`,
                }}
              />
              <span>Click on any dish to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestsellersShelf;
