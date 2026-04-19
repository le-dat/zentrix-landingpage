"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInfoModal } from "@/components/ui/ModalContext";
import { legalLinksItems } from "./data";

export default function FooterLinkColumn({
  titleKey,
}: {
  titleKey: string;
}) {
  const { t } = useLanguage();
  const { openInfoModal } = useInfoModal();
  const title = t(titleKey);

  if (!legalLinksItems) return null;

  return (
    <div className="flex-1 md:flex-initial min-w-[140px]">
      <h4 className="mb-4 font-semibold text-sm text-white/90">{title}</h4>
      <ul className="space-y-3">
        {legalLinksItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              onClick={() => {
                if (item.modalContentKey) {
                  openInfoModal(item.modalContentKey);
                }
              }}
              className="cursor-pointer text-sm text-white/50 transition-colors duration-200 hover:text-white/80 text-left"
            >
              {t(item.labelKey)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}