"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

const languages = {
  en: "English",
  vi: "Tiếng Việt",
};

export function LanguageSwitcher({ locale }: { locale: string }) {
  const currentLang = languages[locale as keyof typeof languages] || languages.en;

  const setLanguage = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors text-sm font-medium border border-white/10">
        <span>{currentLang}</span>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="z-50 min-w-[140px] bg-[#101828] border border-white/10 rounded-xl shadow-2xl p-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {(Object.keys(languages) as Array<keyof typeof languages>).map((l) => (
            <DropdownMenu.Item
              key={l}
              onClick={() => setLanguage(l)}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer outline-none transition-colors ${
                locale === l
                  ? "bg-teal/10 text-teal font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {languages[l]}
              {locale === l && <Check className="w-4 h-4" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
