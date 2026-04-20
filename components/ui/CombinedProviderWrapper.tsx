"use client";

import { ModalProvider } from "@/context/ModalContext";
import { LanguageProvider } from "@/context/LanguageContext";

export function CombinedProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ModalProvider>{children}</ModalProvider>
    </LanguageProvider>
  );
}