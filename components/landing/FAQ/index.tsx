'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from './data';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<boolean[]>(new Array(faqs.length).fill(false));

  return (
    <section id="faq" className="relative py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[826px] mx-auto px-6">
        <h2
          className="animate-fade-up text-[1.6rem] md:text-[36px] font-bold mb-4 text-center"
          style={{ animationDelay: '0ms' }}
        >
          {t('faq.title')}
        </h2>
        <p
          className="animate-fade-up text-center text-white/50 text-sm mb-12 max-w-lg mx-auto"
          style={{ animationDelay: '100ms' }}
        >
          {t('faq.subtitle')}
        </p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.titleKey}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                className="w-full rounded-xl bg-black/40 group border border-white/5 overflow-hidden transition-all duration-300 hover:bg-white/5"
                type="button"
                onClick={() => {
                  setOpenItems((prev) => {
                    const next = [...prev];
                    next[i] = !next[i];
                    return next;
                  });
                }}
                aria-expanded={openItems[i]}
                aria-controls={`faq-content-${i}`}
                id={`faq-trigger-${i}`}
              >
                <div className="w-full flex items-center justify-between p-6 text-left cursor-pointer">
                  <span className="text-sm font-medium pr-4">{t(faq.titleKey)}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 shrink-0 transition-all duration-300 ease-out text-white/60 group-hover:text-white',
                      openItems[i] ? 'rotate-180' : ''
                    )}
                  />
                </div>
                <div
                  id={`faq-content-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    openItems[i] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-6 text-xs text-white/60 leading-relaxed text-left">
                    {t(faq.bodyKey)}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
