import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { CompaniesSection } from "@/components/landing/CompaniesSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#020103] via-transparent to-transparent" />
        {/* Hero */}
        <HeroSection />
      </div>

      {/* Trusted companies */}
      <CompaniesSection />

      {/* Bento grid */}
      <BentoSection />

      {/* Features */}
      <FeaturesSection />

      {/* Testimonials */}
      <ClientsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
