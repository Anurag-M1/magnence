import type { ServiceType } from "@magnence/types";

export type NavItem = {
  href: string;
  label: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  service: ServiceType;
  summary: string;
  hero: string;
  highlights: string[];
  deliverables: string[];
  outcomes: string[];
};

export type SupportPage = {
  slug: string;
  title: string;
  summary: string;
  hero: string;
  coverage: string[];
  deliverables: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
};

export const companyInfo = {
  name: "Magnence",
  supportEmail: "support@magnence.com",
  officerEmails: ["anurag@magnence.com", "himanshu@magnence.com"],
  phones: ["+91 92967 40540", "+91 94709 61258", "+91 99314 44881"],
  location: "Gurgaon, Haryana, India",
  availability: "Open 24x7",
};

export const enquiryFormHref = "/contact#enquiry-form";
export const whatsappInquiryHref =
  "https://wa.me/919296740540?text=Hello%20Magnence,%20I%20want%20to%20start%20an%20enquiry%20for%20my%20project.";

export const publicNavigation: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/downloads", label: "Downloads" },
  { href: "/contact", label: "Contact" },
];

export const servicePages: ServicePage[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    service: "WEBSITE",
    summary: "Modern websites for agencies, consultancies, service brands, and companies that need a stronger digital presence.",
    hero: "Websites that look premium, explain your value clearly, and convert serious inquiries without feeling generic.",
    highlights: [
      "Positioning-first website strategy for service-led brands.",
      "Responsive design systems that feel sharp on desktop and mobile.",
      "Fast, SEO-aware builds with clean CMS-ready structure.",
    ],
    deliverables: [
      "Homepage, about, service, contact, and campaign-ready landing pages.",
      "Messaging architecture, visual direction, and conversion-focused page layouts.",
      "Launch support, analytics setup, and post-launch refinements.",
    ],
    outcomes: ["Stronger trust on first visit", "Clearer lead capture", "A site your team can keep evolving"],
  },
  {
    slug: "content-copy",
    title: "Content & Copy",
    service: "COPYWRITING",
    summary: "Website copy, service-page writing, editing, and brand communication for teams that need sharper words and better clarity.",
    hero: "Content that sounds more confident, reads faster, and helps your website explain the business properly.",
    highlights: [
      "Website copywriting for homepages, about pages, service pages, and landing pages.",
      "Editing and cleanup for existing copy that feels unclear, repetitive, or weak.",
      "Tone-of-voice refinement for premium, professional, and growth-stage brands.",
    ],
    deliverables: [
      "Page-by-page content rewrites and structure recommendations.",
      "Headline systems, value messaging, and CTA refinement.",
      "Editorial QA for launches, campaigns, and content refreshes.",
    ],
    outcomes: ["Better clarity", "Stronger brand language", "Less drop-off caused by confusing copy"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    service: "MAINTENANCE",
    summary: "Reliable updates, bug fixes, technical support, and ongoing website care for teams that need dependable follow-through.",
    hero: "Support that keeps your website, content, and frontend systems healthy after launch instead of letting small issues pile up.",
    highlights: [
      "Routine updates, QA, and issue resolution across production sites.",
      "Support for content changes, landing-page updates, and layout fixes.",
      "Technical monitoring, performance cleanup, and release support.",
    ],
    deliverables: [
      "Monthly or retained support workflows with clear turnaround windows.",
      "Backlog triage for edits, bugs, and improvement requests.",
      "Release support for campaigns, launches, and stakeholder review rounds.",
    ],
    outcomes: ["Less operational drag", "Faster updates", "A cleaner long-term web presence"],
  },
  {
    slug: "agency-freelance-support",
    title: "Agency & Freelance Support",
    service: "FREELANCE_SUPPORT",
    summary: "Flexible design, frontend, content, and launch support for agencies and internal teams that need dependable extra capacity.",
    hero: "A plug-in delivery partner for fast-moving teams that need quality execution without adding hiring friction.",
    highlights: [
      "White-label friendly collaboration for agencies and studios.",
      "Short-term support for launches, client delivery spikes, and design-to-build handoffs.",
      "Cross-functional execution across web, content, UI cleanup, and rollout support.",
    ],
    deliverables: [
      "Production-ready frontend and website implementation support.",
      "Copy cleanup, launch prep, and QA assistance on active client work.",
      "Reliable async communication and handoff-friendly documentation.",
    ],
    outcomes: ["More delivery capacity", "Less deadline pressure", "A steady partner for overflow work"],
  },
];

export const serviceCards = servicePages.map((service) => ({
  slug: service.slug,
  title: service.title,
  service: service.service,
  description: service.summary,
}));

export const supportPages: SupportPage[] = [
  {
    slug: "website-updates",
    title: "Website Updates",
    summary: "Fast website revisions for live marketing pages, service pages, and operational content.",
    hero: "When the site needs to change this week, not next month.",
    coverage: [
      "Homepage, service page, and CTA updates.",
      "New sections for campaigns, offers, and launches.",
      "Layout tweaks, copy swaps, and responsive QA.",
    ],
    deliverables: ["Structured change requests", "Quick turnaround edits", "Post-update verification across key breakpoints"],
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    summary: "Frontend and website support for issues affecting stability, usability, and delivery flow.",
    hero: "Practical technical support that restores momentum instead of creating more tickets.",
    coverage: [
      "Bug triage and frontend issue resolution.",
      "Performance cleanup and deployment support.",
      "Assistance with broken sections, forms, and integrations.",
    ],
    deliverables: ["Issue diagnosis", "Fix implementation", "Validation after release"],
  },
  {
    slug: "content-revisions",
    title: "Content Revisions",
    summary: "Polished content updates for teams that need clearer messaging without rewriting everything from scratch.",
    hero: "Sharper content, better structure, and fewer awkward revisions.",
    coverage: [
      "Homepage and service-page edits.",
      "Tone refinement and sentence cleanup.",
      "Launch copy updates and editorial QA.",
    ],
    deliverables: ["Round-based revisions", "Message cleanup", "Final publication-ready content review"],
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    summary: "UI cleanup and component alignment for teams that want their digital product to feel more consistent.",
    hero: "Less visual drift, fewer one-off screens, and more consistent delivery quality.",
    coverage: [
      "Component-level visual cleanup.",
      "Spacing, typography, and interface consistency work.",
      "Reusable UI guidance for ongoing product changes.",
    ],
    deliverables: ["Interface audit", "Systemized patterns", "Handoff guidance for future iterations"],
  },
];

export const howWeWorkSteps = [
  {
    title: "Scope the problem clearly",
    description: "We start by tightening the objective, audience, constraints, and timeline so the work moves without ambiguity.",
  },
  {
    title: "Design the delivery path",
    description: "We map the right mix of structure, copy, interface, and implementation before pushing pixels or code blindly.",
  },
  {
    title: "Ship in reviewable steps",
    description: "Work is shared in clear milestones so you always know what changed, what is next, and what needs feedback.",
  },
  {
    title: "Stay available after launch",
    description: "We support updates, refinements, and operational follow-through so the result keeps improving after go-live.",
  },
];

export const careerRoles = [
  {
    title: "Frontend Engineer",
    location: "Remote / Gurgaon hybrid",
    type: "Full-time",
    summary: "Build premium marketing sites, client-facing interfaces, and frontend systems with strong attention to motion and polish.",
  },
  {
    title: "UI Designer",
    location: "Remote / Contract",
    type: "Contract",
    summary: "Shape high-trust page layouts, brand presentation, and responsive interface systems for digital delivery work.",
  },
  {
    title: "Content Strategist",
    location: "Remote",
    type: "Part-time",
    summary: "Refine messaging systems, service-page content, and conversion-driven copy for brand and website projects.",
  },
  {
    title: "Support Operations Specialist",
    location: "Remote / Gurgaon hybrid",
    type: "Full-time",
    summary: "Help manage client updates, support requests, and release coordination across active website and platform work.",
  },
  {
    title: "Growth Marketing Specialist",
    location: "Remote",
    type: "Full-time",
    summary: "Plan service-led campaigns, conversion experiments, and marketing operations that turn traffic into better inquiries.",
  },
  {
    title: "Motion Designer",
    location: "Remote / Contract",
    type: "Contract",
    summary: "Create polished motion systems, launch visuals, and brand moments that make web experiences feel more premium.",
  },
  {
    title: "Content Writing Intern",
    location: "Remote",
    type: "Internship",
    summary: "Support service-page writing, editing, research, and campaign copy updates for live website and brand projects.",
  },
  {
    title: "Frontend Intern",
    location: "Remote / Gurgaon hybrid",
    type: "Internship",
    summary: "Learn by shipping responsive UI updates, QA fixes, and production-ready frontend improvements across client work.",
  },
  {
    title: "Client Success Coordinator",
    location: "Gurgaon, Haryana, India",
    type: "Full-time",
    summary: "Own project follow-ups, support coordination, and communication clarity so active accounts keep moving smoothly.",
  },
];

export const downloadPlatforms = [
  {
    name: "Android",
    availability: "Private beta",
    description: "Client portal, notifications, and project visibility for Android devices.",
    ctaLabel: "Request Android build",
    href: enquiryFormHref,
  },
  {
    name: "iOS",
    availability: "TestFlight access",
    description: "Early iPhone access for project tracking, approvals, and operational updates.",
    ctaLabel: "Request iOS invite",
    href: enquiryFormHref,
  },
  {
    name: "Windows",
    availability: "Desktop preview",
    description: "Desktop workspace for internal operations and client-facing delivery workflows.",
    ctaLabel: "Request Windows installer",
    href: enquiryFormHref,
  },
  {
    name: "macOS",
    availability: "Desktop preview",
    description: "Native desktop access for teams managing projects, communication, and review cycles.",
    ctaLabel: "Request macOS build",
    href: enquiryFormHref,
  },
  {
    name: "Linux",
    availability: "Technical preview",
    description: "For teams that want desktop access in Linux environments and internal operations setups.",
    ctaLabel: "Request Linux package",
    href: enquiryFormHref,
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/magnence" },
  { label: "Facebook", href: "https://facebook.com/magnence" },
  { label: "LinkedIn", href: "https://linkedin.com/company/magnence" },
  { label: "Twitter", href: "https://twitter.com/magnence" },
  { label: "Telegram", href: "https://t.me/magnence" },
  { label: "Reddit", href: "https://reddit.com/u/magnence" },
];

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Magnence collects, stores, and uses information submitted through the website and support channels.",
    sections: [
      {
        title: "What we collect",
        items: [
          "Contact details submitted through inquiry, support, booking, or download request forms.",
          "Basic usage and analytics information needed to understand site performance and request patterns.",
          "Project communication records when you choose to work with Magnence.",
        ],
      },
      {
        title: "How we use it",
        items: [
          "To respond to inquiries, support requests, and project discussions.",
          "To improve delivery operations, website usability, and customer support quality.",
          "To send essential project or support communication related to active work.",
        ],
      },
      {
        title: "How we protect it",
        items: [
          "We limit access to operational staff and officers who need the information for delivery or support.",
          "We use secure systems and industry-standard controls to reduce unauthorized access risk.",
          "We do not sell personal information collected through the website.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "How Magnence uses cookies and similar tools to keep the site useful, measurable, and operational.",
    sections: [
      {
        title: "Essential cookies",
        items: [
          "These help core site functions work, including navigation, security, and form behavior.",
          "Disabling essential cookies may reduce site reliability or block key actions.",
        ],
      },
      {
        title: "Analytics cookies",
        items: [
          "We may use analytics tools to understand traffic, performance, and engagement trends.",
          "These insights help us improve the website and support conversion flows.",
        ],
      },
      {
        title: "Control",
        items: [
          "You can manage cookie behavior through your browser settings.",
          "If consent tools are enabled, you can update your preferences there as well.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    summary: "General conditions for website information, estimates, and published service content.",
    sections: [
      {
        title: "Informational content",
        items: [
          "Content on this website is for general informational and commercial communication purposes.",
          "Published examples, timelines, and descriptions may vary by project scope and client requirements.",
        ],
      },
      {
        title: "No guaranteed outcome",
        items: [
          "Website content does not constitute a binding quote, guarantee, or service agreement by itself.",
          "Actual scope, timing, and commercial terms are confirmed only through direct project communication.",
        ],
      },
      {
        title: "Third-party services",
        items: [
          "Some workflows may rely on third-party platforms, integrations, or service providers.",
          "Magnence is not responsible for downtime or policy changes within external platforms we do not control.",
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary: "Basic terms governing website use, communication, and service engagement with Magnence.",
    sections: [
      {
        title: "Website use",
        items: [
          "You may use this website for lawful inquiry, support, communication, and informational purposes.",
          "You must not misuse forms, attempt unauthorized access, or interfere with site operation.",
        ],
      },
      {
        title: "Commercial engagement",
        items: [
          "Project work begins only after scope, pricing, and delivery terms are agreed in writing.",
          "Invoices, milestones, revisions, and support terms may vary by project or retainer agreement.",
        ],
      },
      {
        title: "Intellectual property",
        items: [
          "Website design, published content, and internal delivery materials remain protected unless otherwise agreed.",
          "Transferred deliverables and usage rights are defined within the relevant commercial agreement.",
        ],
      },
    ],
  },
];

export const successStories = [
  {
    text: "Magnence reworked our company site so it finally sounded like the business we had already become. The new structure helped prospects understand us faster.",
    name: "Sanya Khurana",
    role: "Managing Director",
  },
  {
    text: "We needed a dependable partner for overflow delivery. They slotted into active work without drama and kept deadlines intact.",
    name: "Marcus Ellery",
    role: "Studio Lead",
  },
  {
    text: "Their support cadence is what kept us engaged. Updates, fixes, and content revisions stopped feeling like mini-projects every week.",
    name: "Prerna Bedi",
    role: "Head of Growth",
  },
  {
    text: "Magnence helped us tighten the copy, redesign the flow, and clean up the frontend in one pass. It felt like one joined-up team.",
    name: "Leonard Price",
    role: "Operations Director",
  },
  {
    text: "We brought them in for a launch sprint and ended up extending into ongoing support because the execution stayed consistent.",
    name: "Ira Nair",
    role: "Launch Manager",
  },
  {
    text: "The visual polish improved, but what mattered more was how clearly the new site explained what we do. That changed conversations with leads.",
    name: "Arvind Solanki",
    role: "Commercial Head",
  },
  {
    text: "Agency collaboration can get messy fast. Here, communication was calm, clear, and easy to trust under pressure.",
    name: "Tessa Monroe",
    role: "Account Director",
  },
  {
    text: "The support team moved quickly on edits and handled detail-heavy requests without making us chase every change.",
    name: "Devika Saran",
    role: "Marketing Operations Manager",
  },
  {
    text: "Our launch pages stopped looking patched together. Magnence gave us a cleaner system we could keep reusing without losing speed.",
    name: "Aditya Mehra",
    role: "Growth Lead",
  },
  {
    text: "They understood both the design side and the delivery side, which meant fewer rounds of explanation and far smoother weekly progress.",
    name: "Claire Hoffman",
    role: "Founder",
  },
  {
    text: "We needed marketing pages, copy cleanup, and technical support at the same time. The team handled all three without the usual coordination mess.",
    name: "Ritika Bansal",
    role: "Brand Manager",
  },
  {
    text: "The site now feels like it belongs to a much larger company. That shift in perception changed how new prospects approached us.",
    name: "Nikhil Verma",
    role: "Co-Founder",
  },
  {
    text: "Even small revisions were handled with discipline. We always knew what was updated, what was pending, and what needed approval from our side.",
    name: "Olivia Chen",
    role: "Program Manager",
  },
  {
    text: "Magnence helped us turn a scattered service story into something confident, readable, and far more conversion-friendly.",
    name: "Farhan Ali",
    role: "Head of Marketing",
  },
];
