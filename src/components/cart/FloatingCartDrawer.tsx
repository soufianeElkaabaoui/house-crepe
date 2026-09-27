'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  MapPin,
  User,
  MessageSquare,
  Banknote,
  CheckCircle2,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { SITE_SETTINGS } from '@/data/mockData';

export function FloatingCartDrawer() {
  const {
    items,
    customerName,
    deliveryAddress,
    specialInstructions,
    isOpen,
    setIsOpen,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    setCustomerName,
    setDeliveryAddress,
    setSpecialInstructions,
    getTotalPrice,
    getTotalItems,
    generateWhatsAppUrl,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleSendOrder = () => {
    if (items.length === 0) {
      setErrorNotice('Your order basket is currently empty.');
      return;
    }
    if (!customerName.trim()) {
      setErrorNotice('Please provide your name for delivery.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorNotice('Please provide your delivery address.');
      return;
    }

    setErrorNotice(null);
    const url = generateWhatsAppUrl(SITE_SETTINGS.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Bottom Pill Indicator (visible whenever there are items or when user wants to view cart) */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="pointer-events-auto bg-house-brown dark:bg-crepe-gold text-cream-whip dark:text-chocolate-glaze px-6 py-3.5 rounded-full shadow-crepe-glow flex items-center gap-4 border-2 border-crepe-gold/40 transition-shadow"
              aria-label="Review Order Basket"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-crepe-gold dark:bg-chocolate-glaze text-chocolate-glaze dark:text-crepe-gold flex items-center justify-center font-bold text-xs">
                  {totalItems}
                </div>
                <span className="font-display font-semibold text-sm tracking-wide">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              <div className="h-4 w-px bg-cream-whip/30 dark:bg-chocolate-glaze/30" />

              <span className="font-body font-bold text-base">
                Total: {formatPrice(totalPrice)}
              </span>

              <div className="h-4 w-px bg-cream-whip/30 dark:bg-chocolate-glaze/30" />

              <span className="text-xs font-semibold uppercase tracking-wider bg-strawberry-red text-white px-2.5 py-1 rounded-full">
                Review Order & COD →
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Drawer / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-chocolate-glaze/60 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-cream-whip dark:bg-chocolate-glaze text-house-brown dark:text-cream-whip shadow-2xl flex flex-col h-full rounded-l-4xl border-l border-house-brown/15 dark:border-cream-whip/15"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-house-brown/15 dark:border-cream-whip/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-crepe-gold flex items-center justify-center text-chocolate-glaze shadow-sm">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl tracking-tight leading-none">
                        Your Order
                      </h3>
                      <p className="text-xs text-house-brown/70 dark:text-cream-whip/70 mt-1 flex items-center gap-1">
                        <Banknote className="w-3.5 h-3.5 text-mint-leaf" />
                        Cash on Delivery • WhatsApp Routed
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-full bg-cream-whip-200 dark:bg-chocolate-glaze-card flex items-center justify-center text-house-brown dark:text-cream-whip hover:opacity-80"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Items Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 text-house-brown/60 dark:text-cream-whip/60">
                      <ShoppingBag className="w-16 h-16 stroke-[1.2] mb-3 text-crepe-gold" />
                      <p className="font-display text-lg font-semibold">Your order is empty</p>
                      <p className="text-xs mt-1 max-w-xs">
                        Explore our sweet crêpes, savory galettes, and specialty lattes to start your feast.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-chocolate-glaze-card rounded-2xl border border-house-brown/10 dark:border-cream-whip/10 shadow-sm"
                        >
                          {item.image && (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-cream-whip">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-semibold text-sm truncate text-house-brown dark:text-cream-whip">
                              {item.name}
                            </h4>
                            <p className="text-xs font-bold text-crepe-gold mt-0.5">
                              {formatPrice(item.price)} each
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-cream-whip-200 dark:bg-chocolate-glaze flex items-center justify-center text-house-brown dark:text-cream-whip hover:bg-crepe-gold transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-1.5 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-cream-whip-200 dark:bg-chocolate-glaze flex items-center justify-center text-house-brown dark:text-cream-whip hover:bg-crepe-gold transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between self-stretch">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-house-brown/40 dark:text-cream-whip/40 hover:text-strawberry-red transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm text-house-brown dark:text-cream-whip">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </motion.div>
                      ))}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={clearCart}
                          className="text-xs text-strawberry-red hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Clear basket
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Customer Delivery Details Form */}
                  {items.length > 0 && (
                    <div className="pt-4 space-y-3 border-t border-house-brown/15 dark:border-cream-whip/15">
                      <h4 className="font-display font-semibold text-sm flex items-center gap-1.5 text-crepe-gold">
                        <Sparkles className="w-4 h-4" /> Delivery Information (COD)
                      </h4>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-house-brown/80 dark:text-cream-whip/80">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-house-brown/50 dark:text-cream-whip/50" />
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-chocolate-glaze-card border border-house-brown/20 dark:border-cream-whip/20 focus:outline-none focus:ring-2 focus:ring-crepe-gold text-house-brown dark:text-cream-whip"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-house-brown/80 dark:text-cream-whip/80">
                          Delivery Address & Apt # *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-house-brown/50 dark:text-cream-whip/50" />
                          <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="e.g. 123 Rue Victor Hugo, Apt 4B"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-chocolate-glaze-card border border-house-brown/20 dark:border-cream-whip/20 focus:outline-none focus:ring-2 focus:ring-crepe-gold text-house-brown dark:text-cream-whip"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-house-brown/80 dark:text-cream-whip/80">
                          Special Instructions / Cutlery
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-house-brown/50 dark:text-cream-whip/50" />
                          <input
                            type="text"
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            placeholder="e.g. Ring doorbell, extra napkins"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-chocolate-glaze-card border border-house-brown/20 dark:border-cream-whip/20 focus:outline-none focus:ring-2 focus:ring-crepe-gold text-house-brown dark:text-cream-whip"
                          />
                        </div>
                      </div>

                      {errorNotice && (
                        <div className="p-2.5 bg-strawberry-red/10 border border-strawberry-red/30 rounded-xl text-xs text-strawberry-red font-medium">
                          {errorNotice}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Drawer Footer & Checkout */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-house-brown/15 dark:border-cream-whip/15 bg-white/50 dark:bg-chocolate-glaze-card/50 space-y-4">
                    <div className="space-y-1.5 text-xs text-house-brown/80 dark:text-cream-whip/80">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-mint-leaf font-medium">
                        <span>Cash on Delivery Handling</span>
                        <span>FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-house-brown dark:text-cream-whip pt-2 border-t border-house-brown/10 dark:border-cream-whip/10">
                        <span>Total Due Upon Arrival</span>
                        <span className="text-crepe-gold">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleSendOrder}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-mint-leaf hover:bg-mint-leaf-dark text-chocolate-glaze py-3.5 px-6 rounded-full font-display font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4 fill-chocolate-glaze" />
                      <span>Send Order to WhatsApp</span>
                    </motion.button>

                    <p className="text-[11px] text-center text-house-brown/60 dark:text-cream-whip/60 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mint-leaf inline" />
                      Pay cash at your door when the delivery arrives warm.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
