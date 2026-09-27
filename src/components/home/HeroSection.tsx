'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageCircle, ArrowRight, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { SITE_SETTINGS } from '@/data/mockData';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  const directWhatsAppUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    "Hello House Crepe! I'd like to place an order via WhatsApp."
  )}`;

  useGSAP(
    () => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          '.hero-word',
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'back.out(1.4)',
          },
          '-=0.5'
        )
        .from(
          subheadRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          ctaRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          heroImageRef.current,
          {
            scale: 0.88,
            opacity: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .from(
          '.floating-topping',
          {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(2)',
          },
          '-=0.6'
        );

      // Continuous floating physics for topping SVGs
      gsap.to('.float-topping-1', {
        y: -14,
        rotation: 6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-topping-2', {
        y: 16,
        rotation: -8,
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });

      gsap.to('.float-topping-3', {
        y: -18,
        rotation: 10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });

      gsap.to('.float-topping-4', {
        y: 12,
        rotation: -5,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-crepe-gold/20 border border-crepe-gold/40 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
            <span>Gourmet French Crêperie • COD Direct</span>
          </div>

          {/* Staggered Split Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-house-brown dark:text-cream-whip"
          >
            <span className="inline-block hero-word mr-3">The</span>
            <span className="inline-block hero-word mr-3 text-crepe-gold">sweetest</span>
            <span className="inline-block hero-word mr-3">place</span>
            <span className="inline-block hero-word mr-3">to</span>
            <span className="inline-block hero-word mr-3">call</span>
            <span className="inline-block hero-word text-strawberry-red">home.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subheadRef}
            className="mt-6 text-base sm:text-lg md:text-xl text-house-brown/80 dark:text-cream-whip/80 max-w-2xl leading-relaxed"
          >
            Artisanal French crêpes, 24-hour rested golden batter, authentic melted Belgian chocolate, and gourmet savory galettes. Delivered steaming hot to your door with zero prepayment — simply pay cash upon delivery.
          </p>

          {/* Pill CTAs */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/menu" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze font-display font-bold text-base px-8 py-4 rounded-full shadow-warm-hover cursor-pointer transition-all"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>

            <motion.a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-mint-leaf hover:bg-mint-leaf-dark text-chocolate-glaze font-display font-bold text-base px-7 py-4 rounded-full shadow-warm-diffused transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-chocolate-glaze" />
              <span>Order via WhatsApp</span>
            </motion.a>
          </div>

          {/* Social Proof & Guarantees */}
          <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-house-brown/10 dark:border-cream-whip/10 text-xs text-house-brown/70 dark:text-cream-whip/70">
            <div className="flex items-center gap-1.5">
              <div className="flex text-crepe-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-crepe-gold" />
                ))}
              </div>
              <span className="font-bold text-house-brown dark:text-cream-whip">4.9/5</span>
              <span>(1,200+ Crêpe Lovers)</span>
            </div>

            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-mint-leaf" />
              <span>Cash on Delivery (No Card Required)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Floating SVG Toppings */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Main Visual Display */}
          <div
            ref={heroImageRef}
            className="relative w-72 sm:w-96 md:w-[440px] aspect-square rounded-full p-4 bg-gradient-to-tr from-crepe-gold/30 via-cream-whip to-crepe-gold/40 dark:from-chocolate-glaze dark:to-chocolate-glaze-card shadow-2xl border-4 border-crepe-gold/40 flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">
              <Image
                src="/images/nutella-dream.jpg"
                alt="House Crepe Nutella Dream with strawberries and hazelnuts"
                fill
                priority
                sizes="(max-width: 768px) 320px, 440px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlaid Floating Chef Tag */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -bottom-3 -left-3 bg-white dark:bg-chocolate-glaze text-house-brown dark:text-cream-whip px-4 py-2.5 rounded-2xl shadow-warm-hover border border-house-brown/10 dark:border-cream-whip/10 flex items-center gap-2.5 z-20"
            >
              <div className="w-3 h-3 rounded-full bg-mint-leaf animate-ping" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-crepe-gold">
                  Fresh on Iron
                </p>
                <p className="font-display font-bold text-xs">Nutella Dream & Hazelnut</p>
              </div>
            </motion.div>
          </div>

          {/* Floating SVG Toppings with Parallax & Hover Physics */}
          <div ref={floatingElementsRef} className="pointer-events-none absolute inset-0 -m-6 sm:-m-12">
            {/* 1. Strawberry Pop (Top Left) */}
            <div className="floating-topping float-topping-1 absolute top-2 left-6 sm:left-2">
              <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg">
                <path
                  d="M50 15 C35 15, 15 35, 20 65 C25 88, 50 96, 50 96 C50 96, 75 88, 80 65 C85 35, 65 15, 50 15 Z"
                  fill="#E53935"
                />
                <circle cx="36" cy="42" r="2.5" fill="#FFE082" />
                <circle cx="50" cy="48" r="2.5" fill="#FFE082" />
                <circle cx="64" cy="42" r="2.5" fill="#FFE082" />
                <circle cx="42" cy="62" r="2.5" fill="#FFE082" />
                <circle cx="58" cy="62" r="2.5" fill="#FFE082" />
                <circle cx="50" cy="76" r="2.2" fill="#FFE082" />
                {/* Green Stem */}
                <path
                  d="M50 16 C50 6, 58 4, 52 2 M42 16 C38 10, 30 12, 34 16 M58 16 C62 10, 70 12, 66 16"
                  stroke="#81C784"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 2. Cream Dollop (Top Right) */}
            <div className="floating-topping float-topping-2 absolute -top-4 right-8 sm:right-6">
              <svg width="74" height="74" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg">
                <path
                  d="M50 12 C52 24, 76 34, 78 52 C80 72, 68 84, 50 84 C32 84, 20 72, 22 52 C24 34, 48 24, 50 12 Z"
                  fill="#FFFDF5"
                  stroke="#F9A825"
                  strokeWidth="2.5"
                />
                <path
                  d="M48 24 C54 36, 68 46, 66 60 C64 74, 56 76, 50 76"
                  stroke="#FFE082"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3. Chocolate Drizzle Ribbon (Bottom Right) */}
            <div className="floating-topping float-topping-3 absolute bottom-6 right-2 sm:-right-4">
              <svg width="90" height="90" viewBox="0 0 120 120" fill="none" className="drop-shadow-xl">
                <path
                  d="M15 45 C35 15, 65 85, 95 35 C105 20, 115 50, 105 75 C95 100, 50 105, 30 85 C15 70, 5 60, 15 45 Z"
                  fill="#3E2723"
                  opacity="0.92"
                />
                <circle cx="85" cy="95" r="5" fill="#3E2723" />
                <circle cx="102" cy="80" r="3.5" fill="#3E2723" />
              </svg>
            </div>

            {/* 4. Roasted Hazelnut / Gold Flake (Bottom Left) */}
            <div className="floating-topping float-topping-4 absolute bottom-4 left-4 sm:left-8">
              <svg width="55" height="55" viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
                <path
                  d="M40 10 C58 10, 70 24, 70 42 C70 60, 56 72, 40 72 C24 72, 10 60, 10 42 C10 24, 22 10, 40 10 Z"
                  fill="#684226"
                />
                <path
                  d="M32 24 C45 20, 58 28, 54 44"
                  stroke="#F9A825"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
