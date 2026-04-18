"use client";

import Image from "next/image";

import { FaLinkedin } from "react-icons/fa";
import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiThreads,
  SiX,
} from "react-icons/si";

const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Integration", "Updates", "FAQ", "Pricing"],
  Company: ["About", "Blog", "Careers", "Manifesto", "Press", "Contract"],
  Resources: ["Examples", "Community", "Guides", "Docs", "Press"],
  Legal: ["Privacy", "Terms", "Security"],
};

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="min-w-[120px]">
      <h4 className="mb-4 font-semibold">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <span className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const socials = [
  { Icon: SiFacebook, label: "Facebook", href: "https://www.facebook.com/zentrix6868" },
  { Icon: SiX, label: "X", href: "https://x.com/Zentrixfund" },
  { Icon: SiInstagram, label: "Instagram", href: "https://www.instagram.com/zentrixfund" },
  { Icon: SiThreads, label: "Threads", href: "https://www.threads.com/@zentrixfund" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/zentrix6886" },
  { Icon: SiTelegram, label: "Telegram", href: "https://t.me/zentrix6868" },
];

export function Footer() {
  return (
    <section className="relative py-20 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 mb-16">  
          <div className="shrink-0 max-w-[200px]">
            <Image
              src="/logo.svg"
              alt="Zentrix"
              width={127}
              height={10}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          <div className="flex flex-1 flex-wrap justify-end gap-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <FooterLinkColumn key={title} title={title} links={links} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
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
