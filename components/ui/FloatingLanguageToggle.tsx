"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingLanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    setLocale(locale === "en" ? "vi" : "en");
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="fixed bottom-6 left-6 z-50 flex items-center h-10 w-[120px] rounded-full border border-white/10 bg-black/40 backdrop-blur-lg overflow-hidden hover:border-white/20 hover:cursor-pointer transition-colors shadow-lg"
      aria-label="Toggle language"
    >
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[56px] rounded-full bg-emerald-500/30 transition-transform duration-200",
          locale === "vi" ? "translate-x-[60px]" : "translate-x-[2px]"
        )}
      />
      <div
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-200",
          locale === "en" ? "text-white font-semibold tracking-wide" : "text-white/50 font-normal tracking-wide"
        )}
      >
        EN
      </div>
      <div
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-200",
          locale === "vi" ? "text-white font-semibold tracking-wide" : "text-white/50 font-normal tracking-wide"
        )}
      >
        VI
      </div>
    </button>
  );
}
