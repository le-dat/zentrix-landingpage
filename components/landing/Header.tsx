"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Menu, X } from "lucide-react";

export function Header({ locale, messages }: { locale: string; messages: Messages }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t(messages, "Navigation.home"), href: "#" },
    { name: t(messages, "Navigation.howItWorks"), href: "#how-it-works" },
    { name: t(messages, "Navigation.whyZentrix"), href: "#why-zentrix" },
    { name: t(messages, "Navigation.faq"), href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="container mx-auto px-4 py-6">
        <nav
          className={`mx-auto flex items-center justify-between px-6 py-2 rounded-full border transition-all duration-300 pointer-events-auto bg-white/70 backdrop-blur-md dark:bg-[#101828]/70 ${
            isScrolled
              ? "max-w-[1000px] border-black/5 shadow-lg dark:border-white/10"
              : "max-w-[1200px] border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-30 h-14 overflow-hidden rounded-lg">
              <Image src="/logo.png" alt="Zentrix" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-teal transition-colors dark:text-gray-400 dark:hover:text-teal"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-teal text-white text-sm font-semibold hover:bg-dark-teal transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Log in
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-4 right-4 bg-white dark:bg-[#101828] rounded-3xl border border-gray-100 dark:border-white/10 shadow-2xl p-6 pointer-events-auto animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-white/10">
              <Link
                href="#contact"
                className="flex items-center justify-center w-full py-3 rounded-2xl bg-teal text-white font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Earning Rebates
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
