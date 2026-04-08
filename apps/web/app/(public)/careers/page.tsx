import { PublicPageShell } from "@/components/public-page-shell";
import { careerRoles, companyInfo } from "@/lib/site-data";

export default function CareersPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Careers</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Join Magnence to build <span className="font-medium italic">cleaner digital experiences and steadier delivery systems</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            We look for full-time teammates, specialists, and interns who care about thoughtful execution, clear communication, and making live work better for clients and teammates.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs tracking-[0.18em] text-white/60 uppercase">Full-time roles</div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs tracking-[0.18em] text-white/60 uppercase">Contract support</div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs tracking-[0.18em] text-white/60 uppercase">Internships</div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {careerRoles.map((role) => (
            <article key={role.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs tracking-[0.18em] text-white/55 uppercase">{role.type}</span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs tracking-[0.18em] text-white/55 uppercase">{role.location}</span>
              </div>
              <h2 className="mt-5 text-2xl font-medium text-white">{role.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/66">{role.summary}</p>
              <a href={`mailto:${companyInfo.officerEmails[0]}?subject=${encodeURIComponent(`Application for ${role.title}`)}`} className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
                Apply via Email
              </a>
            </article>
          ))}
        </div>
      </div>
    </PublicPageShell>
  );
}
