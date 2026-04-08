"use client";

import { useEffect, useRef } from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { successStories } from "@/lib/site-data";

export function TestimonialsSection() {
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
              }, index * 300);
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
    <section id="testimonials" ref={sectionRef} className="relative px-4 pb-16 pt-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-32">
          <div className="fade-in-element mb-6 inline-flex translate-y-8 items-center gap-2 text-sm font-medium tracking-wider text-white/60 uppercase opacity-0 transition-all duration-1000 ease-out">
            <div className="h-px w-8 bg-white/30"></div>
            Success Stories
            <div className="h-px w-8 bg-white/30"></div>
          </div>
          <h2 className="fade-in-element mb-8 translate-y-8 text-5xl font-light tracking-tight text-balance text-white opacity-0 transition-all duration-1000 ease-out md:text-6xl lg:text-7xl">
            Teams that value <span className="font-medium italic">reliable execution</span>
          </h2>
          <p className="fade-in-element mx-auto max-w-2xl translate-y-8 text-xl leading-relaxed text-white/70 opacity-0 transition-all duration-1000 ease-out">
            Feedback from businesses and collaborators who needed development, editing, maintenance, and freelance
            support delivered well.
          </p>
        </div>

        <div className="fade-in-element relative flex min-h-[520px] translate-y-8 items-center justify-center overflow-hidden opacity-0 transition-all duration-1000 ease-out md:min-h-[720px]">
          <div
            className="flex max-w-6xl gap-8"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={successStories.slice(0, 4)} duration={15} className="flex-1" />
            <TestimonialsColumn testimonials={successStories.slice(4, 8)} duration={12} className="hidden flex-1 md:block" />
            <TestimonialsColumn testimonials={successStories.slice(8, 12)} duration={18} className="hidden flex-1 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
