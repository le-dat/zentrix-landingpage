"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ComingSoonModal } from "./ComingSoonModal";

interface ModalContextValue {
  openComingSoon: () => void;
  closeComingSoon: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openComingSoon = useCallback(() => setIsOpen(true), []);
  const closeComingSoon = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ openComingSoon, closeComingSoon }}>
      {children}
      <ComingSoonModal isOpen={isOpen} onClose={closeComingSoon} />
    </ModalContext.Provider>
  );
}

export function useComingSoonModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useComingSoonModal must be used within ModalProvider");
  }
  return context;
}
