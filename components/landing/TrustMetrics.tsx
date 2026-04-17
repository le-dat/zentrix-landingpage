"use client";

import { motion } from "framer-motion";
import { BarChart3, Building2, Users, Wallet } from "lucide-react";

const metrics = [
  {
    icon: BarChart3,
    value: "$12.4M+",
    label: "Total volume processed",
  },
  {
    icon: Users,
    value: "8,200+",
    label: "Active traders",
  },
  {
    icon: Building2,
    value: "14",
    label: "Integrated brokers",
  },
  {
    icon: Wallet,
    value: "$680K+",
    label: "Total rebates paid out",
  },
];

export function TrustMetrics() {
  return (
    <section className="relative box-content bg-black py-[120px] text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-10 text-center text-[15px] uppercase tracking-[0.2em] text-white/40">
          Trusted by traders who care where their fees go
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#18CBA8]/10 text-[#18CBA8]">
                <m.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">{m.value}</p>
              <p className="mt-1 text-sm text-white/50">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
