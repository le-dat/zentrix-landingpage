import React from "react";
import { cookies } from "next/headers";
import { defaultLocale, translations, type Locale } from "@/lib/translations";
import { NotFoundClient } from "@/components/ui/NotFoundClient";

export default async function NotFound() {
  const cookieStore = await cookies();
  const serverLocale = (cookieStore.get("locale")?.value as Locale | undefined) ?? defaultLocale;
  const messages = translations[serverLocale];
  const t = messages.NotFound;

  return <NotFoundClient t={t} />;
}
