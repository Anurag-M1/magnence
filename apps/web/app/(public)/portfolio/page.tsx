import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { portfolioProjects } from "@/lib/portfolio-data";

export default function PortfolioPage() {
  return (
    <PublicPageShell>
      <div className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.25em] text-white/85 uppercase transition hover:bg-white hover:text-black"
            >
              <ArrowLeft className="size-4" />
              Back Home
            </Link>
            <div className="text-sm font-semibold tracking-[0.3em] text-white uppercase">Magnence Portfolio</div>
          </div>

          <section className="mb-16 max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs tracking-[0.28em] text-white/60 uppercase">
              Selected Projects
            </div>
            <h1 className="mt-8 text-5xl font-light tracking-tight text-white md:text-7xl">
              Case studies built around <span className="font-medium italic">better positioning and better delivery</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
              This portfolio focuses on the commercial and communication outcomes behind the work instead of photo-style mockups. Each project is about clarity, perception, and dependable execution.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            {portfolioProjects.map((project, index) => (
              <article
                key={project.slug}
                className={`group rounded-[2rem] border border-white/12 bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${
                  index % 3 === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.3em] text-white/45 uppercase">{project.category}</p>
                    <h2 className="mt-3 text-3xl font-medium text-white md:text-4xl">{project.name}</h2>
                  </div>
                  <div className="rounded-full border border-white/15 px-4 py-2 text-xs tracking-[0.24em] text-white/60 uppercase">{project.year}</div>
                </div>

                <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-2xl leading-tight text-white">{project.headline}</p>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span key={service} className="rounded-full border border-white/12 px-3 py-1 text-xs tracking-[0.18em] text-white/55 uppercase">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 text-xs tracking-[0.25em] text-white/45 uppercase">Results framing</div>
                    <div className="space-y-3">
                      {project.metrics.map((metric) => (
                        <div key={metric} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/82">
                          {metric}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/62">{project.impact}</p>
                    <Link href={`/portfolio/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80">
                      Open case story
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
