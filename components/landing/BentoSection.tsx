"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const bentoCards = [
  {
    id: "pool",
    title: "Pool & explorer",
    description: "Track rebate accrual and every on-chain claim with hashes you can verify yourself.",
    image: "/images/glass-ring.png",
    size: "small",
  },
  {
    id: "dashboard",
    title: "Rebate dashboard",
    description: "Volume, settlement status, and balances across all linked brokers in one place.",
    size: "large",
  },
  {
    id: "reports",
    title: "Settlement clarity",
    description: "See when broker payouts landed, when rebates opened for claim, and what you withdrew.",
    size: "large",
  },
  {
    id: "wallet",
    title: "Wallet claims",
    description: "Withdraw to your BEP20 wallet with a clear, fixed fee — no opaque approvals.",
    image: "/images/glass-cone.png",
    size: "small",
  },
];

const MiniDashboard = () => (
  <div className="w-full h-full p-4 relative overflow-hidden flex flex-col gap-3">
    {/* Dashboard Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/80" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        <div className="w-2 h-2 rounded-full bg-green-500/80" />
      </div>
      <div className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
        zentrix.io
      </div>
    </div>
    {/* Dashboard Content Sidebar and Main */}
    <div className="flex gap-4 flex-1">
      <div className="w-1/3 flex flex-col gap-2">
        <div className="h-6 w-full rounded bg-white/10 border border-white/5 flex items-center px-2">
          <div className="w-2 h-2 rounded-sm bg-[#18CBA8] mr-2" />
          <div className="h-1 w-10 bg-white/20 rounded" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-full rounded bg-white/[0.03] flex items-center px-2 border border-white/0 group-hover:border-white/5">
            <div className="w-2 h-2 rounded-sm bg-white/10 mr-2" />
            <div className="h-1 w-8 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/5 p-3 flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 bg-white/20 rounded text-[10px] text-white/40 flex items-center">
              Rebates
            </div>
            <div className="h-2 w-8 bg-[#18CBA8]/20 rounded" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">10.15% <span className="text-[10px] text-[#18CBA8] font-medium">+5.8%</span></div>
          <div className="flex-1 flex items-end gap-1.5 mt-2">
            {[40, 60, 45, 70, 55, 80, 65, 45, 60].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                className="flex-1 bg-[#18CBA8]/20 rounded-t-sm" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MiniChart = () => (
  <div className="w-full h-full p-6 relative overflow-hidden flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-medium">Volume</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white/90">59.8K</span>
          <span className="text-[10px] text-[#18CBA8] font-medium">+10.7%</span>
        </div>
      </div>
      <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/30">
        ?
      </div>
    </div>
    <div className="flex-1 relative">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18CBA8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18CBA8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 50, 100, 150].map((y) => (
          <line 
            key={y} 
            x1="0" 
            y1={y} 
            x2="400" 
            y2={y} 
            stroke="white" 
            strokeOpacity="0.03" 
          />
        ))}
        {/* Chart Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M0 120 L50 115 L100 130 L150 90 L200 110 L250 120 L300 100 L350 110 L400 95"
          fill="none"
          stroke="#18CBA8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          d="M0 120 L50 115 L100 130 L150 90 L200 110 L250 120 L300 100 L350 110 L400 95 V150 H0 Z"
          fill="url(#chartGradient)"
        />
      </svg>
    </div>
  </div>
);

export function BentoSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#18CBA8]/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight max-w-[800px] mx-auto leading-[1.1]">
            One place to follow your rebates from broker payout to wallet — transparent by design.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: SEO goal setting (Small) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 group relative bg-[#0D0D0D] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-[480px] flex flex-col"
          >
            <div className="relative flex-1 flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#18CBA8]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-full h-full">
                <Image
                  src="/images/glass-ring.png"
                  alt="Rebate pool overview"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(24,203,168,0.2)] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="p-8 pt-0">
              <h3 className="text-xl font-semibold text-white mb-2">{bentoCards[0].title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light">{bentoCards[0].description}</p>
            </div>
          </motion.div>

          {/* Row 1: User-friendly dashboard (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 group relative bg-[#0D0D0D] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-[480px] flex flex-col"
          >
            <div className="relative flex-1 mt-8 ml-8 rounded-tl-3xl bg-[#0d2a24]/20 border-t border-l border-white/10 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(24,203,168,0.1),transparent_70%)]" />
               <MiniDashboard />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">{bentoCards[1].title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light max-w-[400px]">{bentoCards[1].description}</p>
            </div>
          </motion.div>

          {/* Row 2: Visual reports (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 group relative bg-[#0D0D0D] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-[480px] flex flex-col"
          >
             <div className="relative flex-1 mt-8 ml-8 rounded-tl-3xl bg-[#0d2a24]/20 border-t border-l border-white/10 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(24,203,168,0.1),transparent_70%)]" />
               <MiniChart />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">{bentoCards[2].title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light max-w-[400px]">{bentoCards[2].description}</p>
            </div>
          </motion.div>

          {/* Row 2: Smart Keyword Generator (Small) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-1 group relative bg-[#0D0D0D] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-[480px] flex flex-col"
          >
            <div className="relative flex-1 flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#18CBA8]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-full h-full">
                <Image
                  src="/images/glass-cone.png"
                  alt="Wallet claim flow"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(24,203,168,0.2)] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="p-8 pt-0">
              <h3 className="text-xl font-semibold text-white mb-2">{bentoCards[3].title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light">{bentoCards[3].description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
