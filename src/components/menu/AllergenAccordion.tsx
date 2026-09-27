'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldAlert, Wheat, Nut, Milk, CheckCircle2 } from 'lucide-react';

export function AllergenAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-16 bg-white dark:bg-chocolate-glaze-card rounded-3xl border border-house-brown/12 dark:border-cream-whip/12 overflow-hidden shadow-warm-diffused dark:shadow-dark-diffused transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-cream-whip-50/50 dark:hover:bg-chocolate-glaze/30 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-crepe-gold/20 flex items-center justify-center text-crepe-gold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-house-brown dark:text-cream-whip">
              Dietary & Allergen Transparency
            </h3>
            <p className="text-xs text-house-brown/70 dark:text-cream-whip/70">
              Information on our gluten-free buckwheat flour, nut processing, and dairy substitutes.
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-house-brown dark:text-cream-whip"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-6 pt-2 border-t border-house-brown/10 dark:border-cream-whip/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
              {/* Gluten */}
              <div className="space-y-2 bg-cream-whip/50 dark:bg-chocolate-glaze/40 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  <Wheat className="w-4 h-4 text-crepe-gold" />
                  <h4>Gluten & Buckwheat Galettes</h4>
                </div>
                <p>
                  All our savory galettes are made exclusively with 100% stone-ground Brittany buckwheat flour (blé noir), which is naturally gluten-free.
                </p>
                <div className="flex items-center gap-1.5 text-mint-leaf font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gluten-free batter prepared on separate griddles.</span>
                </div>
              </div>

              {/* Nuts */}
              <div className="space-y-2 bg-cream-whip/50 dark:bg-chocolate-glaze/40 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  <Nut className="w-4 h-4 text-crepe-gold" />
                  <h4>Tree Nuts & Hazelnuts</h4>
                </div>
                <p>
                  We roast real Sicilian pistachios and Piedmont hazelnuts in our kitchen. Crêpes containing nuts are marked with dedicated badges.
                </p>
                <p className="text-[11px] text-strawberry-red">
                  ⚠️ Note: Cross-contact is strictly minimized, but shared ambient kitchen space exists.
                </p>
              </div>

              {/* Dairy */}
              <div className="space-y-2 bg-cream-whip/50 dark:bg-chocolate-glaze/40 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  <Milk className="w-4 h-4 text-crepe-gold" />
                  <h4>Dairy & Plant Alternatives</h4>
                </div>
                <p>
                  Our traditional sweet crêpe batter contains whole butter and milk. Specialty beverages and select galettes can be customized with organic oat milk or plant-based creams.
                </p>
                <div className="flex items-center gap-1.5 text-mint-leaf font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Specify in order notes via WhatsApp.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
