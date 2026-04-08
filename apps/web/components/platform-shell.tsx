import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { implementationStandards, platformIntegrations, platformMetrics, platformModules, platformPhases } from "@/lib/platform-config";

interface PlatformHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function PlatformHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PlatformHeroProps) {
  return (
    <section className="border-b border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-24 sm:px-8 lg:px-12">
        <div className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-200">{eyebrow}</div>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                {primaryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {platformMetrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm font-medium text-white">{metric.label}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlatformModulesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm tracking-[0.3em] text-emerald-200/80 uppercase">Platform modules</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">A delivery-ready map of the product surface</h2>
        <p className="text-white/65">
          Each module below maps back to the enterprise scope you defined and gives the frontend an immediate place to
          grow into.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {platformModules.map((module) => (
          <article key={module.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-white">{module.title}</h3>
              {module.audience.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs tracking-[0.2em] text-white/50 uppercase"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">{module.summary}</p>
            <div className="mt-6 grid gap-4">
              {module.capabilities.map((capability) => (
                <div key={capability.title} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <h4 className="text-sm font-semibold text-white">{capability.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/60">{capability.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {capability.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PlatformRoadmapSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm tracking-[0.3em] text-emerald-200/80 uppercase">Delivery roadmap</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">A phased release plan that stays realistic</h2>
          <p className="text-white/65">
            The platform needs staged delivery. This roadmap keeps the highest-risk foundations early and the highest
            leverage automations after core operations are stable.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {platformPhases.map((phase) => (
            <div key={phase.name} className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold text-white">{phase.name}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-white/60 uppercase">
                  {phase.timeline}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-emerald-200">{phase.outcome}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
                {phase.milestones.map((milestone) => (
                  <li key={milestone} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformStandardsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <p className="text-sm tracking-[0.3em] text-emerald-200/80 uppercase">Engineering guardrails</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Implementation standards carried into the codebase</h2>
          <p className="text-white/65">
            These rules keep the future backend, mobile, and integration work aligned with the standards you specified.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <ul className="space-y-4">
            {implementationStandards.map((standard) => (
              <li key={standard} className="flex gap-3 text-sm leading-7 text-white/75">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{standard}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

interface WorkspaceIntroProps {
  title: string;
  subtitle: string;
  description: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

export function WorkspaceIntro({ title, subtitle, description, sections, ctaHref, ctaLabel, className }: WorkspaceIntroProps) {
  return (
    <main className={cn("min-h-screen bg-black text-white", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm tracking-[0.3em] text-emerald-200/80 uppercase">{subtitle}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="text-base leading-8 text-white/70 sm:text-lg">{description}</p>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : null}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export function PlatformIntegrationsSection() {
  return (
    <section className="border-t border-white/10 bg-black/50">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm tracking-[0.3em] text-emerald-200/80 uppercase">Integrations</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">External systems the platform is designed to absorb</h2>
          <p className="text-white/65">
            A microservice-ready backend and an API gateway make room for a large integration surface without bloating
            the frontend contract.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platformIntegrations.map((integration) => (
            <div key={integration.category} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">{integration.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {integration.providers.map((provider) => (
                  <span key={provider} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-white/70">
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
