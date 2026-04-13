import en from "../messages/en.json";
import vi from "../messages/vi.json";

export const translations = { en, vi } as const;

export type Locale = keyof typeof translations;

export type Messages = typeof en;

export const locales = ["en", "vi"] as const;

export const defaultLocale: Locale = "en";
