"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { featuredPortfolioProjects } from "@/lib/portfolio-data";

export function PortfolioSection() {
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
              }, index * 160);
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
    <section id="portfolio" ref={sectionRef} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="fade-in-element mb-6 inline-flex translate-y-8 items-center gap-2 text-sm font-medium tracking-wider text-white/60 uppercase opacity-0 transition-all duration-1000 ease-out">
              <div className="h-px w-8 bg-white/30" />
              Portfolio
              <div className="h-px w-8 bg-white/30" />
            </div>
            <h2 className="fade-in-element translate-y-8 text-4xl font-light tracking-tight text-balance text-white opacity-0 transition-all duration-1000 ease-out md:text-6xl">
              Work shaped by <span className="font-medium italic">clarity, trust, and clean execution</span>
            </h2>
          </div>
          <div className="fade-in-element max-w-xl translate-y-8 text-lg leading-relaxed text-white/70 opacity-0 transition-all duration-1000 ease-out">
            A selection of digital presentation work focused on clearer messaging, stronger perception, and more useful delivery systems.
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPortfolioProjects.map((project) => (
            <article
              key={project.slug}
              className="fade-in-element group translate-y-8 rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 opacity-0 backdrop-blur-md transition-all duration-1000 ease-out hover:border-white/20 hover:bg-white/[0.07]"
            >
              {project.image && (
                <Link href={`/portfolio/${project.slug}`} className="mb-6 block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </Link>
              )}
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] text-white/45 uppercase">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-medium text-white">{project.name}</h3>
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">{project.year}</div>
              </div>

              <p className="text-xl leading-tight text-white">{project.headline}</p>
              <p className="mt-4 text-sm leading-7 text-white/65">{project.summary}</p>

              <div className="mt-6 grid gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
                    {metric}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.services.slice(0, 3).map((service) => (
                  <span key={service} className="rounded-full border border-white/12 px-3 py-1 text-xs tracking-[0.18em] text-white/55 uppercase">
                    {service}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="fade-in-element mt-10 flex translate-y-8 justify-center opacity-0 transition-all duration-1000 ease-out">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-medium tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            View Full Portfolio
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
