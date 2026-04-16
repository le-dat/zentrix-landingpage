"use client";

import React from "react";
import { motion } from "framer-motion";

export function ClientsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[36px] font-bold mb-4 text-center"
        >
          Our clients
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-white/60 mb-16 max-w-[433px] mx-auto leading-relaxed"
        >
          Hear firsthand how our solutions have boosted online success for users like you.
        </motion.p>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex flex-col md:flex-row items-center gap-12 p-10 rounded-2xl bg-black/40 border border-white/5"
        >
          {/* Avatar placeholder */}
          <div className="relative w-[217px] h-[217px] shrink-0 rounded-xl bg-white/5" />

          {/* Green decorative circle */}
          <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[312px] h-[234px] rounded-full bg-[#17695d]/20 blur-[60px] pointer-events-none" />

          {/* Quote */}
          <div className="flex-1 text-center md:text-left">
            <blockquote className="text-xl leading-relaxed mb-8 text-white/90">
              &ldquo;This product has completely transformed how I manage my projects and deadlines&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">Talia Taylor</p>
              <p className="text-sm text-white/60">Digital Marketing Director @ Quantum</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}