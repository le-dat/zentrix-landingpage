"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[340px] md:max-w-md animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl md:rounded-3xl bg-black/90 border border-white/10 overflow-hidden shadow-2xl">
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#18CBA8]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Content */}
          <div className="relative px-4 py-5 md:px-8 md:py-6 lg:p-10 flex flex-col items-center text-center">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Icon */}
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#18CBA8]/10 border border-[#18CBA8]/20 flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#18CBA8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 md:mb-2 lg:mb-3">
              {t("modal.comingSoon")}
            </h3>

            {/* Description */}
            <p className="text-[11px] md:text-sm lg:text-base text-white/60 leading-relaxed mb-4 md:mb-5 lg:mb-6 max-w-[260px]">
              {t("modal.comingSoonDesc")}
            </p>

            {/* Email signup placeholder */}
            <div className="w-full space-y-2 md:space-y-3">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={t("modal.emailPlaceholder")}
                  className="w-full px-4 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#18CBA8]/50 transition-colors"
                />
                <button
                  type="button"
                  className="w-full px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
                >
                  {t("modal.notifyMe")}
                </button>
              </div>
              <p className="text-[10px] md:text-[11px] text-white/40">
                {t("modal.beFirst")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}