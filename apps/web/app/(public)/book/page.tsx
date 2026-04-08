import Link from "next/link";
import { PublicPageShell } from "@/components/public-page-shell";
import { enquiryFormHref } from "@/lib/site-data";

export default function BookPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Booking</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Schedule a call for <span className="font-medium italic">discovery, review, or active support</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            This page is the entry point for consultations, project reviews, support conversations, and follow-up sessions across time zones.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">What booking covers</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/66">
              <li>Discovery calls for new website, content, or support work.</li>
              <li>Review meetings for active projects and revisions.</li>
              <li>Support sessions when live delivery needs attention quickly.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">Next step</h2>
            <p className="mt-4 text-sm leading-8 text-white/66">
              Booking integration can be connected here with Cal.com, Calendly, or the custom appointments flow already available in the platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={enquiryFormHref} className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
                Start Inquiry
              </Link>
              <Link href="/downloads" className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View App Downloads
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            "Discovery calls for new builds and website refreshes.",
            "Review sessions for active delivery and revision rounds.",
            "Support conversations for ongoing updates and technical issues.",
          ].map((item, index) => (
            <section key={item} className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
              <div className="text-xs tracking-[0.22em] text-white/42 uppercase">Booking note {index + 1}</div>
              <p className="mt-4 text-sm leading-8 text-white/68">{item}</p>
            </section>
          ))}
        </div>
      </div>
    </PublicPageShell>
  );
}
