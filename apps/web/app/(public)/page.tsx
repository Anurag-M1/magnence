import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { PublicPageShell } from "@/components/public-page-shell";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function HomePage() {
  return (
    <PublicPageShell auroraSpeed={0.8}>
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
    </PublicPageShell>
  );
}
