import Aurora from "@/components/Aurora";
import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { GlassmorphismNav } from "@/components/glassmorphism-nav";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black">
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 h-full w-full">
          <Aurora colorStops={["#475569", "#94a3b8", "#ffffff"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
