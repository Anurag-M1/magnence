import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const title = params.slug.replace(/-/g, " ");

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.24em] text-white/85 uppercase transition hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <div className="mt-12 max-w-3xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Article</p>
          <h1 className="mt-4 text-4xl font-light text-white md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-white/55">Reading time: 6 min</p>
        </div>

        <article className="mt-10 rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 text-white/72 backdrop-blur-md sm:p-8">
          <div className="space-y-5 text-sm leading-8 sm:text-base">
            <p>
              This article route is ready for richer MDX-backed content. For now, it uses the Magnence public theme so articles stay readable and visually consistent with the rest of the site.
            </p>
            <p>
              When connected to your content source, this page can support long-form insights, syntax-highlighted code blocks, structured summaries, related post sections, and service-linked calls to action.
            </p>
            <p>
              The goal is not just to publish articles, but to create useful content that improves trust, supports SEO, and helps the right visitors move toward enquiry with more confidence.
            </p>
          </div>
        </article>
      </div>
    </PublicPageShell>
  );
}
