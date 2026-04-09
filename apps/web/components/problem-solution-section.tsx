"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { enquiryFormHref } from "@/lib/site-data";

const AlertTriangle = () => (
  <svg className="h-6 w-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.186-.833-2.956 0L3.858 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const CheckCircle = () => (
  <svg className="h-5 w-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRight = () => (
  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section id="problem-solution" ref={sectionRef} className="relative z-10 px-4 pb-16 pt-0 sm:pb-24 sm:pt-0">
      <div className="mx-auto max-w-6xl">
        <div className={`mb-12 text-center transition-all duration-1000 sm:mb-20 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white/70"></span>
            Why Businesses Choose Magnence
          </div>
          <h2 className="mb-4 text-2xl font-bold text-balance text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            AI-led technology delivery for brands that value <span className="text-white">clarity, speed, and consistency</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl">
            Magnence supports companies that need intelligent websites, AI-enabled workflows, dependable execution,
            and ongoing optimization without the friction of fragmented vendors or unclear delivery.
          </p>
        </div>

        <div className={`mb-12 grid gap-6 transition-all duration-1000 delay-300 sm:mb-20 sm:gap-8 lg:grid-cols-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="group">
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/10 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <AlertTriangle />
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">Where Businesses Lose Technology Momentum</h3>
              </div>

              <div className="mb-6 rounded-xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm sm:p-6">
                <div className="mb-2 text-3xl font-bold text-white sm:text-4xl">Execution Gaps</div>
                <p className="text-sm text-white/80 sm:text-base">
                  appear when AI, product, content, and engineering work are delayed, inconsistently managed, or split across too many moving parts
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white/65"></div>
                  <p className="text-sm text-white/70 sm:text-base">
                    Product improvements, website changes, and automation opportunities compete with day-to-day operational priorities
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white/65"></div>
                  <p className="text-sm text-white/70 sm:text-base">
                    Teams spend valuable time coordinating tools, prompts, edits, integrations, and follow-ups instead of core business work
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white/65"></div>
                  <p className="text-sm text-white/70 sm:text-base">
                    Quality declines when nobody owns long-term maintenance, AI governance, consistency, or delivery standards
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-slate-300/25 hover:bg-white/10 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-slate-400/15 p-2">
                  <CheckCircle />
                </div>
                <h3 className="text-xl font-bold text-slate-200 sm:text-2xl">What Magnence Provides</h3>
              </div>

              <div className="mb-6 rounded-xl border border-slate-300/20 bg-slate-400/10 p-4 backdrop-blur-sm sm:p-6">
                <div className="mb-2 text-3xl font-bold text-slate-200 sm:text-4xl">Structured AI-Led Delivery</div>
                <p className="text-sm text-white/80 sm:text-base">
                  across strategy, automation, product engineering, design, content refinement, and ongoing execution support
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle />
                  <p className="text-sm text-white/70 sm:text-base">
                    Intelligent websites, interfaces, and digital systems delivered with speed and polish
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle />
                  <p className="text-sm text-white/70 sm:text-base">
                    Clear messaging, refined content, automation opportunities, and stronger presentation aligned with your market
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle />
                  <p className="text-sm text-white/70 sm:text-base">
                    Reliable post-launch support through updates, fixes, optimization, maintenance, and AI workflow improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mb-12 grid grid-cols-1 gap-4 transition-all duration-1000 delay-600 sm:mb-16 sm:grid-cols-3 sm:gap-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:bg-white/10 sm:p-6">
            <div className="mb-2 text-2xl font-bold text-white sm:text-3xl">Fast</div>
            <p className="text-xs text-white/70 sm:text-sm">turnaround on practical technology work</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:bg-white/10 sm:p-6">
            <div className="mb-2 text-2xl font-bold text-white sm:text-3xl">Clean</div>
            <p className="text-xs text-white/70 sm:text-sm">delivery across AI, product, design, and code</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:bg-white/10 sm:p-6">
            <div className="mb-2 text-2xl font-bold text-white sm:text-3xl">Ongoing</div>
            <p className="text-xs text-white/70 sm:text-sm">support when your systems, site, or workflows need care</p>
          </div>
        </div>

        <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-1000 delay-900 sm:p-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h3 className="mb-3 text-xl font-bold text-balance text-white sm:mb-4 sm:text-2xl md:text-3xl">
            Built for businesses that expect modern AI-led execution
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:mb-8 sm:text-base md:text-lg">
            If your company needs stronger digital presentation, automation opportunities, dependable delivery, and
            ongoing support, Magnence is positioned to step in with clarity and accountability.
          </p>
          <Button
            size="lg"
            className="group cursor-pointer rounded-full bg-white px-6 py-3 text-base font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg sm:px-8 sm:py-4 sm:text-lg"
            asChild
          >
            <Link href={enquiryFormHref}>
              Start Inquiry
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
