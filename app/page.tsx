import { BentoSection } from "@/components/landing/BentoSection";
import { TrustTraderSection } from "@/components/landing/TrustTraderSection";
import { PartnerSection } from "@/components/landing/PartnerSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { TrustMetrics } from "@/components/landing/TrustMetrics";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
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
      <PartnerSection />
      <TrustMetrics />
      <HowItWorks />
      {/* <FeaturesSection /> */}
      <ComparisonSection />
      <BentoSection />
      <TrustTraderSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
