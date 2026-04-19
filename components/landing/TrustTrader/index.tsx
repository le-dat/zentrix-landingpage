"use client";

import React from "react";
import { testimonialsRow1, testimonialsRow2, Testimonial } from "./data";
import { useLanguage } from "@/context/LanguageContext";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "flex-shrink-0 w-[280px] md:w-[340px]",
        "p-4 rounded-xl",
        "bg-black/40 border border-white/10",
        "mx-1"
      )}
    >
      <blockquote className="text-sm leading-relaxed mb-4 text-white/90">
        &ldquo;{t(testimonial.quoteKey)}&rdquo;
      </blockquote>
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-white/60">{t(testimonial.roleKey)}</p>
      </div>
    </div>
  );
}

export default function TrustTraderSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <h2
          className="animate-fade-up text-[1.6rem] md:text-4xl font-bold mb-4 text-center"
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

        <div className="animate-fade-up space-y-4 relative" style={{ animationDelay: "200ms" }}>
          {/* Row 1 */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020103] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020103] to-transparent z-10 pointer-events-none" />
            <Marquee pauseOnHover>
              {testimonialsRow1.map((testimonial, i) => (
                <TestimonialCard key={`row1-${i}`} testimonial={testimonial} />
              ))}
            </Marquee>
          </div>
          {/* Row 2 */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020103] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020103] to-transparent z-10 pointer-events-none" />
            <Marquee reverse pauseOnHover>
              {testimonialsRow2.map((testimonial, i) => (
                <TestimonialCard key={`row2-${i}`} testimonial={testimonial} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}