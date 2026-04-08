import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { servicePages } from "@/lib/site-data";

const serviceSections = [
  {
    title: "Web & Product Delivery",
    items: ["Business Websites", "Web Apps", "Landing Pages", "Ecommerce", "CRM Setup", "Business Platforms"],
  },
  {
    title: "Brand & Experience",
    items: ["UI/UX Design", "Content & Copy", "Editing", "Brand Communication", "Design Systems", "Campaign Design"],
  },
  {
    title: "Support & Growth",
    items: ["Maintenance", "Technical Support", "Marketing Support", "IT Consulting", "Digital Advisory", "Agency & Freelance Support"],
  },
];

export default function ServicesPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Services</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Service lines designed to <span className="font-medium italic">move commercial work forward</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Magnence focuses on the core areas where companies usually lose momentum: website clarity, content quality, launch follow-through, and reliable ongoing support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {servicePages.map((service) => (
            <article key={service.slug} className="rounded-[2rem] border border-white/12 bg-white/[0.05] p-7 backdrop-blur-md">
              <p className="text-xs tracking-[0.25em] text-white/45 uppercase">Core service</p>
              <h2 className="mt-3 text-3xl font-medium text-white">{service.title}</h2>
              <p className="mt-4 text-base leading-8 text-white/66">{service.hero}</p>

              <div className="mt-6 grid gap-3">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
                    {outcome}
                  </div>
                ))}
              </div>

              <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80">
                Explore service page
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {serviceSections.map((section) => (
            <section key={section.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <div key={item} className="rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm text-white/88">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Business-facing work",
              text: "Best for teams that need stronger positioning, cleaner service communication, and a more credible public presence.",
            },
            {
              title: "Operational support",
              text: "Best for companies already live but struggling with updates, revisions, technical follow-through, or inconsistent website quality.",
            },
            {
              title: "Overflow capacity",
              text: "Best for agencies, studios, and founders who need reliable extra hands without slowing delivery or quality.",
            },
          ].map((item) => (
            <section key={item.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/68">{item.text}</p>
            </section>
          ))}
        </div>
      </div>
    </PublicPageShell>
  );
}
