"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="relative h-full max-h-[85vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full" />
              <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-4
                         prose prose-invert prose-base max-w-none
                         prose-headings:text-white prose-headings:font-semibold prose-headings:mb-3
                         prose-p:text-zinc-300 prose-p:leading-7
                         prose-strong:text-white prose-strong:font-medium
                         prose-li:text-zinc-300 prose-li:leading-6
                         prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
                         prose-hr:border-white/10
                         prose-blockquote:border-l-teal-500 prose-blockquote:text-zinc-400
                         prose-code:text-teal-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                         prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
