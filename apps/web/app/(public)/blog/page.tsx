import Link from "next/link";
import { PublicPageShell } from "@/components/public-page-shell";

const posts = [
  {
    slug: "launching-digital-products-2026",
    title: "Launching Digital Products in 2026: A Practical Blueprint",
    excerpt: "A high-signal guide to architecture, delivery, launch rhythm, and decision-making for modern digital teams.",
  },
  {
    slug: "agency-crm-automation-playbook",
    title: "Agency CRM Automation Playbook",
    excerpt: "How agencies can reduce lead drop-off, handoff friction, and manual follow-up effort with a cleaner operating system.",
  },
  {
    slug: "why-business-websites-lose-conversions",
    title: "Why Business Websites Lose Conversions",
    excerpt: "The most common clarity, trust, and structure mistakes that quietly weaken inquiry flow.",
  },
];

export default function BlogPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Blog</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Writing on <span className="font-medium italic">delivery, clarity, websites, and growth systems</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Magnence shares practical notes on digital delivery, website quality, service communication, and the systems that help teams ship better work with less friction.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <h2 className="text-2xl font-medium text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/68">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-white transition hover:text-white/80">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </PublicPageShell>
  );
}
