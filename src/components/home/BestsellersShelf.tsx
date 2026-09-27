'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Check, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { BESTSELLERS, MenuItem } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export function BestsellersShelf() {
  const { addItem, items, setIsOpen } = useCartStore();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleQuickAdd = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      dietaryNotes: item.dietaryNotes,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-crepe-gold font-bold text-xs uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-strawberry-red fill-strawberry-red" />
            <span>House Signatures</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-house-brown dark:text-cream-whip tracking-tight">
            The Bestsellers Shelf
          </h2>
          <p className="text-sm md:text-base text-house-brown/80 dark:text-cream-whip/80 mt-2 max-w-xl">
            Our most craved artisanal creations, freshly flipped on cast iron griddles and packed warm for cash-at-the-door delivery.
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-house-brown dark:text-crepe-gold hover:text-strawberry-red transition-colors group"
        >
          <span>View Full 8-Creation Menu</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of 4 Signature Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BESTSELLERS.map((item) => {
          const isAdded = addedId === item.id;
          const cartItem = items.find((i) => i.id === item.id);

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group bg-white dark:bg-chocolate-glaze-card rounded-3xl p-4 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-whip mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {item.badge !== 'None' && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cream-whip/90 dark:bg-chocolate-glaze/90 text-chocolate-glaze dark:text-cream-whip backdrop-blur-md shadow-sm border border-house-brown/10">
                      {item.badge === "Chef's Choice" ? '★ Chef Choice' : item.badge}
                    </div>
                  )}

                  {/* Cart Quantity Badge if already added */}
                  {cartItem && cartItem.quantity > 0 && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-mint-leaf text-chocolate-glaze font-bold text-xs flex items-center justify-center shadow-md">
                      {cartItem.quantity}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-crepe-gold">
                    {item.categoryTitle}
                  </p>
                  <h3 className="font-display font-bold text-lg text-house-brown dark:text-cream-whip leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-house-brown/70 dark:text-cream-whip/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action & Price */}
              <div className="mt-5 pt-3 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] block text-house-brown/60 dark:text-cream-whip/60">Price</span>
                  <span className="font-display font-bold text-lg text-house-brown dark:text-cream-whip">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <motion.button
                  onClick={() => handleQuickAdd(item)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className={`px-4 py-2.5 rounded-full font-body font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                    isAdded
                      ? 'bg-mint-leaf text-chocolate-glaze'
                      : 'bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze'
                  }`}
                  aria-label={`Add ${item.name} to order`}
                >
                  {isAdded ? (
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
        })}
      </div>
    </section>
  );
}
