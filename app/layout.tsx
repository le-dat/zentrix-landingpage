import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/translations";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zentrix",
  description: "Zentrix - Optimized Rebates for Traders",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const serverLocale = (cookieStore.get("locale")?.value as Locale | undefined) ?? defaultLocale;

  return (
    <html
      lang={serverLocale}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
