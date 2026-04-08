"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { enquiryFormHref } from "@/lib/site-data";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative mb-32 px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl">
        <div className="fade-in-element rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] p-8 text-center translate-y-8 opacity-0 transition-all duration-1000 ease-out md:p-10">
          <h3 className="mb-6 text-2xl font-light text-balance text-white leading-tight md:text-3xl lg:text-4xl">
            Ready to move your next{" "}
            <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text font-medium italic text-transparent">
              digital project
            </span>
            ?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
            Talk with Magnence about development, editing, maintenance, or freelance support tailored to your workflow.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href={enquiryFormHref}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-white to-slate-100 px-8 py-4 text-base font-semibold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:from-slate-50 hover:to-slate-200 md:px-12 md:py-6 md:text-lg"
            >
              Start With Inquiry
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
