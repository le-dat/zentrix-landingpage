"use client";

import { metrics } from "./data";

export default function TrustMetrics() {
  return (
    <section className="py-12 text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2"
              >
                <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
                <span className="text-sm font-semibold">{m.value}</span>
                <span className="text-sm text-white/50">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
