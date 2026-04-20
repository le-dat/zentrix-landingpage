"use client";

import dynamic from "next/dynamic";
import { WorldMapWrapper } from "@/components/ui/world-map-wrapper";
import { worldMapDots } from "@/data/world-map";
import {
  SkeletonNavbar,
  SkeletonHeroSection,
  SkeletonHowItWorks,
  SkeletonComparisonSection,
  SkeletonTrustTrader,
  SkeletonFooter,
  SkeletonFAQSection,
} from "@/components/ui/skeleton";

const Navbar = dynamic(() => import("@/components/landing/Navbar/index").then((m) => m.default), {
  loading: () => <SkeletonNavbar />,
});

const HeroSection = dynamic(() => import("@/components/landing/HeroSection").then((m) => m.HeroSection), {
  loading: () => <SkeletonHeroSection />,
});

const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks/index").then((m) => m.default), {
  loading: () => <SkeletonHowItWorks />,
});

const ComparisonSection = dynamic(() => import("@/components/landing/Comparison/index").then((m) => m.default), {
  loading: () => <SkeletonComparisonSection />,
});

const TrustTraderSection = dynamic(() => import("@/components/landing/TrustTrader/index").then((m) => m.default), {
  loading: () => <SkeletonTrustTrader />,
});

const FAQSection = dynamic(() => import("@/components/landing/FAQ/index").then((m) => m.default), {
  loading: () => <SkeletonFAQSection />,
});

const Footer = dynamic(() => import("@/components/landing/Footer/index").then((m) => m.default), {
  loading: () => <SkeletonFooter />,
});

export default function LandingPageClient() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
      {/* WorldMap background */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] z-0 pointer-events-none opacity-35 will-change-transform transform-gpu">
        <WorldMapWrapper
          className="h-full"
          dots={worldMapDots}
        />
      </div>

      <Navbar />

      <div
        className="relative"
        style={{
          backgroundImage: "url('/circle.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.8)_0%,transparent_80%)] pointer-events-none mix-blend-screen" />
        <HeroSection />
      </div>
      <HowItWorks />
      <ComparisonSection />
      <TrustTraderSection />
      <FAQSection />
      <Footer />
    </main>
  );
}