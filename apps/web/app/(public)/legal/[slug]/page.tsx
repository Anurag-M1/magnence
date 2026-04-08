import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/public-page-shell";
import { companyInfo, legalPages } from "@/lib/site-data";

type LegalPageProps = {
  params: {
    slug: string;
  };
};

export default function LegalDetailPage({ params }: LegalPageProps) {
  const page = legalPages.find((item) => item.slug === params.slug);
  if (!page) {
    notFound();
  }

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Legal</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-5xl">{page.title}</h1>
          <p className="mt-6 text-base leading-8 text-white/66">{page.summary}</p>
        </div>

        <div className="mt-12 space-y-6">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <h2 className="text-xl font-medium text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-8 text-white/66">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="text-xl font-medium text-white">Operational note</h2>
            <p className="mt-4 text-sm leading-8 text-white/68">
              These pages explain the operating terms of the Magnence website and communication channels. Project-specific agreements, payment terms, and delivery commitments are confirmed separately in writing.
            </p>
          </section>
          <section className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="text-xl font-medium text-white">Contact for policy questions</h2>
            <p className="mt-4 text-sm leading-8 text-white/68">
              For privacy, legal, or website policy questions, contact <a className="text-white underline-offset-4 hover:underline" href={`mailto:${companyInfo.supportEmail}`}>{companyInfo.supportEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
