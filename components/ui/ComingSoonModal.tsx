"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-3xl bg-black/90 border border-white/10 overflow-hidden shadow-2xl">
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#18CBA8]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Content */}
          <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[#18CBA8]/10 border border-[#18CBA8]/20 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-[#18CBA8]"
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
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Coming Soon!
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 max-w-[280px]">
              We are working hard to bring you the best trading fee rebate experience. Stay tuned!
            </p>

            {/* Email signup placeholder */}
            <div className="w-full space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#18CBA8]/50 transition-colors"
                />
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-[11px] text-white/40">
                Be the first to know when we launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
