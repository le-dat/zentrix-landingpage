"use client";

import React from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import type { Locale, Messages } from "@/lib/translations";

interface LayoutProps {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}

export function Layout({ children, locale, messages }: LayoutProps) {
  return (
    <div className="min-h-full flex flex-col">
      <Header locale={locale} messages={messages} />
      <main className="flex-1">{children}</main>
      <Footer messages={messages} />
    </div>
  );
}
