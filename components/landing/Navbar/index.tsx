"use client";

import React from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useComingSoonModal } from "@/components/ui/ModalContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const scrolled = useScrolled(100);
  const { openComingSoon } = useComingSoonModal();
  const { locale, setLocale, t } = useLanguage();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "vi" : "en");
  };

  const navItems = [
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#compare", label: t("nav.compare") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <nav
      className={cn(
        `fixed top-0 z-50 w-full transition-all duration-300 `,
        scrolled ? "backdrop-blur-lg md:backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="Zentrix"
            width={127}
            height={10}
            priority
            className="object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-1 border rounded-full border-white/10 p-1.5 bg-black/20">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="px-4 py-2 text-sm text-white/70 hover:text-emerald-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:border-white/20 transition-colors uppercase"
            aria-label="Toggle language"
          >
            {locale}
          </button>

          <button
            type="button"
            onClick={openComingSoon}
            className="px-5 py-2 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            {t("common.getStarted")}
          </button>
        </div>
      </div>
    </nav>
  );
}