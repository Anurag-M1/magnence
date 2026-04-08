import { PublicPageShell } from "@/components/public-page-shell";
import { companyInfo } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">About Magnence</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            An AI-led technology partner for brands that need <span className="font-medium italic">clarity, automation, and follow-through</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Magnence combines strategy, intelligent websites, product engineering, automation, content refinement, and ongoing optimization into one delivery rhythm. We help teams modernize how they present, operate, and scale.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">What we do</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/66">
              <li>Build AI-led business websites, digital products, and modern web applications.</li>
              <li>Design automation workflows, intelligent customer journeys, and operational systems.</li>
              <li>Refine messaging, service copy, brand communication, and AI-assisted content systems.</li>
              <li>Support live platforms through revisions, fixes, optimization, and long-term technical care.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">Where we operate</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/66">
              <li>Base location: {companyInfo.location}</li>
              <li>Support window: {companyInfo.availability}</li>
              <li>Collaboration model: remote-first with structured reviews, AI workflow planning, and clear handoffs.</li>
              <li>Best fit: service companies, agencies, operators, and growth-stage teams modernizing with AI.</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "How we operate",
              text: "We keep delivery simple: clear scope, visible checkpoints, responsible AI usage, responsive revisions, and practical support once the system is live.",
            },
            {
              title: "What clients value",
              text: "Clients usually come to Magnence when they need stronger product thinking, better automation, faster updates, cleaner delivery quality, or steadier launch support.",
            },
            {
              title: "What we avoid",
              text: "We do not hide behind vague AI claims or vague process. We prefer direct communication, reviewable work, and realistic delivery commitments that can actually be maintained.",
            },
          ].map((item) => (
            <section key={item.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/68">{item.text}</p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md sm:p-8">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.24em] text-white/45 uppercase">Why Magnence</p>
            <h2 className="mt-4 text-3xl font-light text-white sm:text-4xl">
              Built for teams that need <span className="font-medium italic">one reliable AI-led technology partner instead of scattered vendors</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              Magnence is strongest when a business needs strategy, websites, automation, content, campaign support, and technical execution to move in one consistent rhythm. That is where the quality gap usually shows up, and where we help close it.
            </p>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
