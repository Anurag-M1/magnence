import Link from "next/link";
import { PublicPageShell } from "@/components/public-page-shell";
import { enquiryFormHref } from "@/lib/site-data";

const pricingPlans = [
  {
    name: "Launch",
    price: "Starting from $3,500",
    summary: "For focused website launches, landing pages, and smaller delivery sprints.",
    points: ["Discovery and structure alignment", "Design and build execution", "Launch support and QA"],
  },
  {
    name: "Growth",
    price: "Starting from $8,000",
    summary: "For broader website systems, content refinement, and coordinated rollout work.",
    points: ["Multi-page build and content support", "Review cycles and stakeholder feedback", "Post-launch iteration window"],
  },
  {
    name: "Retained Support",
    price: "Custom monthly scope",
    summary: "For businesses that need ongoing updates, support, and campaign-ready delivery capacity.",
    points: ["Structured monthly request flow", "Priority support and updates", "Flexible execution across design, content, and frontend"],
  },
];

export default function PricingPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Pricing</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Clear commercial models for <span className="font-medium italic">focused delivery and ongoing support</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Magnence works through scoped project pricing, broader growth-stage delivery engagements, and ongoing retained support depending on how much change velocity your team needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <section key={plan.name} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <h2 className="text-2xl font-medium text-white">{plan.name}</h2>
              <p className="mt-3 text-lg text-white/82">{plan.price}</p>
              <p className="mt-4 text-sm leading-8 text-white/68">{plan.summary}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-white/68">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">How pricing is shaped</h2>
            <p className="mt-4 text-sm leading-8 text-white/68">
              Final commercials depend on timeline pressure, number of pages or flows, revision complexity, integration requirements, and how much post-launch support you want included.
            </p>
          </section>
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">Best next step</h2>
            <p className="mt-4 text-sm leading-8 text-white/68">
              If you already know the type of work you need, start with an enquiry and we will help translate that into the right commercial shape.
            </p>
            <Link href={enquiryFormHref} className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
              Start Inquiry
            </Link>
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
