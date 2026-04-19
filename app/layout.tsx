import { Inter } from "next/font/google";
import "./globals.css";
import { CombinedProviderWrapper } from "@/components/ui/CombinedProviderWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zentrix",
  description: "Zentrix - Optimized Rebates for Traders",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <CombinedProviderWrapper>{children}</CombinedProviderWrapper>
      </body>
    </html>
  );
}