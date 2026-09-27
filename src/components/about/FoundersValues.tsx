'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Users, HeartHandshake, ShieldCheck, Coffee } from 'lucide-react';

const VALUES = [
  {
    icon: Sparkles,
    title: 'Gourmet Disruptor',
    text: 'We abandon traditional pretension in favor of high-energy passion, oversized toppings, and transparent kitchen integrity.',
  },
  {
    icon: HeartHandshake,
    title: 'Doorstep Trust',
    text: 'By removing digital payment barriers with Cash on Delivery, we honor the age-old neighborhood contract between host and guest.',
  },
  {
    icon: Coffee,
    title: 'Community First',
    text: 'Every morning begins by greeting our local market grocers, dairy farmers, and coffee roasters. Real ingredients make real friends.',
  },
];

export function FoundersValues() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Founders Pillowy Arched Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Arched Frame */}
            <div className="relative aspect-[3/4] rounded-t-[10rem] rounded-b-4xl overflow-hidden shadow-2xl border-4 border-crepe-gold/40 bg-cream-whip">
              <Image
                src="/images/founders.jpg"
                alt="House Crepe Founders in the artisanal kitchen"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-glaze/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream-whip">
                <p className="text-xs uppercase tracking-widest text-crepe-gold font-bold">
                  Founders & Head Artisans
                </p>
                <h4 className="font-display font-bold text-2xl">Lina & Marc</h4>
                <p className="text-xs text-cream-whip/80 mt-1">
                  &quot;We don&apos;t just flip crêpes. We create moments of pure comfort you can share at home.&quot;
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-chocolate-glaze-card p-4 rounded-3xl shadow-warm-hover border border-house-brown/12 dark:border-cream-whip/12 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-full bg-crepe-gold/20 flex items-center justify-center text-crepe-gold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  100% Family-Owned
                </p>
                <p className="text-[11px] text-house-brown/60 dark:text-cream-whip/60">
                  Casablanca & Paris Roots
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Story & Values Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-crepe-gold" />
            <span>Community & Integrity</span>
          </div>

          <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-house-brown dark:text-cream-whip tracking-tight leading-tight">
            The &quot;House&quot; is Built On Genuine Hospitality.
          </h3>

          <p className="text-sm sm:text-base text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
            From our early days test-kneading buckwheat flour until late at night, we agreed on one thing: HOUSE CREPE would never compromise on authentic ingredients or treat customers like transactional numbers. 
          </p>
          <p className="text-sm sm:text-base text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
            Routing orders directly to WhatsApp allows us to answer questions, handle allergies personally, and deliver warm crêpes with a friendly human smile.
          </p>

          {/* 3 Values Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-chocolate-glaze-card p-5 rounded-3xl border border-house-brown/10 dark:border-cream-whip/10 shadow-sm space-y-2"
                >
                  <div className="w-9 h-9 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-crepe-gold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                    {val.title}
                  </h4>
                  <p className="text-xs text-house-brown/70 dark:text-cream-whip/70 leading-relaxed">
                    {val.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
