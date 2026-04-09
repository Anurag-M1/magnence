"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { enquiryFormHref, publicNavigation } from "@/lib/site-data";

export function GlassmorphismNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [useLightTheme, setUseLightTheme] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const syncNavbarTheme = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 96;
        const sampleY = Math.min(window.innerHeight - 1, Math.max(Math.round(navBottom + 12), 96));
        const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
        const themedParent = sampleElement?.closest("[data-nav-theme]");
        setUseLightTheme(themedParent?.getAttribute("data-nav-theme") === "light");
      });
    };

    syncNavbarTheme();

    window.addEventListener("scroll", syncNavbarTheme, { passive: true });
    window.addEventListener("resize", syncNavbarTheme);

    return () => {
      window.removeEventListener("scroll", syncNavbarTheme);
      window.removeEventListener("resize", syncNavbarTheme);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navContainerClass = useLightTheme
    ? "border border-slate-200/90 bg-white/90 shadow-xl shadow-slate-300/30 backdrop-blur-xl"
    : "border border-white/20 bg-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md";
  const brandClass = useLightTheme ? "text-slate-950" : "text-white";
  const linkClass = (active: boolean) =>
    active
      ? useLightTheme
        ? "text-slate-950"
        : "text-white"
      : useLightTheme
        ? "text-slate-600 hover:text-slate-950"
        : "text-white/80 hover:text-white";
  const mobileButtonClass = useLightTheme ? "text-slate-900" : "text-white";
  const mobileMenuClass = useLightTheme
    ? "border border-slate-200/90 bg-white/95 shadow-xl shadow-slate-300/30"
    : "border border-white/20 bg-[#060606]/90 shadow-2xl";
  const isItemActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
      <nav
        ref={navRef}
        className="fixed left-1/2 top-4 z-[70] -translate-x-1/2 animate-fade-in-nav md:top-6"
      >
      <div className="mx-auto w-[92vw] max-w-sm sm:max-w-xl md:max-w-5xl">
        <div className={`rounded-full px-4 py-3 md:px-6 md:py-2 ${navContainerClass}`}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (pathname === "/") {
                  event.preventDefault();
                  scrollToTop();
                }
              }}
              className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <span className={`text-sm md:text-base font-semibold tracking-[0.3em] uppercase transition-colors ${brandClass}`}>Magnence</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {publicNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-all duration-200 hover:scale-105 ${linkClass(isItemActive(item.href))}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link
                href={enquiryFormHref}
                className="group relative flex items-center rounded-full bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
              >
                <span className="mr-2">Start Inquiry</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
              className={`touch-manipulation cursor-pointer transition-transform duration-200 hover:scale-110 md:hidden ${mobileButtonClass}`}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"}`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>



      <div className="relative z-[71] md:hidden">
        <div
          id="mobile-nav-panel"
          className={`mx-auto mt-2 w-[92vw] max-w-sm transform-gpu transition-all duration-200 ease-out ${
            isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
          }`}
        >
          <div className={`rounded-2xl p-4 backdrop-blur-xl ${mobileMenuClass}`}>
            <div className="flex flex-col space-y-1">
              {publicNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-left font-medium transition-all duration-200 hover:translate-x-1 ${
                    isItemActive(item.href)
                      ? useLightTheme
                        ? "bg-slate-100 text-slate-950"
                        : "bg-white/10 text-white"
                      : useLightTheme
                        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href={enquiryFormHref}
                className="group relative flex items-center rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:scale-[1.01] hover:bg-gray-50 hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">Start Inquiry</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
