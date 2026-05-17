'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ComingSoonModal } from '@/components/ui/ComingSoonModal';
import { InfoModal, type InfoModalContentKey } from '@/components/ui/InfoModal';

const KEY_MAP: Record<string, InfoModalContentKey> = {
  'about-us': 'modal.infoModal.aboutUs',
  aboutus: 'modal.infoModal.aboutUs',
  about: 'modal.infoModal.aboutUs',
  aboutUs: 'modal.infoModal.aboutUs',

  'privacy-policy': 'modal.infoModal.privacyPolicy',
  privacypolicy: 'modal.infoModal.privacyPolicy',
  privacy: 'modal.infoModal.privacyPolicy',
  privacyPolicy: 'modal.infoModal.privacyPolicy',

  'risk-warning': 'modal.infoModal.riskWarning',
  riskwarning: 'modal.infoModal.riskWarning',
  risk: 'modal.infoModal.riskWarning',
  riskWarning: 'modal.infoModal.riskWarning',
};

// Map Modal Content Key to SEO-friendly URL slug
const SLUG_MAP: Record<InfoModalContentKey, string> = {
  'modal.infoModal.aboutUs': 'about-us',
  'modal.infoModal.privacyPolicy': 'privacy-policy',
  'modal.infoModal.riskWarning': 'risk-warning',
};

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

    // Update URL slug in hash without scrolling the browser
    if (typeof window !== 'undefined') {
      const slug = SLUG_MAP[contentKey];
      if (slug) {
        const newHash = `#${slug}`;
        if (window.location.hash !== newHash) {
          window.history.pushState(null, '', newHash);
        }
      }
    }
  }, []);

  const closeInfoModal = useCallback(() => {
    setIsInfoOpen(false);

    // Clear hash from URL
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  // Listen for hash and query changes to auto-open matching modals
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleUrlChange = () => {
      const hash = window.location.hash.replace('#', '');
      const urlParams = new URLSearchParams(window.location.search);
      const modalParam = urlParams.get('modal');

      const slug = hash || modalParam;
      if (slug && KEY_MAP[slug]) {
        const targetKey = KEY_MAP[slug];
        setIsInfoOpen(true);
        setInfoContentKey(targetKey);
      } else {
        // Only close if it's currently open to avoid unnecessary re-renders
        setIsInfoOpen((prev) => {
          if (prev) return false;
          return prev;
        });
      }
    };

    // Run check on mount
    handleUrlChange();

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

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
        activeContentKey={infoContentKey}
        onSelectContentKey={openInfoModal}
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
