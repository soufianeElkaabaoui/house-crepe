'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_SETTINGS } from '@/data/mockData';

export function ContactInfo() {
  const [customMsg, setCustomMsg] = useState('');

  const generateWhatsAppDirectLink = () => {
    const text = customMsg.trim()
      ? customMsg.trim()
      : "Hello House Crepe! I'd like to check today's specials or ask a question.";
    return `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Location & Contact Details */}
      <div className="lg:col-span-7 bg-white dark:bg-chocolate-glaze-card rounded-4xl p-8 sm:p-10 border border-house-brown/12 dark:border-cream-whip/12 shadow-warm-diffused dark:shadow-dark-diffused flex flex-col justify-between">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-crepe-gold/20 text-house-brown dark:text-crepe-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-crepe-gold" />
            <span>Store Coordinates</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-house-brown dark:text-cream-whip tracking-tight">
            Come Visit or Call Us
          </h2>

          <div className="space-y-5 pt-2">
            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-crepe-gold flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  Physical Storefront
                </p>
                <p className="text-xs sm:text-sm text-house-brown/80 dark:text-cream-whip/80 mt-0.5">
                  {SITE_SETTINGS.address}
                </p>
                <p className="text-[11px] text-house-brown/60 dark:text-cream-whip/60 mt-0.5">
                  Complimentary parking & pickup bays available in front.
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-crepe-gold flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  Kitchen Hours
                </p>
                <div className="text-xs sm:text-sm text-house-brown/80 dark:text-cream-whip/80 mt-0.5 space-y-1">
                  {SITE_SETTINGS.operatingHours.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="font-medium">{h.days}:</span>
                      <span>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-cream-whip dark:bg-chocolate-glaze flex items-center justify-center text-crepe-gold flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-house-brown dark:text-cream-whip">
                  Direct Phone & Hotline
                </p>
                <a
                  href={`tel:${SITE_SETTINGS.phone}`}
                  className="text-xs sm:text-sm font-semibold text-crepe-gold hover:underline block mt-0.5"
                >
                  {SITE_SETTINGS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-house-brown/10 dark:border-cream-whip/10 flex items-center gap-2 text-xs text-mint-leaf font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Kitchen staff responds on WhatsApp within ~60 seconds during operating hours.</span>
        </div>
      </div>

      {/* Right: Large Interactive WhatsApp Chat Card */}
      <div className="lg:col-span-5 bg-gradient-to-br from-mint-leaf/20 via-cream-whip to-crepe-gold/20 dark:from-chocolate-glaze dark:via-chocolate-glaze-card dark:to-chocolate-glaze-surface rounded-4xl p-8 sm:p-10 border-2 border-mint-leaf/40 shadow-warm-hover dark:shadow-dark-hover flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-mint-leaf text-chocolate-glaze flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6 fill-chocolate-glaze" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-mint-leaf-dark dark:text-mint-leaf">
                Live Kitchen Line
              </span>
              <h3 className="font-display font-bold text-2xl text-house-brown dark:text-cream-whip">
                WhatsApp Direct Chat
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-house-brown/80 dark:text-cream-whip/80 leading-relaxed">
            Need a custom crêpe stack for a birthday? Have allergy questions? Or prefer ordering directly with our team? Send a quick WhatsApp message below:
          </p>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-house-brown/80 dark:text-cream-whip/80">
              Your Custom Message or Inquiry
            </label>
            <textarea
              rows={4}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="e.g. Bonjour! Can I get an extra jar of warm chocolate drizzle with my order?"
              className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-chocolate-glaze border border-house-brown/15 dark:border-cream-whip/15 focus:outline-none focus:ring-2 focus:ring-mint-leaf text-house-brown dark:text-cream-whip shadow-inner resize-none"
            />
          </div>
        </div>

        <div className="pt-6">
          <motion.a
            href={generateWhatsAppDirectLink()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-mint-leaf hover:bg-mint-leaf-dark text-chocolate-glaze py-4 px-6 rounded-full font-display font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4 fill-chocolate-glaze" />
            <span>Launch WhatsApp Conversation</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
