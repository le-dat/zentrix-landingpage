'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '@/context/LanguageContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleKey: string;
  contentKey: string;
}

export function InfoModal({ isOpen, onClose, titleKey, contentKey }: InfoModalProps) {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = t(titleKey);
  const content = t(contentKey) as string;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl h-full max-h-screen md:max-h-[90vh] bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 hover:cursor-pointer transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="text-sm sm:text-base text-zinc-300 leading-relaxed space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-white font-semibold mb-3 text-xl sm:text-2xl">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-white font-semibold mb-3 text-lg sm:text-xl">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-green-400 mb-4 leading-tight text-md capitalize">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => <h4 className="text-white font-semibold mb-3">{children}</h4>,
                p: ({ children }) => <p className="text-zinc-300 leading-7 mb-4">{children}</p>,
                strong: ({ children }) => (
                  <strong className="text-white font-medium">{children}</strong>
                ),
                li: ({ children }) => <li className="text-zinc-300 leading-6">{children}</li>,
                a: ({ children, href }) => (
                  <a href={href} className="text-green-400 no-underline hover:underline">
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-white/10" />,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-green-500 text-zinc-400">{children}</blockquote>
                ),
                code: ({ children }) => (
                  <code className="text-teal-300 bg-white/5 px-1.5 py-0.5 rounded">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-zinc-950 border border-white/10 mb-4">{children}</pre>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
