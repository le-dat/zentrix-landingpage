"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    criteria: "Liquidity Transparency",
    traditional: "Internal balance, hard to verify externally",
    zentrix: "On-chain Pool, verifiable on explorer",
  },
  {
    criteria: "Fund Flow",
    traditional: "Internal transfers, non-public batches",
    zentrix: "Broker → Treasury → Pool → Wallet",
  },
  {
    criteria: "Reconciliation",
    traditional: "Mostly internal reporting",
    zentrix: "Broker + Ledger + Chain (3-way)",
  },
  {
    criteria: "Referral Allocation",
    traditional: "Limited audit tools",
    zentrix: "Ref tree + policy + public log",
  },
  {
    criteria: "Withdrawals",
    traditional: "Manual approval process",
    zentrix: "On-chain claim, fixed fee",
  },
];

export function ComparisonSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Zentrix vs Traditional</h2>
          <p className="text-white/50 text-lg">See how we are redefining transparency in the rebate industry.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-left text-sm font-semibold text-white/40 uppercase tracking-widest">Criteria</th>
                <th className="py-6 px-4 text-left text-sm font-semibold text-white/40 uppercase tracking-widest">Traditional Rebate</th>
                <th className="py-6 px-4 text-left text-sm font-semibold bg-[#18CBA8]/10 text-[#18CBA8] uppercase tracking-widest rounded-t-2xl">Zentrix</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, i) => (
                <motion.tr
                  key={item.criteria}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-white/5 group"
                >
                  <td className="py-8 px-4 text-white font-medium">{item.criteria}</td>
                  <td className="py-8 px-4 text-white/40 text-sm">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 shrink-0 text-red-500/50 mt-1" />
                      {item.traditional}
                    </div>
                  </td>
                  <td className="py-8 px-4 text-white text-sm bg-[#18CBA8]/5 font-semibold border-x border-[#18CBA8]/10">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 text-[#18CBA8] mt-1" />
                      {item.zentrix}
                    </div>
                  </td>
                </motion.tr>
              ))}
              <tr>
                <td />
                <td />
                <td className="py-4 bg-[#18CBA8]/10 rounded-b-2xl border-x border-b border-[#18CBA8]/10" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
