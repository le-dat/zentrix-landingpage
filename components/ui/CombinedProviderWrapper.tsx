"use client";

import { ModalProvider } from "./ModalContext";
import { LanguageProvider } from "@/context/LanguageContext";

export function CombinedProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ModalProvider>{children}</ModalProvider>
    </LanguageProvider>
  );
}