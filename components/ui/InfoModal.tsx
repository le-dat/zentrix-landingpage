"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleKey: string;
  contentKey: string;
}

export function InfoModal({ isOpen, onClose, titleKey, contentKey }: InfoModalProps) {
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

  const title = t(titleKey);
  const content = t(contentKey) as string;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[340px] md:max-w-lg lg:max-w-2xl max-h-[80vh] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl md:rounded-3xl bg-black/90 border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="relative px-4 py-4 md:px-6 md:py-5 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="text-base md:text-lg font-bold text-white pr-8">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="relative px-4 py-4 md:px-6 md:py-5 overflow-y-auto">
            <div className="text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
