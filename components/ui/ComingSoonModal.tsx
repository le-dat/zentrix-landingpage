"use client";

import React, { useEffect, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type ModalStatus = "idle" | "loading" | "success" | "error";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ComingSoonModalContent({
  onClose,
}: Pick<ComingSoonModalProps, "onClose">) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<ModalStatus>("idle");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // For demo, randomly succeed or fail
    const success = Math.random() > 0.3;
    setStatus(success ? "success" : "error");
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  const showContent = status === "idle" || status === "loading";
  const showSuccess = status === "success";
  const showError = status === "error";

  return (
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
            className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 hover:cursor-pointer transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Icon */}
          {showContent && (
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
          )}

          {showSuccess && (
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 md:mb-5 lg:mb-6 animate-success-pop">
              <Check className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-emerald-400 animate-checkmark" />
            </div>
          )}

          {showError && (
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-4 md:mb-5 lg:mb-6 animate-success-pop">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-400 animate-checkmark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 md:mb-2 lg:mb-3">
            {showSuccess
              ? t("modal.successTitle")
              : showError
              ? t("modal.errorTitle")
              : t("modal.comingSoon")}
          </h3>

          {/* Description */}
          <p className="text-[11px] md:text-sm lg:text-base text-white/60 leading-relaxed mb-4 md:mb-5 lg:mb-6 max-w-[260px]">
            {showSuccess
              ? t("modal.successMessage")
              : showError
              ? t("modal.errorMessage")
              : t("modal.comingSoonDesc")}
          </p>

          {/* Idle state - Email form */}
          {status === "idle" && (
            <div className="w-full space-y-2 md:space-y-3">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={t("modal.emailPlaceholder")}
                  className="w-full px-4 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#18CBA8]/50 transition-colors"
                />
                <button
                  type="button"
                  className="w-full px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-colors"
                  onClick={handleSubmit}
                >
                  {t("modal.notifyMe")}
                </button>
              </div>
              <p className="text-[10px] md:text-[11px] text-white/40">
                {t("modal.beFirst")}
              </p>
            </div>
          )}

          {/* Loading state */}
          {status === "loading" && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          )}

          {/* Success state */}
          {status === "success" && (
            <button
              type="button"
              className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-colors"
              onClick={onClose}
            >
              {t("modal.done")}
            </button>
          )}

          {/* Error state */}
          {status === "error" && (
            <button
              type="button"
              className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-red-500 text-white font-semibold text-sm hover:bg-red-400 hover:cursor-pointer transition-colors"
              onClick={handleRetry}
            >
              {t("modal.tryAgain")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
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

  if (!isOpen) return null;

  // Key forces remount when modal opens, resetting status to idle
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal - key resets state on open */}
      <ComingSoonModalContent
        key={isOpen ? "open" : "closed"}
        onClose={onClose}
      />
    </div>
  );
}
