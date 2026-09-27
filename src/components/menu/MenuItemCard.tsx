'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check, Sparkles, Info } from 'lucide-react';
import { MenuItem } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem, items } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);
  const cartItem = items.find((i) => i.id === item.id);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      dietaryNotes: item.dietaryNotes,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-chocolate-glaze-card rounded-3xl p-5 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused flex flex-col justify-between hover:shadow-warm-hover transition-all"
    >
      <div>
        {/* Dish Visual Container */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-whip mb-4">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge */}
          {item.badge !== 'None' && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cream-whip/95 dark:bg-chocolate-glaze/95 text-chocolate-glaze dark:text-cream-whip backdrop-blur-md shadow-sm border border-house-brown/10">
              {item.badge === "Chef's Choice" ? '★ Chef Choice' : item.badge}
            </div>
          )}

          {/* Current In-Cart Count */}
          {cartItem && cartItem.quantity > 0 && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-mint-leaf text-chocolate-glaze font-bold text-xs flex items-center justify-center shadow-md">
              {cartItem.quantity}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-crepe-gold">
              {item.categoryTitle}
            </span>
            {item.calories && (
              <span className="text-[10px] text-house-brown/50 dark:text-cream-whip/50 font-medium">
                {item.calories}
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-house-brown dark:text-cream-whip leading-tight">
            {item.name}
          </h3>

          <p className="text-xs text-house-brown/70 dark:text-cream-whip/70 leading-relaxed pt-1">
            {item.description}
          </p>

          {item.dietaryNotes && (
            <div className="pt-2 flex items-center gap-1 text-[11px] text-house-brown/60 dark:text-cream-whip/60">
              <Info className="w-3 h-3 text-crepe-gold flex-shrink-0" />
              <span className="truncate">{item.dietaryNotes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="mt-5 pt-3 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] block uppercase tracking-wider text-house-brown/50 dark:text-cream-whip/50">
            Price
          </span>
          <span className="font-display font-bold text-xl text-house-brown dark:text-cream-whip">
            {formatPrice(item.price)}
          </span>
        </div>

        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className={`px-4 py-2.5 rounded-full font-body font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
            justAdded
              ? 'bg-mint-leaf text-chocolate-glaze'
              : 'bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze'
          }`}
          aria-label={`Add ${item.name} to order`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add to Order</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
