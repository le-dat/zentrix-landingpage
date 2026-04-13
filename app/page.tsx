import React from "react";
import { cookies } from "next/headers";
import { defaultLocale, type Locale, translations } from "@/lib/translations";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Benefits } from "@/components/landing/Benefits";
import { BrokerListing } from "@/components/landing/BrokerListing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale | undefined) ?? defaultLocale;
  const msgs = translations[locale];

  return (
    <main className="relative flex flex-col min-h-screen bg-white">
      <Header locale={locale} messages={msgs} />
      <Hero messages={msgs} />
      <StatsBar messages={msgs} />
      <Benefits messages={msgs} />
      <BrokerListing messages={msgs} />
      <FAQ messages={msgs} />
      <Footer messages={msgs} />
    </main>
  );
}