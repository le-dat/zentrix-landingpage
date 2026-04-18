"use client";

import React from "react";
import Image from "next/image";
import { footerLinks, socials } from "./data";

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex-1 md:flex-initial min-w-[140px]">
      <h4 className="mb-4 font-semibold text-sm text-white/90">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <span className="cursor-pointer text-sm text-white/50 transition-colors duration-200 hover:text-white/80">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
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
            {Object.entries(footerLinks).map(([title, links]) => (
              <FooterLinkColumn key={title} title={title} links={links} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
