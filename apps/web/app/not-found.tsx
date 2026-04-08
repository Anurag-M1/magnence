import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="mt-5 inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white">
        Back to Home
      </Link>
    </main>
  );
}
