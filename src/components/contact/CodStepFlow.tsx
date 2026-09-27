'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Utensils, MessageCircle, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Utensils,
    title: 'Select Flavors',
    description:
      'Browse our sweet crêpes, savory buckwheat galettes, and artisanal beverages. Add to your order basket with any personal dietary notes.',
  },
  {
    step: '02',
    icon: MessageCircle,
    title: 'Confirm via WhatsApp',
    description:
      'With one tap, your order, name, and address are pre-formatted into WhatsApp. Our team confirms immediately and sets the cast-iron spinning.',
  },
  {
    step: '03',
    icon: Banknote,
    title: 'Pay Cash on Delivery',
    description:
      'Our courier arrives with your insulated thermal crêpe pouch. Inspect your order and simply hand the cash to our delivery driver.',
  },
];

export function CodStepFlow() {
  return (
    <div className="mt-16 bg-cream-whip-50 dark:bg-chocolate-glaze-surface rounded-4xl p-8 sm:p-12 border border-house-brown/12 dark:border-cream-whip/12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-crepe-gold">
          Zero Friction Process
        </span>
        <h3 className="font-display font-bold text-3xl sm:text-4xl text-house-brown dark:text-cream-whip mt-1">
          How Cash on Delivery Works
        </h3>
        <p className="text-xs sm:text-sm text-house-brown/70 dark:text-cream-whip/70 mt-2">
          From screen to sweet indulgence in three easy steps with zero prepayment anxiety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-chocolate-glaze-card rounded-3xl p-6 border border-house-brown/10 dark:border-cream-whip/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-crepe-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-bold text-2xl text-crepe-gold/40">
                    {item.step}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-house-brown dark:text-cream-whip mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-house-brown/70 dark:text-cream-whip/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center gap-1.5 text-[11px] font-semibold text-mint-leaf">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Instant Confirmation</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/menu">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze px-8 py-3.5 rounded-full font-display font-bold text-sm shadow-warm-diffused cursor-pointer"
          >
            <span>Start Your Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
