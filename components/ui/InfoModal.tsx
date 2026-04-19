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
      className="fixed inset-0 z-[100] flex"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full h-full md:h-auto md:max-w-[340px] md:max-h-[80vh] md:mx-auto md:my-auto md:rounded-2xl lg:md:rounded-3xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full md:h-auto md:max-h-[80vh] bg-black/90 border-white/10 overflow-hidden shadow-2xl flex flex-col md:rounded-2xl lg:md:rounded-3xl">
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
          <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
            <div className="text-sm md:text-base text-white/70 leading-relaxed space-y-4
                         prose prose-invert prose-sm md:prose-base max-w-none
                         prose-headings:text-white prose-headings:font-bold
                         prose-p:text-white/70 prose-p:leading-relaxed
                         prose-strong:text-white prose-strong:font-semibold
                         prose-li:text-white/70 prose-li:leading-relaxed
                         prose-a:text-teal prose-a:no-underline hover:prose-a:underline
                         prose-hr:border-white/10">
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
