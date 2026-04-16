"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[1165px] overflow-hidden mt-[82px]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/10 mb-8"
        >
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-black">NEW</span>
          <span className="text-sm text-white/90">Latest integration just arrived</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-[72px] font-bold leading-[1.1] tracking-tight max-w-[586px]"
        >
          Boost your rankings with AI.
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-lg text-white/70 max-w-[544px] leading-relaxed"
        >
          Elevate your site&apos;s visibility effortlessly with AI, where smart technology meets SEO expertise.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl">
            Start for free
          </button>
        </motion.div>
      </div>
    </section>
  );
}