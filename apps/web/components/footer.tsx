"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, ShieldCheck, Twitter, Youtube } from "lucide-react";
import { companyInfo, enquiryFormHref, legalPages, servicePages, socialLinks, supportPages } from "@/lib/site-data";

type FooterSection = {
  label: string;
  links: Array<{ title: string; href: string }>;
};

const footerSections: FooterSection[] = [
  {
    label: "Services",
    links: servicePages.map((service) => ({
      title: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    label: "Company",
    links: [
      { title: "About Magnence", href: "/about" },
      { title: "Portfolio", href: "/portfolio" },
      { title: "How We Work", href: "/how-we-work" },
      { title: "Careers", href: "/careers" },
      { title: "Start a Project", href: enquiryFormHref },
    ],
  },
  {
    label: "Support",
    links: supportPages.map((page) => ({
      title: page.title,
      href: `/support/${page.slug}`,
    })),
  },
];

const socialIconMap = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  Twitter,
  YouTube: Youtube,
  Telegram: Send,
} as const;

export function Footer() {
  return (
    <footer className="relative mx-auto mt-16 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.35)_100%)] px-6 py-10 text-white backdrop-blur-xl md:px-8 lg:px-10">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_1.3fr]">
          <AnimatedContainer className="space-y-6">
            <div>
              <p className="text-sm tracking-[0.25em] text-white/50 uppercase">Magnence</p>
              <h2 className="mt-3 max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
                AI-led technology services for brands that want intelligent websites, automation, stronger digital products, and dependable support.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/60">
                  <Mail className="size-4" />
                  Support
                </div>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${companyInfo.supportEmail}`} className="block text-white/85 transition hover:text-white">
                    {companyInfo.supportEmail}
                  </a>
                  {companyInfo.officerEmails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="block text-white/65 transition hover:text-white">
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/60">
                  <Phone className="size-4" />
                  Call
                </div>
                <div className="space-y-2 text-sm">
                  {companyInfo.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="block text-white/85 transition hover:text-white">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="size-4" />
                  Location
                </div>
                <p className="text-sm text-white/85">{companyInfo.location}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/60">
                  <ShieldCheck className="size-4" />
                  Availability
                </div>
                <p className="text-sm text-white/85">{companyInfo.availability}</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-[0.22em] text-white/45 uppercase">Social</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <SocialIconLink key={social.label} label={social.label} href={social.href} />
                ))}
              </div>
            </div>
          </AnimatedContainer>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerSections.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
                <div>
                  <h3 className="text-xs tracking-[0.24em] text-white/50 uppercase">{section.label}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/68">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} className="transition hover:text-white">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Magnence. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            {legalPages.map((page) => (
              <Link key={page.slug} href={`/legal/${page.slug}`} className="transition hover:text-white">
                {page.title}
              </Link>
            ))}
            <Link href="/careers" className="transition hover:text-white">
              Careers
            </Link>
            <Link href="/downloads" className="transition hover:text-white">
              Downloads
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIconLink({ label, href }: { label: string; href: string }) {
  const Icon = socialIconMap[label as keyof typeof socialIconMap];

  if (label === "Reddit") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
          <path d="M14.19 15.56c.17.17.17.44 0 .61-.58.58-1.51.86-2.84.86s-2.26-.28-2.84-.86a.43.43 0 0 1 .61-.61c.4.4 1.11.61 2.23.61s1.83-.21 2.23-.61a.43.43 0 0 1 .61 0Zm-4.88-2.44a.89.89 0 1 0-1.78 0 .89.89 0 0 0 1.78 0Zm7.16 0a.89.89 0 1 0-1.78 0 .89.89 0 0 0 1.78 0Zm4.28-1.05c0-1.36-.97-2.51-2.25-2.74a2.45 2.45 0 0 0-4.22-1.93c-.81-.18-1.66-.28-2.56-.3l.53-2.49 1.73.37a1.51 1.51 0 1 0 .14-.68l-2.03-.43a.44.44 0 0 0-.52.33l-.66 3.11c-.95.03-1.86.14-2.72.33a2.45 2.45 0 0 0-4.18 1.94A2.79 2.79 0 0 0 2 12.07c0 1.25.82 2.31 1.95 2.69-.03.18-.05.37-.05.56 0 2.95 3.26 5.35 7.28 5.35 4.02 0 7.28-2.4 7.28-5.35 0-.19-.02-.38-.05-.56a2.8 2.8 0 0 0 2.34-2.69ZM11.18 19.8c-3.54 0-6.41-2-6.41-4.48s2.87-4.48 6.41-4.48 6.41 2 6.41 4.48-2.87 4.48-6.41 4.48Z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
    >
      {Icon ? <Icon className="size-4" /> : null}
    </a>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
