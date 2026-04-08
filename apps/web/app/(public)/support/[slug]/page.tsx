import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { enquiryFormHref, supportPages } from "@/lib/site-data";

type SupportDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function SupportDetailPage({ params }: SupportDetailPageProps) {
  const page = supportPages.find((item) => item.slug === params.slug);
  if (!page) {
    notFound();
  }

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link
          href={enquiryFormHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.24em] text-white/85 uppercase transition hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Contact Support
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Support page</p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-5xl">{page.title}</h1>
            <p className="mt-6 text-xl leading-9 text-white/82">{page.hero}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/66">{page.summary}</p>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <div className="text-xs tracking-[0.24em] text-white/45 uppercase">Support deliverables</div>
            <div className="mt-5 space-y-3">
              {page.deliverables.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Coverage</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/68">
            {page.coverage.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Request flow",
              text: "Share the issue or update request, attach context if needed, and we turn it into a structured next step instead of a vague ticket loop.",
            },
            {
              title: "Best use case",
              text: "This works best for live websites, campaign pages, or delivery systems that need reliable change handling without rebuilding the whole stack.",
            },
            {
              title: "Why it matters",
              text: "Support quality shapes how quickly teams can launch, revise, and respond. Good support keeps commercial momentum intact.",
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
