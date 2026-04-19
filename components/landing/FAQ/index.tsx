"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "./data";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[826px] mx-auto px-6">
        <h2
          className="animate-fade-up text-[1.6rem] md:text-[36px] font-bold mb-4 text-center"
          style={{ animationDelay: "0ms" }}
        >
          {t("faq.title")}
        </h2>
        <p className="animate-fade-up text-center text-white/50 text-sm mb-12 max-w-lg mx-auto" style={{ animationDelay: "100ms" }}>
          {t("faq.subtitle")}
        </p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.titleKey}
              className="animate-fade-up rounded-xl bg-black/40 border border-white/5 overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-medium pr-4">{t(faq.titleKey)}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-xs text-white/60 leading-relaxed">
                    {t(faq.bodyKey)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}