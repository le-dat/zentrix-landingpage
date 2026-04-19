"use client";

import React from "react";
import { testimonials } from "./data";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustTraderSection() {
  const { t } = useLanguage();
  const testimonial = testimonials[0];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <h2
          className="animate-fade-up text-[1.6rem] font-bold mb-4 text-center"
          style={{ animationDelay: "0ms" }}
        >
          {t("trustTrader.title")}
        </h2>

        <p
          className="animate-fade-up text-center text-white/60 mb-16 max-w-[480px] mx-auto leading-relaxed text-sm"
          style={{ animationDelay: "100ms" }}
        >
          {t("trustTrader.subtitle")}
        </p>

        <div
          className="animate-fade-up relative flex flex-col md:flex-row items-center gap-12 p-6 md:p-10 rounded-2xl bg-black/40 border border-white/5"
          style={{ animationDelay: "200ms" }}
        >
          <div
            className="relative w-[217px] h-[217px] shrink-0 rounded-xl bg-white/5"
            aria-hidden
          />

          <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[312px] h-[234px] rounded-full bg-[#17695d]/20 blur-[60px] pointer-events-none" />

          <div className="flex-1 text-center md:text-left">
            <blockquote className="text-sm leading-relaxed mb-8 text-white/90">
              &ldquo;{t(testimonial.quoteKey)}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-white/60">{t(testimonial.roleKey)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}