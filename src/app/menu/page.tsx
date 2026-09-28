'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryTabs } from '@/components/menu/CategoryTabs';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { AllergenAccordion } from '@/components/menu/AllergenAccordion';
import { MENU_ITEMS, CATEGORIES } from '@/data/mockData';
import { Sparkles, Banknote } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const activeCategoryObj =
    CATEGORIES.find((c) => c.slug === selectedCategory) || CATEGORIES[0];

  return (
    <div className="pt-24 md:pt-32 pb-14 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
          <span>Artisanal Kitchen Catalog</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-house-brown dark:text-cream-whip tracking-tight leading-tight">
          Gourmet Crêpe Menu
        </h1>
        <p className="mt-3 text-base sm:text-lg text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
          Every crêpe is freshly prepared on heavy cast-iron griddles to order. Choose your favorite sweet folds or crisp buckwheat galettes, add to order, and receive it warm with Cash on Delivery.
        </p>
      </div>

      {/* Sticky Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Category Subtitle Info */}
      <div className="mt-6 mb-8 flex items-center justify-between text-xs text-house-brown/70 dark:text-cream-whip/70">
        <p className="font-medium">
          Showing <span className="font-bold text-crepe-gold">{filteredItems.length}</span> items in{' '}
          <span className="font-semibold">{activeCategoryObj.title}</span> — {activeCategoryObj.description}
        </p>
        <span className="hidden sm:inline-flex items-center gap-1 text-mint-leaf font-semibold">
          <Banknote className="w-3.5 h-3.5" />
          Zero Prepayment • Pay Cash at Door
        </span>
      </div>

      {/* Catalog Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Dietary & Allergen Accordion */}
      <AllergenAccordion />
    </div>
  );
}
