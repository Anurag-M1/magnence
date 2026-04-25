import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { portfolioProjects } from "@/lib/portfolio-data";

type PortfolioDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);
  if (!project) {
    notFound();
  }

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.24em] text-white/85 uppercase transition hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </Link>

        {project.image && (
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/5">
            <img
              src={project.image}
              alt={project.name}
              className="w-full object-cover object-top transition duration-700 hover:scale-[1.01]"
            />
          </div>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm tracking-[0.3em] text-white/45 uppercase">{project.category}</p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl">{project.name}</h1>
            <p className="mt-6 text-xl leading-9 text-white/82">{project.headline}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/66">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span key={service} className="rounded-full border border-white/12 px-4 py-2 text-xs tracking-[0.18em] text-white/55 uppercase">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <div className="text-xs tracking-[0.25em] text-white/45 uppercase">Impact summary</div>
            <p className="mt-4 text-base leading-8 text-white/78">{project.impact}</p>
            <div className="mt-6 space-y-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/82">
                  {metric}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/64">
              Delivery year: <span className="text-white/82">{project.year}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
            <h2 className="text-lg font-semibold text-white">Challenge</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">
              {project.challenge}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
            <h2 className="text-lg font-semibold text-white">Approach</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">
              {project.approach}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
            <h2 className="text-lg font-semibold text-white">Result</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">
              {project.result}
            </p>
          </div>
        </div>
      </div>
    </PublicPageShell>
  );
}
