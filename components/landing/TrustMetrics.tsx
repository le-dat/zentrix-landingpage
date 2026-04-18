"use client";

import { BarChart3, Building2, Users, Wallet } from "lucide-react";

const metrics = [
  { value: "$12.4M+", label: "Volume", icon: BarChart3 },
  { value: "8,200+", label: "Traders", icon: Users },
  { value: "14", label: "Brokers", icon: Building2 },
  { value: "$680K+", label: "Rebates", icon: Wallet },
];

export function TrustMetrics() {
  return (
    <section className="py-12 text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2"
            >
              <m.icon className="h-4 w-4 text-emerald-400" aria-hidden />
              <span className="text-sm font-semibold">{m.value}</span>
              <span className="text-sm text-white/50">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
