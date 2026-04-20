"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useComingSoonModal } from "@/components/ui/ModalContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function Navbar() {
  const scrolled = useScrolled(100);
  const { openComingSoon } = useComingSoonModal();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#compare", label: t("nav.compare") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={cn(
        `fixed top-0 z-50 w-full transition-all duration-300 `,
        scrolled ? "backdrop-blur-lg md:backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-[1200px] mx-auto">
        {/* Logo */}
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
            width={110}
            height={10}
            priority
            className="object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 border rounded-full border-white/10 p-1.5 bg-black/20">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="px-4 py-2 text-sm text-white/70 hover:text-emerald-400 hover:cursor-pointer transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={openComingSoon}
            className="px-5 py-2 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            {t("common.getStarted")}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-black/90 backdrop-blur-lg border-t border-white/10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="block px-4 py-3 text-sm text-white/70 hover:text-emerald-400 hover:bg-white/5 hover:cursor-pointer rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openComingSoon}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 hover:cursor-pointer transition-colors"
          >
            {t("common.getStarted")}
          </button>
        </div>
      </div>
    </nav>
  );
}
