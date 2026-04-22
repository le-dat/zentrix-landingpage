'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { registerSubscriber, type ApiError } from '@/lib/api/notiApi';

// ─── Types ───────────────────────────────────────────────────────────────────

type ModalStatus = 'idle' | 'loading' | 'success' | 'error';

interface ModalState {
  status: ModalStatus;
  email: string;
  serverError: string;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

function useComingSoonModal(onClose: () => void) {
  const { t } = useLanguage();
  const [state, setState] = useState<ModalState>({ status: 'idle', email: '', serverError: '' });

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  const setEmail = (email: string) => setState((s) => ({ ...s, email }));
  const setStatus = (status: ModalStatus, serverError = '') =>
    setState((s) => ({ ...s, status, serverError }));

  const handleSubmit = async () => {
    if (!state.email.trim()) return;
    setStatus('loading');
    try {
      await registerSubscriber(state.email);
      setStatus('success');
    } catch (err) {
      const { message, statusCode } = err as ApiError & { statusCode?: number };
      // 409 (conflict) → already registered, treat as success
      if (statusCode === 409) {
        setStatus('success');
      } else {
        setStatus('error', message || t('modal.serverError'));
      }
    }
  };

  const handleRetry = () => setStatus('idle', '');

  return { ...state, t, setEmail, handleSubmit, handleRetry };
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ModalIcon({ status }: { status: ModalStatus }) {
  const icons = {
    idle: (
      <svg
        className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#18CBA8]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    loading: <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />,
    success: (
      <Check className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-emerald-400 animate-checkmark" />
    ),
    error: (
      <svg
        className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-400 animate-checkmark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  const styles = {
    idle: 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#18CBA8]/10 border border-[#18CBA8]/20',
    loading: 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-transparent border-0',
    success:
      'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-success-pop',
    error:
      'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-red-500/20 border border-red-500/30 animate-success-pop',
  };

  return (
    <div className={`${styles[status]} flex items-center justify-center mb-4 md:mb-5 lg:mb-6`}>
      {icons[status]}
    </div>
  );
}

function ModalTitle({
  status,
  t,
}: {
  status: ModalStatus;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const titles = {
    idle: t('modal.comingSoon'),
    loading: t('modal.comingSoon'),
    success: t('modal.successTitle'),
    error: t('modal.errorTitle'),
  };
  return (
    <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 md:mb-2 lg:mb-3">
      {titles[status]}
    </h3>
  );
}

function ModalDescription({
  status,
  t,
  serverError,
}: {
  status: ModalStatus;
  t: ReturnType<typeof useLanguage>['t'];
  serverError: string;
}) {
  const descriptions = {
    idle: t('modal.comingSoonDesc'),
    loading: '',
    success: t('modal.successMessage'),
    error: serverError || t('modal.errorMessage'),
  };
  return (
    <p className="text-[11px] md:text-sm lg:text-base text-white/60 leading-relaxed mb-4 md:mb-5 lg:mb-6 max-w-[260px]">
      {descriptions[status]}
    </p>
  );
}

// ─── Form states ─────────────────────────────────────────────────────────────

function IdleForm({
  email,
  setEmail,
  onSubmit,
  t,
}: {
  email: string;
  setEmail: (e: string) => void;
  onSubmit: () => void;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <div className="w-full space-y-2 md:space-y-3">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder={t('modal.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#18CBA8]/50 transition-colors"
        />
        <button
          type="button"
          className="w-full px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-colors"
          onClick={onSubmit}
        >
          {t('modal.notifyMe')}
        </button>
      </div>
      <p className="text-[10px] md:text-[11px] text-white/40">{t('modal.beFirst')}</p>
    </div>
  );
}

function LoadingForm() {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
    </div>
  );
}

function SuccessForm({
  onDone,
  t,
}: {
  onDone: () => void;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <button
      type="button"
      className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-colors"
      onClick={onDone}
    >
      {t('modal.done')}
    </button>
  );
}

function ErrorForm({
  onRetry,
  t,
}: {
  onRetry: () => void;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <button
      type="button"
      className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-red-500 text-white font-semibold text-sm hover:bg-red-400 hover:cursor-pointer transition-colors"
      onClick={onRetry}
    >
      {t('modal.tryAgain')}
    </button>
  );
}

// ─── Main content component ─────────────────────────────────────────────────

function ComingSoonModalContent({
  onClose,
}: Pick<{ isOpen: boolean; onClose: () => void }, 'onClose'>) {
  const modal = useComingSoonModal(onClose);

  return (
    <div
      className="relative w-full max-w-[340px] md:max-w-md animate-fade-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rounded-2xl md:rounded-3xl bg-black/90 border border-white/10 overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#18CBA8]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative px-4 py-5 md:px-8 md:py-6 lg:p-10 flex flex-col items-center text-center">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 hover:cursor-pointer transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Icon */}
          <ModalIcon status={modal.status} />

          {/* Title */}
          <ModalTitle status={modal.status} t={modal.t} />

          {/* Description */}
          <ModalDescription status={modal.status} t={modal.t} serverError={modal.serverError} />

          {/* Forms by status */}
          {modal.status === 'idle' && (
            <IdleForm
              email={modal.email}
              setEmail={modal.setEmail}
              onSubmit={modal.handleSubmit}
              t={modal.t}
            />
          )}
          {modal.status === 'loading' && <LoadingForm />}
          {modal.status === 'success' && <SuccessForm onDone={onClose} t={modal.t} />}
          {modal.status === 'error' && <ErrorForm onRetry={modal.handleRetry} t={modal.t} />}
        </div>
      </div>
    </div>
  );
}

// ─── Modal wrapper ───────────────────────────────────────────────────────────

export function ComingSoonModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />
      {/* key prop forces remount when opening → resets status to idle */}
      <ComingSoonModalContent key={String(isOpen)} onClose={onClose} />
    </div>
  );
}
