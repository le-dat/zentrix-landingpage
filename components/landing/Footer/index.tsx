'use client';

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { footerLinkCategories, socials } from './data';
import FooterLinkColumn from './FooterLinkColumn';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-12 md:py-20 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Logo + Links: vertical stack on mobile */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8 md:mb-16">
          {/* Logo */}
          <div className="shrink-0 max-w-[120px] md:max-w-[200px]">
            <Image
              src="/logo.svg"
              alt="Zentrix"
              width={127}
              height={10}
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          {/* Legal Links Column */}
          <div className="flex flex-1 md:justify-end">
            <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16">
              {footerLinkCategories.map((cat) => (
                <FooterLinkColumn key={cat.titleKey} titleKey={cat.titleKey} />
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center md:justify-start gap-5 mb-8">
          {socials.map((social) => (
            <a
              key={social.labelKey}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center text-white/60 hover:text-white hover:cursor-pointer transition-colors"
              aria-label={t(social.labelKey)}
            >
              <social.Icon className="w-6 h-6 md:w-5 md:h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Zentrix. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
