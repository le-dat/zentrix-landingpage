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
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto">
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
      <div className="hidden md:flex items-center gap-1 border rounded-full border-accent-foreground p-2">
        {navLinks.map((link) => (
          <button
            key={link.label}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white/90 hover:text-white transition-colors"
          >
            {link.label}
            {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <button className="px-5 py-2 rounded-full bg-[#00ff7f] text-black font-semibold text-sm hover:bg-[#00ff7f]/90 transition-colors">
        Join waitlist
      </button>
    </nav>
  );
}