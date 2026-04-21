'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { ComingSoonModal } from '@/components/ui/ComingSoonModal';
import { InfoModal } from '@/components/ui/InfoModal';

type InfoModalContentKey =
  | 'modal.infoModal.aboutUs'
  | 'modal.infoModal.privacyPolicy'
  | 'modal.infoModal.riskWarning';

interface ModalContextValue {
  openComingSoon: () => void;
  closeComingSoon: () => void;
  openInfoModal: (contentKey: InfoModalContentKey) => void;
  closeInfoModal: () => void;
  isInfoModalOpen: boolean;
  infoModalContentKey: InfoModalContentKey;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoContentKey, setInfoContentKey] =
    useState<InfoModalContentKey>('modal.infoModal.aboutUs');

  const openComingSoon = useCallback(() => setIsComingSoonOpen(true), []);
  const closeComingSoon = useCallback(() => setIsComingSoonOpen(false), []);

  const openInfoModal = useCallback((contentKey: InfoModalContentKey) => {
    setIsInfoOpen(true);
    setInfoContentKey(contentKey);
  }, []);
  const closeInfoModal = useCallback(() => setIsInfoOpen(false), []);

  return (
    <ModalContext.Provider
      value={{
        openComingSoon,
        closeComingSoon,
        openInfoModal,
        closeInfoModal,
        isInfoModalOpen: isInfoOpen,
        infoModalContentKey: infoContentKey,
      }}
    >
      {children}
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={closeComingSoon} />
      <InfoModal
        isOpen={isInfoOpen}
        onClose={closeInfoModal}
        titleKey={`${infoContentKey}.title`}
        contentKey={`${infoContentKey}.body`}
      />
    </ModalContext.Provider>
  );
}

export function useComingSoonModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useComingSoonModal must be used within ModalProvider');
  }
  return context;
}

export function useInfoModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useInfoModal must be used within ModalProvider');
  }
  return {
    openInfoModal: context.openInfoModal,
    closeInfoModal: context.closeInfoModal,
    isInfoModalOpen: context.isInfoModalOpen,
    infoModalContentKey: context.infoModalContentKey,
  };
}
