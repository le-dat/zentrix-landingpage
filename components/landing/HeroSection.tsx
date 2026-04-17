"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[1165px] overflow-hidden mt-[82px]">
      <div className="relative z-10 flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/10 mb-8"
        >
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-black">
            REBATES
          </span>
          <span className="text-sm text-white/90">On-chain transparent · No hidden intermediaries</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-4xl sm:text-5xl md:text-[56px] font-bold leading-[1.1] tracking-tight max-w-[520px] px-4 text-white"
        >
          Rebates on every trade.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-lg text-white/70 max-w-[560px] leading-relaxed px-4"
        >
          Zentrix standardizes the rebate flow from your broker directly to your wallet. Fully
          on-chain transparent. No hidden intermediaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl"
          >
            Get started
          </button>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#18CBA8] hover:text-[#29FFB5] transition-colors"
          >
            See how it works ↓
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Image
          src="/app.png"
          alt="Zentrix rebate dashboard preview"
          width={1200}
          height={600}
          className="w-full max-w-[1200px] mx-auto h-auto"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020103] via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
