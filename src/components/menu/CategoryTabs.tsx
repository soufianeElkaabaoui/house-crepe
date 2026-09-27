'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/data/mockData';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="sticky top-20 z-30 py-3 backdrop-blur-md bg-cream-whip/80 dark:bg-chocolate-glaze/80 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.slug;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive
                  ? 'text-chocolate-glaze dark:text-chocolate-glaze font-bold'
                  : 'text-house-brown/80 dark:text-cream-whip/80 hover:text-house-brown dark:hover:text-cream-whip bg-cream-whip-200/50 dark:bg-chocolate-glaze-card/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-crepe-gold rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
