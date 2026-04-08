import { ReactNode } from "react";
import { cn } from "../lib/cn";

type SectionCardProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function SectionCard({ title, description, actions, className, children }: SectionCardProps) {
  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
