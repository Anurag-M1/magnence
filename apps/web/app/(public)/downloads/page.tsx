import Link from "next/link";
import { Apple, Download, Laptop, Monitor, Smartphone } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";
import { downloadPlatforms } from "@/lib/site-data";

const platformIcons = {
  Android: Smartphone,
  iOS: Apple,
  Windows: Monitor,
  macOS: Laptop,
  Linux: Laptop,
} as const;

export default function DownloadsPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Application Downloads</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Download access across <span className="font-medium italic">mobile and desktop platforms</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            The Magnence application is being rolled out across Android, iOS, Windows, macOS, and Linux. Use the platform cards below to request the right build for your workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {downloadPlatforms.map((platform) => (
            <article key={platform.name} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs tracking-[0.18em] text-white/55 uppercase">
                <Download className="size-3.5" />
                {platform.availability}
              </div>
              <div className="mt-5 flex items-center gap-3">
                {(() => {
                  const Icon = platformIcons[platform.name as keyof typeof platformIcons] ?? Laptop;
                  return (
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white">
                      <Icon className="size-5" />
                    </span>
                  );
                })()}
                <h2 className="text-2xl font-medium text-white">{platform.name}</h2>
              </div>
              <p className="mt-4 text-sm leading-8 text-white/66">{platform.description}</p>
              <Link href={platform.href} className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
                {platform.ctaLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Who downloads are for",
              text: "These builds are intended for clients, internal teams, and stakeholders who need direct access to project visibility and communication workflows.",
            },
            {
              title: "How access works",
              text: "Use the enquiry form to request the platform you need. We confirm availability, environment fit, and the right release track before sharing access.",
            },
            {
              title: "What to mention",
              text: "Include your device, operating system, team size, and what you want to do inside the app so we can route the right build faster.",
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
