"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { footerLinkCategories, socials } from "./data";
import FooterLinkColumn from "./FooterLinkColumn";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8 md:mb-16">
          <div className="shrink-0 max-w-[140px] md:max-w-[200px]">
            <Image
              src="/logo.svg"
              alt="Zentrix"
              width={127}
              height={10}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          <div className="flex flex-1 justify-center gap-12 md:justify-end md:gap-16">
            {footerLinkCategories.map((cat) => (
              <FooterLinkColumn key={cat.titleKey} titleKey={cat.titleKey} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4">
          {socials.map((social) => (
            <a
              key={social.labelKey}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label={t(social.labelKey)}
            >
              <social.Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
