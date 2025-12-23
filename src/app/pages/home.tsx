import { HeroSection } from "../components/hero-section";
import { ProblemSection } from "../components/problem-section";
import { SolutionSection } from "../components/solution-section";
import { InsightSection } from "../components/insight-section";
import { PilotCtaSection } from "../components/pilot-cta-section";
import { FAQSection } from "../components/faq-section";
import { Footer } from "../components/footer";
import { useEffect } from "react";

export function HomePage() {
  useEffect(() => {
    document.title = "Sentra — Know What Your Guests Want Before They Order";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content', 
      'Sentra helps bars and restaurants see guest demand in real time. Guests reserve prices. You see what\'s coming. No hardware required.'
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection onCtaClick={() => scrollToSection("pilot")} />
      <ProblemSection />
      <SolutionSection />
      <InsightSection />
      <PilotCtaSection />
      <FAQSection />
      <Footer />
    </>
  );
}