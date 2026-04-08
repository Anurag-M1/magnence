import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { enquiryFormHref, servicePages } from "@/lib/site-data";

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = servicePages.find((item) => item.slug === params.slug);
  if (!service) {
    notFound();
  }

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.24em] text-white/85 uppercase transition hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Services
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Service page</p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-5xl">{service.title}</h1>
            <p className="mt-6 text-xl leading-9 text-white/82">{service.hero}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/66">{service.summary}</p>
            <Link href={enquiryFormHref} className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
              Start Inquiry
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <div className="text-xs tracking-[0.24em] text-white/45 uppercase">Outcome focus</div>
            <div className="mt-5 space-y-3">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">What we focus on</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">What you get</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Best fit",
              text: "This service works best when the business already knows the outcome it needs, but wants sharper execution and less delivery drag.",
            },
            {
              title: "Engagement style",
              text: "Projects can run as a focused sprint, staged rollout, or retained support model depending on the amount of iteration involved.",
            },
            {
              title: "Commercial outcome",
              text: "The goal is not just cleaner output. It is stronger trust, faster decisions, and easier commercial follow-through for your team.",
            },
          ].map((item) => (
            <section key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/68">{item.text}</p>
            </section>
          ))}
        </div>
      </div>
    </PublicPageShell>
  );
}
