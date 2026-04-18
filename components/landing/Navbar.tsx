"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const scrolled = useScrolled(100);

  return (
    <nav
      className={cn(
        `fixed top-0 z-50 w-full transition-all duration-300 `,
        scrolled ? "backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto">
        <a href="#" className="shrink-0">
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-white/70 hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="px-5 py-2 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          Get started
        </button>
      </div>
    </nav>
  );
}
