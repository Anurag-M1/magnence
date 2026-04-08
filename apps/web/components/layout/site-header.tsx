import Link from "next/link";
import { publicNavigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Magnence
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/book"
          className="inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          Book a Call
        </Link>
      </div>
    </header>
  );
}
