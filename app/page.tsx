import { BentoSection } from "@/components/landing/BentoSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { CompaniesSection } from "@/components/landing/CompaniesSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingNav } from "@/components/landing/LandingNav";
import { TrustMetrics } from "@/components/landing/TrustMetrics";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
      {/* Navigation */}
      <LandingNav />
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
        {/* Hero */}
        <HeroSection />
      </div>

      <TrustMetrics />

      <HowItWorks />

      <FeaturesSection />

      <ComparisonSection />

      <BentoSection />

      <CompaniesSection />

      <ClientsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
