'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Flame, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'The Batter',
    subtitle: '24-Hour Cold Rest & Aeration',
    description:
      'We combine organic French wheat flour, farm-fresh pasture eggs, churned butter, and whole milk with a gentle hand whisk. The batter is then rested at 4°C for 24 hours to relax the gluten fibers, ensuring a whisper-thin crêpe that bends like silk without tearing.',
    details: ['Organic unbleached flour', '24h chilled hydration', 'Whole Madagascar vanilla bean'],
    image: '/images/craft-batter.jpg',
  },
  {
    step: '02',
    title: 'The Cast Iron',
    subtitle: '220°C Seasoned Griddle & Rozell Sweep',
    description:
      'Our seasoned circular billig griddles are calibrated to exactly 220°C. With a single fluid rotation of the wooden T-spreader (rozell), the batter meets the iron in an unbroken concentric ripple, creating that signature golden lacing in under 45 seconds.',
    details: ['Cast iron heat retention', 'Artisanal rozell sweep', 'Crisp caramelized borders'],
    image: '/images/nutella-dream.jpg',
  },
  {
    step: '03',
    title: 'The Fold & Finish',
    subtitle: 'Gourmet Fillings & The Signature Triangle',
    description:
      'While the heat still courses through the crepe, we layer generous coatings of melted Belgian chocolate, stone-ground pistachios, or savory Swiss Gruyère with fresh truffles. Folded into our signature thermal pocket, your crêpe stays steaming hot till it reaches your hands.',
    details: ['Generous center fillings', 'Signature pocket fold', 'Steam-vented eco packaging'],
    image: '/images/truffle-melt.jpg',
  },
];

export function PinnedCraftSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop only pinned scroll choreography (screens > 1024px)
      mm.add('(min-width: 1024px)', () => {
        const steps = gsap.utils.toArray<HTMLElement>('.craft-step-content');
        const images = gsap.utils.toArray<HTMLElement>('.craft-step-image');

        // Set initial positions: first step visible, others hidden
        gsap.set(steps.slice(1), { opacity: 0, y: 40 });
        gsap.set(images.slice(1), { opacity: 0, scale: 0.92 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=2000',
            pin: pinSectionRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Step 1 -> Step 2
        tl.to(steps[0], { opacity: 0, y: -40, duration: 0.5 })
          .to(images[0], { opacity: 0, scale: 1.05, duration: 0.5 }, '<')
          .to(steps[1], { opacity: 1, y: 0, duration: 0.5 })
          .to(images[1], { opacity: 1, scale: 1, duration: 0.5 }, '<')
          // Step 2 -> Step 3
          .to(steps[1], { opacity: 0, y: -40, duration: 0.5, delay: 0.3 })
          .to(images[1], { opacity: 0, scale: 1.05, duration: 0.5 }, '<')
          .to(steps[2], { opacity: 1, y: 0, duration: 0.5 })
          .to(images[2], { opacity: 1, scale: 1, duration: 0.5 }, '<');
      });

      return () => mm.revert();
    },
    { scope: triggerRef }
  );

  return (
    <div ref={triggerRef} className="relative">
      <section
        ref={pinSectionRef}
        className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-crepe-gold" />
            <span>The 3-Step Ritual</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-house-brown dark:text-cream-whip tracking-tight">
            The Craft of the Fold
          </h2>
          <p className="text-sm md:text-base text-house-brown/80 dark:text-cream-whip/80 mt-2 max-w-xl">
            Watch the alchemy unfold: from raw batter to cast-iron perfection.
          </p>
        </div>

        {/* Desktop Container with Overlapping Scrub Steps */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center min-h-[480px]">
          {/* Left Text Narrative (relative stacked) */}
          <div className="col-span-6 relative h-[380px]">
            {CRAFT_STEPS.map((item, index) => (
              <div
                key={index}
                className="craft-step-content absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-crepe-gold mb-2">
                  <span className="w-6 h-6 rounded-full bg-crepe-gold text-chocolate-glaze flex items-center justify-center text-[10px]">
                    {item.step}
                  </span>
                  <span>{item.subtitle}</span>
                </div>

                <h3 className="font-display font-bold text-4xl text-house-brown dark:text-cream-whip mb-4">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base text-house-brown/80 dark:text-cream-whip/80 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold text-mint-leaf">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span className="text-house-brown dark:text-cream-whip">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Visual Image Stages (relative stacked) */}
          <div className="col-span-6 relative h-[420px] rounded-4xl overflow-hidden shadow-2xl border-4 border-crepe-gold/30 bg-cream-whip">
            {CRAFT_STEPS.map((item, index) => (
              <div
                key={index}
                className="craft-step-image absolute inset-0 w-full h-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-glaze/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white font-display font-bold text-xl drop-shadow-md">
                  Step {item.step} — {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Responsive Fallback */}
        <div className="lg:hidden space-y-12 mt-6">
          {CRAFT_STEPS.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-chocolate-glaze-card rounded-3xl p-6 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused space-y-4"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-cream-whip">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-crepe-gold">
                  Step {item.step} • {item.subtitle}
                </span>
                <h3 className="font-display font-bold text-2xl text-house-brown dark:text-cream-whip mt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-house-brown/80 dark:text-cream-whip/80 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-house-brown/10 dark:border-cream-whip/10">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs font-medium text-mint-leaf">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-house-brown dark:text-cream-whip">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
