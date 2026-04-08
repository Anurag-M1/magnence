import type { ReactNode } from "react";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </header>
      {children}
    </main>
  );
}
