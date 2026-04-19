"use client";

import { metrics } from "./data";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustMetrics() {
  const { t } = useLanguage();

  return (
    <section className="py-12 text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.labelKey}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
              >
                <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
                <span className="text-sm font-semibold">{m.value}</span>
                <span className="text-sm text-white/50">{t(m.labelKey)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}