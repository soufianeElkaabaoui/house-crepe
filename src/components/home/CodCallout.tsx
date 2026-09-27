'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Banknote, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_SETTINGS } from '@/data/mockData';

export function CodCallout() {
  const directWhatsAppUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    "Hello House Crepe! I'd like to order with Cash on Delivery."
  )}`;

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-cream-whip via-white to-cream-whip-200 dark:from-chocolate-glaze dark:via-chocolate-glaze-surface dark:to-chocolate-glaze-card rounded-4xl p-8 sm:p-12 md:p-16 border-2 border-crepe-gold/30 shadow-warm-hover dark:shadow-dark-hover">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-crepe-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-mint-leaf/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-mint-leaf/20 text-chocolate-glaze dark:text-mint-leaf px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Banknote className="w-4 h-4 text-mint-leaf" />
              <span>Frictionless Cash on Delivery (COD)</span>
            </div>

            <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-house-brown dark:text-cream-whip tracking-tight leading-tight">
              No online card needed. <br />
              <span className="text-crepe-gold">Pay in cash right at your door.</span>
            </h3>

            <p className="text-sm sm:text-base text-house-brown/80 dark:text-cream-whip/80 max-w-2xl leading-relaxed">
              We believe gourmet food ordering should be as warm and straightforward as walking into our kitchen. Simply pick your crêpes, click Send to WhatsApp, and pay our delivery courier in cash once your warm order is in your hands.
            </p>

            {/* 3 Step Features */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-house-brown/90 dark:text-cream-whip/90">
              <div className="flex items-center gap-2 bg-cream-whip/80 dark:bg-chocolate-glaze/80 p-3 rounded-2xl border border-house-brown/10">
                <CheckCircle2 className="w-4 h-4 text-mint-leaf flex-shrink-0" />
                <span>1. Customize order in 30s</span>
              </div>
              <div className="flex items-center gap-2 bg-cream-whip/80 dark:bg-chocolate-glaze/80 p-3 rounded-2xl border border-house-brown/10">
                <CheckCircle2 className="w-4 h-4 text-mint-leaf flex-shrink-0" />
                <span>2. Instant WhatsApp ping</span>
              </div>
              <div className="flex items-center gap-2 bg-cream-whip/80 dark:bg-chocolate-glaze/80 p-3 rounded-2xl border border-house-brown/10">
                <CheckCircle2 className="w-4 h-4 text-mint-leaf flex-shrink-0" />
                <span>3. Inspect & pay in cash</span>
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="lg:col-span-4 flex flex-col gap-4 items-start lg:items-center">
            <Link href="/menu" className="w-full">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-full text-center bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze font-display font-bold text-base py-4 px-8 rounded-full shadow-warm-diffused cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>Build Your COD Order</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>

            <motion.a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full text-center bg-mint-leaf hover:bg-mint-leaf-dark text-chocolate-glaze font-display font-bold text-sm py-3.5 px-6 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-chocolate-glaze" />
              <span>Direct WhatsApp Kitchen</span>
            </motion.a>

            <div className="flex items-center gap-1.5 text-[11px] text-house-brown/60 dark:text-cream-whip/60">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-leaf" />
              <span>Guaranteed warm delivery within 35 mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
