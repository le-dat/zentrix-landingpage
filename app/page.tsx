import { Benefits } from "@/components/landing/Benefits";
import { BrokerListing } from "@/components/landing/BrokerListing";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { defaultLocale, translations, type Locale } from "@/lib/translations";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale | undefined) ?? defaultLocale;
  const msgs = translations[locale];

  return (
    <main className="relative flex flex-col min-h-screen bg-white">
      <Hero messages={msgs} />
      <StatsBar messages={msgs} />
      <Benefits messages={msgs} />
      <BrokerListing messages={msgs} />
      <FAQ messages={msgs} />
    </main>
  );
}
