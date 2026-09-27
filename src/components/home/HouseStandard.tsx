'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Clock, Award, Banknote, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STANDARDS = [
  {
    icon: Clock,
    title: '24-Hour Rested Batter',
    badge: 'Slow Fermentation',
    description:
      'We never rush the fold. Our artisanal batter chills undisturbed for 24 hours, yielding an exceptionally tender crumb, lace-thin crispy edges, and deep golden aroma.',
    highlight: 'Pure French unbleached flour & Madagascar bourbon vanilla.',
  },
  {
    icon: Award,
    title: 'Gourmet Local Toppings',
    badge: 'Zero Compromise',
    description:
      'Stone-ground Sicilian pistachios, velvety Italian hazelnut spreads, artisanal melted Gruyère, and seasonal berries sourced directly from regional growers.',
    highlight: 'No artificial syrups, hydrogenated fats, or preservatives.',
  },
  {
    icon: Banknote,
    title: 'Fresh COD Delivery',
    badge: 'Zero Risk Ordering',
    description:
      'Route your order directly to our WhatsApp kitchen. No upfront credit card, no digital friction. Pay our courier in cash at your door once you inspect the warm crêpes.',
    highlight: 'Transparent pricing with free Cash on Delivery handling.',
  },
];

export function HouseStandard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.standard-header', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.standard-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="standard-header text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
          <span>The House Philosophy</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-house-brown dark:text-cream-whip tracking-tight">
          The &quot;House&quot; Standard
        </h2>
        <p className="text-sm md:text-base text-house-brown/80 dark:text-cream-whip/80 mt-3 leading-relaxed">
          We reimagined the Parisian crêpe stand for modern gourmet disruptors: unapologetic portions, artisanal craft, and zero payment barrier.
        </p>
      </div>

      {/* 3 Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STANDARDS.map((standard, index) => {
          const Icon = standard.icon;
          return (
            <div
              key={index}
              className="standard-card relative bg-white dark:bg-chocolate-glaze-card rounded-3xl p-8 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze border border-house-brown/10 dark:border-cream-whip/10 flex items-center justify-center text-house-brown dark:text-crepe-gold shadow-sm">
                    <Icon className="w-7 h-7 text-crepe-gold" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-cream-whip dark:bg-chocolate-glaze text-house-brown dark:text-cream-whip px-3 py-1 rounded-full border border-house-brown/10">
                    {standard.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-house-brown dark:text-cream-whip mb-3">
                  {standard.title}
                </h3>
                <p className="text-sm text-house-brown/80 dark:text-cream-whip/80 leading-relaxed mb-6">
                  {standard.description}
                </p>
              </div>

              {/* Highlight footer */}
              <div className="pt-4 border-t border-house-brown/10 dark:border-cream-whip/10 text-xs font-semibold text-crepe-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{standard.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
