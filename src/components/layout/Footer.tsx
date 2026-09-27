'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Clock, Phone, MessageCircle, Banknote, ShieldCheck, Heart } from 'lucide-react';
import { SITE_SETTINGS } from '@/data/mockData';

export function Footer() {
  const directWhatsAppUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    'Hello House Crepe! I would like to inquire about opening hours or orders.'
  )}`;

  return (
    <footer className="mt-24 border-t border-house-brown/15 dark:border-cream-whip/15 bg-cream-whip-50/70 dark:bg-chocolate-glaze/90 text-house-brown dark:text-cream-whip transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-crepe-gold flex items-center justify-center text-chocolate-glaze">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">HOUSE CREPE</span>
            </div>
            <p className="text-sm text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
              {SITE_SETTINGS.brandTagline} Handcrafted French crêpes, rested batter, artisanal Belgian chocolates, and savory galettes.
            </p>
            {/* COD Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crepe-gold/20 text-house-brown dark:text-crepe-gold text-xs font-semibold">
              <Banknote className="w-4 h-4 text-crepe-gold" />
              <span>Cash on Delivery Guaranteed</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg flex items-center gap-2 text-crepe-gold">
              <Clock className="w-4 h-4" /> Operating Hours
            </h4>
            <ul className="space-y-2 text-sm text-house-brown/80 dark:text-cream-whip/80">
              {SITE_SETTINGS.operatingHours.map((slot, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-medium">{slot.days}</span>
                  <span className="text-xs opacity-75">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Orders */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg flex items-center gap-2 text-crepe-gold">
              <MapPin className="w-4 h-4" /> The House Spot
            </h4>
            <p className="text-sm text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
              {SITE_SETTINGS.address}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${SITE_SETTINGS.phone}`}
                className="inline-flex items-center gap-2 text-sm text-house-brown dark:text-cream-whip hover:text-crepe-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-crepe-gold" />
                <span>{SITE_SETTINGS.phone}</span>
              </a>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-mint-leaf font-medium hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-mint-leaf text-mint-leaf" />
                <span>Order via WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Quick Nav & Trust Guarantee */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg text-crepe-gold">Gourmet Promise</h4>
            <ul className="space-y-2 text-sm text-house-brown/80 dark:text-cream-whip/80">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mint-leaf" />
                <span>24-Hour Cold Rested Batter</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mint-leaf" />
                <span>Zero Advance Payment Risk</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mint-leaf" />
                <span>100% Recyclable Eco-Packaging</span>
              </li>
            </ul>
            <div className="pt-4 flex gap-4 text-xs font-semibold text-house-brown/70 dark:text-cream-whip/70">
              <Link href="/menu" className="hover:underline">Menu</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-house-brown/10 dark:border-cream-whip/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-house-brown/60 dark:text-cream-whip/60">
          <p>© {new Date().getFullYear()} HOUSE CREPE. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-strawberry-red fill-strawberry-red inline" /> & hot cast iron.
          </p>
        </div>
      </div>
    </footer>
  );
}
