export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  impact: string;
  metrics: string[];
  services: string[];
  year: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "nexora-capital",
    name: "Nexora Capital",
    category: "Finance Platform",
    headline: "Premium investor-facing web platform for a modern capital firm.",
    summary:
      "A polished digital presence combining crisp editorial structure, trust-heavy visuals, and product-focused messaging for a high-value financial brand.",
    impact: "Sharper positioning, higher trust, and a cleaner path from first impression to qualified inquiry.",
    metrics: ["Clearer service positioning", "Higher-confidence lead flow", "Premium investor-facing presentation"],
    services: ["Brand-Led Web Design", "Frontend Development", "Copy Refinement", "Launch Support"],
    year: "2026",
  },
  {
    slug: "atlas-ops",
    name: "Atlas Ops",
    category: "Internal Operations",
    headline: "Operational dashboard experience for teams managing fast-moving client work.",
    summary:
      "A structured internal tool surface with performance-first implementation, clear data hierarchy, and maintainable UI systems for day-to-day execution.",
    impact: "Reduced friction for internal teams and created a more scalable workflow layer.",
    metrics: ["Faster internal updates", "Cleaner workflow visibility", "More maintainable frontend system"],
    services: ["UI Systems", "Dashboard Development", "Maintenance", "Workflow Improvements"],
    year: "2026",
  },
  {
    slug: "lume-studio",
    name: "Lume Studio",
    category: "Creative Brand Site",
    headline: "Editorial luxury-style site for a design-forward creative studio.",
    summary:
      "A refined portfolio experience with immersive layouts, elevated typography, and premium motion intended to position the brand at a higher tier of the market.",
    impact: "Improved perception, stronger portfolio storytelling, and a more premium lead funnel.",
    metrics: ["Higher perceived value", "Stronger portfolio clarity", "Sharper inquiry intent"],
    services: ["Creative Direction", "Website Development", "Editing", "Post-Launch Support"],
    year: "2025",
  },
  {
    slug: "northstar-advisory",
    name: "Northstar Advisory",
    category: "Professional Services",
    headline: "Corporate website refresh for a consulting brand moving upmarket.",
    summary:
      "A strategic rewrite and front-end refresh focused on confidence, authority, and a more executive-level presentation across all key pages.",
    impact: "More polished positioning and clearer communication across service lines.",
    metrics: ["Cleaner executive tone", "Stronger service communication", "Improved trust presentation"],
    services: ["Website Refresh", "Content Editing", "Information Architecture", "Support"],
    year: "2025",
  },
  {
    slug: "pulse-commerce",
    name: "Pulse Commerce",
    category: "Ecommerce Growth",
    headline: "High-conversion landing system for product launches and campaign cycles.",
    summary:
      "A modular page structure that allowed the team to launch campaigns faster while preserving a premium, brand-consistent aesthetic.",
    impact: "Faster launch cycles with cleaner marketing execution and easier maintenance.",
    metrics: ["Faster campaign rollout", "Easier content swaps", "Better consistency across launches"],
    services: ["Landing Pages", "Frontend Build", "Content Updates", "Retainer Support"],
    year: "2025",
  },
  {
    slug: "verve-health",
    name: "Verve Health",
    category: "Health & Wellness",
    headline: "Trust-focused digital presentation for a modern wellness company.",
    summary:
      "A precise visual and editorial refresh that balanced warmth with authority, helping the brand feel more established and professionally managed.",
    impact: "Stronger credibility and a noticeably more refined customer-facing experience.",
    metrics: ["Improved trust cues", "Clearer messaging", "More polished brand feel"],
    services: ["Design Refresh", "Editing", "Maintenance", "UX Improvements"],
    year: "2024",
  },
  {
    slug: "harbor-stay",
    name: "Harbor Stay",
    category: "Hospitality",
    headline: "Luxury hospitality website designed to raise perceived value before booking.",
    summary:
      "A cinematic booking-focused experience for a boutique stay brand, pairing premium layout rhythm with cleaner conversion points and elevated editorial pacing.",
    impact: "Improved premium perception and created a stronger direct-booking presentation.",
    metrics: ["Higher perceived quality", "Cleaner booking flow", "More premium brand story"],
    services: ["Hospitality Website", "UI Refinement", "Copy Editing", "Ongoing Maintenance"],
    year: "2024",
  },
  {
    slug: "cobalt-logistics",
    name: "Cobalt Logistics",
    category: "Logistics & Supply Chain",
    headline: "Corporate web refresh for a logistics company modernizing its market presence.",
    summary:
      "A cleaner, more authoritative digital system for a logistics operator that needed stronger trust signals, clearer service communication, and a maintainable web foundation.",
    impact: "Sharper enterprise positioning and a much more professional first impression for larger clients.",
    metrics: ["Stronger enterprise trust", "Clearer capability story", "Better maintainability"],
    services: ["Corporate Website", "Information Architecture", "Frontend Development", "Support"],
    year: "2024",
  },
  {
    slug: "solis-legal",
    name: "Solis Legal",
    category: "Legal Services",
    headline: "Executive-style digital presence for a modern law and advisory practice.",
    summary:
      "A restrained, high-credibility site balancing clarity, seriousness, and polish, with content editing support to improve trust and readability across practice areas.",
    impact: "More refined authority online and stronger communication for high-trust services.",
    metrics: ["Higher authority perception", "Better readability", "Stronger professional presence"],
    services: ["Professional Services Web Design", "Editing", "Content Strategy", "Maintenance"],
    year: "2023",
  },
  {
    slug: "terraforge-industrial",
    name: "Terraforge Industrial",
    category: "Industrial & Manufacturing",
    headline: "Industrial brand website that translates complex capability into premium clarity.",
    summary:
      "A heavy-industry web experience focused on making technical capabilities easier to understand while still presenting the company as capable, modern, and globally relevant.",
    impact: "Improved clarity for buyers and created a stronger digital face for a technical business.",
    metrics: ["Simplified technical story", "More premium presentation", "Better buyer comprehension"],
    services: ["Industrial Website", "Messaging Cleanup", "Frontend Build", "Retained Support"],
    year: "2023",
  },
];

export const featuredPortfolioProjects = portfolioProjects.slice(0, 3);
