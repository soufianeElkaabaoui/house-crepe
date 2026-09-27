'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Moon, Sun, MessageCircle, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from './ThemeProvider';
import { SITE_SETTINGS } from '@/data/mockData';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { toggleCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const totalItems = getTotalItems();

  useEffect(() => {
    if (pathname !== '/') {
      setIsPastHero(true);
      return;
    }

    const checkHero = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) {
        setIsPastHero(window.scrollY > 600);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // While hero is visible on screen, rect.bottom > 80
      setIsPastHero(rect.bottom <= 80);
    };

    checkHero();
    window.addEventListener('scroll', checkHero, { passive: true });
    window.addEventListener('resize', checkHero, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkHero);
      window.removeEventListener('resize', checkHero);
    };
  }, [pathname]);

  const isTransparent = pathname === '/' && !isPastHero;

  const directWhatsAppUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    "Hello House Crepe! I'd like to ask a question or place a custom order."
  )}`;

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
      {/* Floating Pill Bar */}
      <nav
        className={`rounded-full px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-500 pointer-events-auto ${
          isTransparent
            ? 'bg-transparent border border-transparent shadow-none backdrop-blur-none'
            : 'backdrop-blur-xl bg-cream-whip/85 dark:bg-chocolate-glaze/85 border border-house-brown/15 dark:border-cream-whip/15 shadow-warm-diffused dark:shadow-dark-diffused'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm border border-house-brown/15 p-0.5 flex items-center justify-center transition-transform"
          >
            <Image
              src="/images/logo.png"
              alt="HOUSE CREPE Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span
              className={`font-display font-bold text-lg md:text-xl tracking-tight leading-none transition-colors ${
                isTransparent
                  ? 'text-cream-whip drop-shadow-md group-hover:text-crepe-gold'
                  : 'text-house-brown dark:text-cream-whip group-hover:text-crepe-gold'
              }`}
            >
              HOUSE CREPE
            </span>
            <span
              className={`hidden sm:inline text-[10px] font-medium tracking-wide uppercase transition-colors ${
                isTransparent
                  ? 'text-cream-whip/70 drop-shadow'
                  : 'text-house-brown/70 dark:text-cream-whip/70'
              }`}
            >
              Gourmet Disruptor
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 ${
            isTransparent
              ? 'bg-black/30 backdrop-blur-md border-white/10'
              : 'bg-cream-whip/60 dark:bg-chocolate-glaze-card/60 border-house-brown/10 dark:border-cream-whip/10'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-chocolate-glaze dark:text-chocolate-glaze'
                    : isTransparent
                    ? 'text-cream-whip/80 hover:text-crepe-gold drop-shadow-sm'
                    : 'text-house-brown/80 dark:text-cream-whip/80 hover:text-house-brown dark:hover:text-cream-whip'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-crepe-gold rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Direct WhatsApp Order Pill */}
          <motion.a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:inline-flex items-center gap-1.5 bg-mint-leaf hover:bg-mint-leaf-dark text-chocolate-glaze font-body font-semibold text-xs md:text-sm px-3.5 py-2 rounded-full shadow-sm transition-all"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-chocolate-glaze" />
            <span>WhatsApp</span>
          </motion.a>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              isTransparent
                ? 'bg-black/30 backdrop-blur-md border-white/15 text-cream-whip hover:bg-black/50'
                : 'bg-cream-whip dark:bg-chocolate-glaze-card border-house-brown/20 dark:border-cream-whip/20 text-house-brown dark:text-cream-whip hover:bg-crepe-gold/20'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-crepe-gold" />
            ) : (
              <Moon className="w-4 h-4 text-house-brown" />
            )}
          </motion.button>

          {/* Cart Drawer Trigger Pill */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full font-body font-semibold text-sm shadow-sm transition-colors ${
              isTransparent
                ? 'bg-crepe-gold hover:bg-crepe-gold-light text-chocolate-glaze shadow-crepe-glow'
                : 'bg-house-brown dark:bg-crepe-gold text-cream-whip dark:text-chocolate-glaze'
            }`}
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-strawberry-red text-white text-[11px] font-bold flex items-center justify-center leading-none"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              isTransparent
                ? 'bg-black/30 backdrop-blur-md border-white/15 text-cream-whip'
                : 'bg-cream-whip dark:bg-chocolate-glaze-card border-house-brown/20 dark:border-cream-whip/20 text-house-brown dark:text-cream-whip'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 bg-cream-whip dark:bg-chocolate-glaze border border-house-brown/15 dark:border-cream-whip/15 rounded-3xl p-4 shadow-warm-hover dark:shadow-dark-hover flex flex-col gap-2 pointer-events-auto"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-full text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-crepe-gold text-chocolate-glaze font-bold'
                      : 'text-house-brown dark:text-cream-whip hover:bg-cream-whip-200 dark:hover:bg-chocolate-glaze-card'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center justify-between">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mint-leaf hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <span className="text-xs text-house-brown/60 dark:text-cream-whip/60">
                Cash on Delivery
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
