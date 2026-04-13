"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Send, Link2 } from "lucide-react";

export function Footer({ messages }: { messages: Messages }) {
  return (
    <footer className="bg-[#101828] text-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                <Image 
                  src="/logo.png" 
                  alt="Zentrix" 
                  fill 
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight uppercase">Zentrix</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {t(messages, "Footer.tagline")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal transition-colors">
                <Link2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal transition-colors">
                <Link2 className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Trang chủ</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  {t(messages, "Navigation.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  {t(messages, "Navigation.whyZentrix")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">Pháp lý</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  {t(messages, "Footer.links.terms")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  {t(messages, "Footer.links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Liên hệ</h4>
            <p className="text-gray-400 mb-6">
              Bạn có thắc mắc? Đừng ngần ngại liên hệ với chúng tôi qua Telegram hỗ trợ 24/7.
            </p>
            <Link 
              href="https://t.me/zentrix_support" 
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-2xl font-bold transition-all"
            >
              <Send className="w-4 h-4" />
              Zentrix Support
            </Link>
          </div>
        </div>

        {/* Disclaimer Bottom */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 leading-relaxed max-w-5xl mx-auto mb-8">
            {t(messages, "Footer.disclaimer")}
          </p>
          <div className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">
            © 2026 Zentrix Network. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
