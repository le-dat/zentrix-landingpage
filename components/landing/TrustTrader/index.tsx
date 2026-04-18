"use client";

import React from "react";
import { motion } from "motion/react";
import { testimonials } from "./data";

export default function TrustTraderSection() {
  const t = testimonials[0];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[36px] font-bold mb-4 text-center"
        >
          What traders say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-white/60 mb-16 max-w-[480px] mx-auto leading-relaxed"
        >
          Rebates only matter if you can trust the numbers. Here&apos;s what our
          users focus on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex flex-col md:flex-row items-center gap-12 p-6 md:p-10 rounded-2xl bg-black/40 border border-white/5"
        >
          <div
            className="relative w-[217px] h-[217px] shrink-0 rounded-xl bg-white/5"
            aria-hidden
          />

          <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[312px] h-[234px] rounded-full bg-[#17695d]/20 blur-[60px] pointer-events-none" />

          <div className="flex-1 text-center md:text-left">
            <blockquote className="text-lg leading-relaxed mb-8 text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-white/60">{t.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
