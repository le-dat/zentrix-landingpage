'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Locale } from '@/types/locale';
import en from '@/messages/en.json';
import vi from '@/messages/vi.json';

type Messages = typeof en;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

// Default translation function for SSR/build
const defaultT = (key: string): string => key;

const LanguageContext = createContext<LanguageContextValue | null>(null);

const messages: Record<Locale, Messages> = { en, vi };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale');
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'vi';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let value: unknown = messages[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default value during SSR or when not wrapped
    return { locale: 'vi' as Locale, setLocale: () => {}, t: defaultT };
  }
  return context;
}
