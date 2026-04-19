"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { comparisons } from "./data";
import { useLanguage } from "@/context/LanguageContext";

export default function ComparisonSection() {
  const { t } = useLanguage();

  return (
    <section id="compare" className="relative py-24 overflow-hidden bg-black">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[1.6rem] md:text-5xl font-bold text-white mb-4">
            {t("comparison.title")}
          </h2>
          <p className="text-white/50 text-sm">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-3 md:py-6 md:px-4 text-left text-xs md:text-sm font-semibold text-white/40 uppercase tracking-widest">
                  {t("comparison.criteria")}
                </th>
                <th className="py-6 px-4 text-left text-sm font-semibold bg-[#18CBA8]/10 text-[#18CBA8] uppercase tracking-widest rounded-t-2xl">
                  {t("comparison.zentrix")}
                </th>
                <th className="py-4 px-3 md:py-6 md:px-4 text-left text-xs md:text-sm font-semibold text-white/40 uppercase tracking-widest">
                  {t("comparison.traditional")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, i) => (
                <tr
                  key={item.criteriaKey}
                  className="animate-fade-up border-b border-white/5 group"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <td className="py-6 px-3 md:py-8 md:px-4 text-white text-sm md:text-base font-medium">
                    {t(item.criteriaKey)}
                  </td>
                  <td className="py-6 px-3 md:py-8 md:px-4 text-xs md:text-sm bg-[#18CBA8]/5 font-semibold border-x border-[#18CBA8]/10">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 text-[#18CBA8] mt-1" />
                      {t(item.zentrixKey)}
                    </div>
                  </td>
                  <td className="py-6 px-3 md:py-8 md:px-4 text-xs md:text-sm text-white/40">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 shrink-0 text-red-500/50 mt-1" />
                      {t(item.traditionalKey)}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td />
                <td className="py-4 bg-[#18CBA8]/10 rounded-b-2xl border-x border-b border-[#18CBA8]/10" />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}