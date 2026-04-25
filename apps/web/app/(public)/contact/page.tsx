import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, Twitter } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PublicPageShell } from "@/components/public-page-shell";
import { companyInfo, socialLinks } from "@/lib/site-data";

const socialIconMap = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  Twitter,
  Telegram: Send,
} as const;

export default function ContactPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
            Start with inquiry in the <span className="font-medium italic">same rhythm as the AI-led work</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            Use this page to start an AI-led website, automation workflow, web app, support request, or strategic technology conversation with Magnence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <p className="text-xs tracking-[0.24em] text-white/70 uppercase">Enquiry routing</p>
              <p className="mt-4 text-sm leading-8 text-white/82">
                Sending this form opens an email enquiry addressed to <span className="font-semibold">{companyInfo.supportEmail}</span> so AI, product, automation, and support requests land in the right inbox immediately.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <Mail className="size-4" />
                Email
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a href={`mailto:${companyInfo.supportEmail}`} className="block text-white/86 transition hover:text-white">
                  {companyInfo.supportEmail}
                </a>
                {companyInfo.officerEmails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="block text-white/65 transition hover:text-white">
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <Phone className="size-4" />
                Phone
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {companyInfo.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="block text-white/86 transition hover:text-white">
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
                <div className="inline-flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="size-4" />
                  Location
                </div>
                <p className="mt-4 text-sm leading-7 text-white/82">{companyInfo.location}</p>
              </div>

              <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
                <div className="inline-flex items-center gap-2 text-sm text-white/60">
                  <ShieldCheck className="size-4" />
                  Availability
                </div>
                <p className="mt-4 text-sm leading-7 text-white/82">{companyInfo.availability}</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <p className="text-xs tracking-[0.24em] text-white/45 uppercase">Social media</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    {(() => {
                      const Icon = socialIconMap[social.label as keyof typeof socialIconMap] ?? MessageCircle;
                      return <Icon className="size-4" />;
                    })()}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </PublicPageShell>
  );
}
