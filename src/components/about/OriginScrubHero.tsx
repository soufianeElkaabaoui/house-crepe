'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Heart } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MANIFESTO_LINES = [
  'We started HOUSE CREPE with a quiet obsession: French crêpes deserved better than lukewarm street carts and soggy packaging.',
  'We wanted deep, golden blistered edges that stay crisp.',
  'We wanted stone-ground Sicilian pistachios instead of synthetic flavoring.',
  'We wanted authentic 24-hour slow fermented batter that melts into velvety satisfaction.',
  'And above all, we wanted a relationship of genuine trust with our community: no card paywalls, no upfront fees, just honest food brought warm to your doorstep, paid in cash when you see and smell the craft.',
];

export function OriginScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray('.scrub-line');

      lines.forEach((line: any) => {
        gsap.fromTo(
          line,
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
          <span>The Origin Manifesto</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-house-brown dark:text-cream-whip tracking-tight">
          Born from Fire, Flour & Patience
        </h1>
      </div>

      <div
        ref={textContainerRef}
        className="space-y-8 sm:space-y-12 bg-white dark:bg-chocolate-glaze-card p-8 sm:p-14 rounded-4xl border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused"
      >
        {MANIFESTO_LINES.map((line, index) => (
          <p
            key={index}
            className="scrub-line font-display text-xl sm:text-2xl md:text-3xl text-house-brown dark:text-cream-whip leading-snug tracking-tight"
          >
            {line}
          </p>
        ))}

        <div className="pt-8 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center justify-between text-xs text-house-brown/60 dark:text-cream-whip/60">
          <span>Parisian Heritage × Modern Disruptor</span>
          <span className="flex items-center gap-1 text-crepe-gold font-bold">
            <Heart className="w-3.5 h-3.5 fill-crepe-gold" /> The House Crepe Family
          </span>
        </div>
      </div>
    </section>
  );
}
