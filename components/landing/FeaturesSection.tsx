"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Link2, Share2, Wallet } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "On-chain transparency",
    description:
      "A public smart contract Pool. Every claim transaction has a tx hash verifiable on the block explorer.",
  },
  {
    icon: Building2,
    title: "Multi-broker support",
    description:
      "Connect multiple brokers under one account. All rebates consolidated in one place.",
  },
  {
    icon: Share2,
    title: "Clear referral network",
    description:
      "F1/F2/F3 referral tree with publicly visible rates. No hidden fees, no secret allocations.",
  },
  {
    icon: Wallet,
    title: "Easy withdrawals",
    description:
      "Claim to your BEP20 wallet with a fixed $0.50 fee per withdrawal. No manual approval required.",
  },
];

export function FeaturesSection() {
  return (
    <section id="why-zentrix" className="relative py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[1086px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[40px] md:text-[48px] font-bold leading-tight mb-4"
        >
          Why Zentrix
        </motion.h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl">
          Differentiated from traditional rebate programs — built for traders who want proof, not promises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#18CBA8]/10 flex items-center justify-center text-[#18CBA8]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
