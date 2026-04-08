import Link from "next/link";
import { PublicPageShell } from "@/components/public-page-shell";
import { enquiryFormHref, howWeWorkSteps } from "@/lib/site-data";

export default function HowWeWorkPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">How We Work</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            A delivery process built for <span className="font-medium italic">clear decisions and smooth handoffs</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Magnence keeps projects moving by tightening scope early, sharing work in reviewable stages, and staying available after launch when details still matter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {howWeWorkSteps.map((step, index) => (
            <article key={step.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <div className="text-sm tracking-[0.22em] text-white/42 uppercase">Step {index + 1}</div>
              <h2 className="mt-3 text-2xl font-medium text-white">{step.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/66">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Weekly visibility",
              text: "You see what changed, what is blocked, and what needs review without chasing scattered messages.",
            },
            {
              title: "Responsive revisions",
              text: "Feedback is folded back into the work with clear next actions so revision rounds do not drag indefinitely.",
            },
            {
              title: "Post-launch continuity",
              text: "We stay available for fixes, updates, and support work after launch instead of treating go-live as the end of the relationship.",
            },
          ].map((item) => (
            <section key={item.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/68">{item.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <Link href={enquiryFormHref} className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
            Start Inquiry
          </Link>
        </div>
      </div>
    </PublicPageShell>
  );
}
