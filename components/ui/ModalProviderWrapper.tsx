"use client";

import { ModalProvider } from "./ModalContext";

export function ModalProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}
