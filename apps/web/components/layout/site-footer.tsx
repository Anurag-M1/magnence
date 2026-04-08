export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-2 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Magnence. All rights reserved.</p>
        <p>Built with Next.js, tRPC, Prisma, Supabase Storage, and Expo.</p>
      </div>
    </footer>
  );
}
