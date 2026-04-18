import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { TrustTraderSection } from "@/components/landing/TrustTraderSection";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="h-[1000px]" />,
});

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
      {/* WorldMap background — absolute to top-0 so it scrolls with the page */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] z-0 pointer-events-none opacity-35 will-change-transform transform-gpu">
        <WorldMap
          className="h-full"
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska
              end: { lat: 34.0522, lng: -118.2437 }, // LA
            },
            {
              start: { lat: 23.5505, lng: -46.6333 }, // Sao Paulo
              end: { lat: 1.3521, lng: 103.8198 }, // Singapore
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 25.2048, lng: 55.2708 }, // Dubai
            },
            {
              start: { lat: 35.6895, lng: 139.6917 }, // Tokyo
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
            {
              start: { lat: 40.7128, lng: -74.006 }, // New York
              end: { lat: 48.8566, lng: 2.3522 }, // Paris
            },
            {
              start: { lat: 1.3521, lng: 103.8198 }, // Singapore
              end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
            },
          ]}
        />
      </div>

      <Navbar />

      {/* Hero radial glow + circle decoration */}
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
      {/* <BentoSection /> */}
      <TrustTraderSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
