import dynamic from "next/dynamic";
import { FAQSection } from "@/components/landing/FAQSection";
import { WorldMapWrapper } from "@/components/ui/world-map-wrapper";
import {
  SkeletonNavbar,
  SkeletonHeroSection,
  SkeletonHowItWorks,
  SkeletonComparisonSection,
  SkeletonTrustTrader,
  SkeletonFooter,
} from "@/components/ui/skeleton";

const Navbar = dynamic(() => import("@/components/landing/Navbar").then((m) => m.Navbar), {
  loading: () => <SkeletonNavbar />,
});

const HeroSection = dynamic(() => import("@/components/landing/HeroSection").then((m) => m.HeroSection), {
  loading: () => <SkeletonHeroSection />,
});

const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then((m) => m.HowItWorks), {
  loading: () => <SkeletonHowItWorks />,
});

const ComparisonSection = dynamic(() => import("@/components/landing/ComparisonSection").then((m) => m.ComparisonSection), {
  loading: () => <SkeletonComparisonSection />,
});

const TrustTraderSection = dynamic(() => import("@/components/landing/TrustTraderSection").then((m) => m.TrustTraderSection), {
  loading: () => <SkeletonTrustTrader />,
});

const Footer = dynamic(() => import("@/components/landing/Footer").then((m) => m.Footer), {
  loading: () => <SkeletonFooter />,
});

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
      {/* WorldMap background */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] z-0 pointer-events-none opacity-35 will-change-transform transform-gpu">
        <WorldMapWrapper
          className="h-full"
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: 34.0522, lng: -118.2437 },
            },
            {
              start: { lat: 23.5505, lng: -46.6333 },
              end: { lat: 1.3521, lng: 103.8198 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 25.2048, lng: 55.2708 },
            },
            {
              start: { lat: 35.6895, lng: 139.6917 },
              end: { lat: -33.8688, lng: 151.2093 },
            },
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 48.8566, lng: 2.3522 },
            },
            {
              start: { lat: 1.3521, lng: 103.8198 },
              end: { lat: 35.6895, lng: 139.6917 },
            },
          ]}
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
