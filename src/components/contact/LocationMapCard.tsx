'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Train, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '@/data/mockData';

export function LocationMapCard() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `HOUSE CREPE ${SITE_SETTINGS.address}`
  )}`;

  return (
    <div className="mt-12 bg-white dark:bg-chocolate-glaze-card rounded-4xl p-6 sm:p-10 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
            <span>Find The Spot</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-house-brown dark:text-cream-whip">
            Location & Parking Map
          </h3>
        </div>

        <motion.a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze px-5 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wide shadow-sm"
        >
          <Navigation className="w-4 h-4" />
          <span>Open in Google Maps</span>
        </motion.a>
      </div>

      {/* Stylized Map Canvas Container */}
      <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-house-brown/15 dark:border-cream-whip/15 bg-gradient-to-tr from-cream-whip-200 via-cream-whip to-cream-whip-50 dark:from-chocolate-glaze dark:via-chocolate-glaze-surface dark:to-chocolate-glaze-card shadow-inner flex items-center justify-center">
        {/* Stylized Vector Roads & River */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Roads */}
          <path
            d="M-50,120 Q300,80 600,200 T1200,100"
            fill="none"
            stroke="#684226"
            strokeWidth="32"
          />
          <path
            d="M200,-50 L350,500"
            fill="none"
            stroke="#684226"
            strokeWidth="24"
          />
          <path
            d="M650,-20 L580,450"
            fill="none"
            stroke="#684226"
            strokeWidth="20"
          />
          <path
            d="M-20,280 Q500,250 1100,320"
            fill="none"
            stroke="#F9A825"
            strokeWidth="12"
          />
        </svg>

        {/* Central Pulse Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-16 h-16 rounded-full bg-crepe-gold/40 animate-ping" />
            <span className="absolute w-10 h-10 rounded-full bg-crepe-gold/60" />
            <div className="w-8 h-8 rounded-full bg-strawberry-red text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
          </div>
          <div className="mt-2 bg-chocolate-glaze text-cream-whip px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-md border border-crepe-gold/40 flex items-center gap-1.5">
            <span>HOUSE CREPE Flagship</span>
          </div>
        </div>
      </div>

      {/* Transit & Parking Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-house-brown/80 dark:text-cream-whip/80">
        <div className="flex items-center gap-3 p-3 bg-cream-whip/60 dark:bg-chocolate-glaze/40 rounded-2xl border border-house-brown/10">
          <Car className="w-5 h-5 text-crepe-gold flex-shrink-0" />
          <div>
            <p className="font-bold text-house-brown dark:text-cream-whip">Dedicated Parking</p>
            <p className="text-[11px] opacity-80">Free 45-min customer bays directly beside our pick-up entrance.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-cream-whip/60 dark:bg-chocolate-glaze/40 rounded-2xl border border-house-brown/10">
          <Train className="w-5 h-5 text-crepe-gold flex-shrink-0" />
          <div>
            <p className="font-bold text-house-brown dark:text-cream-whip">Public Transit</p>
            <p className="text-[11px] opacity-80">Victoria Metro Station, Exit 2 (3-minute leisurely walk).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
