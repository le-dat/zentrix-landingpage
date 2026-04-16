"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Features", hasDropdown: true },
  { label: "Developers", hasDropdown: false },
  { label: "Company", hasDropdown: true },
  { label: "Blog", hasDropdown: false },
  { label: "Changelog", hasDropdown: false },
];

export function LandingNav() {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto">
      {/* Logo */}
      <Image
        src="/zentrix-logo.png"
        alt="Logo"
        width={127}
        height={10}
        className="object-contain"
        style={{ height: "auto" }}
      />

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 border rounded-full border-white/10 p-1.5 bg-black/20">
        {navLinks.map((link) => (
          <button
            key={link.label}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-emerald-400 transition-colors"
          >
            {link.label}
            {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <button className="px-5 py-2 rounded-full bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
        Join waitlist
      </button>
      </div>
    </nav>
  );
}