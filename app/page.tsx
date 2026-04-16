import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { CompaniesSection } from "@/components/landing/CompaniesSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

export default function SEOLandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020103] text-white overflow-hidden">
      {/* Navigation */}
      <LandingNav />

      {/* Hero */}
      <HeroSection />

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
