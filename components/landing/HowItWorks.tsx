"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, Play, Wallet } from "lucide-react";

const steps = [
  {
    title: "Connect Your Broker",
    description: "Sign up for a Zentrix account, complete KYC, and link your trading account (MT4/MT5).",
    icon: Link2,
  },
  {
    title: "Trade as Usual",
    description: "Keep trading on your broker as normal. Zentrix automatically records your volume and calculates your rebates.",
    icon: Play,
  },
  {
    title: "Receive Rebates to Your Wallet",
    description: "Rebates are allocated to your ledger and you can claim them to your BEP20 wallet at any time.",
    icon: Wallet,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/60 max-w-[600px] mx-auto">
            Three simple steps to start earning back from every trade you make.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#18CBA8]/10 via-[#18CBA8]/40 to-[#18CBA8]/10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-3xl bg-[#0D0D0D] border border-[#18CBA8]/20 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_20px_rgba(24,203,168,0.1)] group-hover:border-[#18CBA8]/40 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#18CBA8]/10 to-transparent rounded-3xl" />
                  <step.icon size={32} className="text-[#18CBA8]" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#18CBA8] text-black font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/50 leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
