import en from "./en.json";
import vi from "./vi.json";

export const translations: Record<string, Record<string, unknown>> = { en, vi };
export const supportedLocales = ["en", "vi"] as const;
export type Locale = (typeof supportedLocales)[number];

const LOCALE_STORAGE_KEY = "zentrix-locale";

/**
 * Get translation by dotted key path, e.g. t('en', 'hero.headline')
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = translations[locale];
  for (const k of keys) {
    result = result?.[k];
  }
  return typeof result === "string" ? result : key;
}

/**
 * Get current locale from URL param (?lang=vi), localStorage, or browser language
 * For SSR: pass Astro.request.url (full URL string like 'http://localhost:4321/?lang=vi')
 */
export function getLocale(requestUrl?: string): Locale {
  if (requestUrl) {
    try {
      // Handle both absolute URLs and relative paths
      const url = requestUrl.startsWith("http")
        ? new URL(requestUrl)
        : new URL(requestUrl, "https://zentrix.io");
      const urlLang = url.searchParams.get("lang");
      if (urlLang && supportedLocales.includes(urlLang as Locale)) {
        return urlLang as Locale;
      }
    } catch {
      // Invalid URL, fall through to defaults
    }
  }
  // Client: check localStorage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && supportedLocales.includes(stored as Locale)) {
      return stored as Locale;
    }
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "vi") return "vi";
  }

  return "en";
}

/**
 * Set locale in localStorage
 */
export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

/**
 * Get text direction (both EN and VI are LTR)
 */
export function getDirection(_locale: Locale): "ltr" {
  return "ltr";
}

/**
 * Check if locale is supported
 */
export function isSupported(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}
