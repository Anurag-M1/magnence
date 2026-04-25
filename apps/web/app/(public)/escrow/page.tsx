import { PublicPageShell } from "@/components/public-page-shell";
import { ShieldCheck, Zap, MousePointerClick, CreditCard, Lock, CheckCircle2 } from "lucide-react";

export default function EscrowPage() {
  return (
    <PublicPageShell>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-white/45 uppercase">Project Security</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
            Secure delivery, <span className="font-medium italic text-white/90">guaranteed.</span> Only pay for what you approve.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
            We use milestone-based escrow to ensure your project is delivered exactly as promised. Your funds are held securely through our partner <span className="text-white">StayVise</span> and are only released when you sign off on a deliverable.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://stayvise.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Learn More
            </a>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck className="size-5 text-white/40" />
              RBI Compliant · Secure Funds
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-32">
          <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Define the roadmap",
                description: "We agree on specific project milestones and deliverables. You only commit to one phase at a time.",
                icon: MousePointerClick,
              },
              {
                step: "02",
                title: "Fund the escrow",
                description: "You deposit the milestone amount into a secure nodal account. We start work knowing the budget is locked.",
                icon: Lock,
              },
              {
                step: "03",
                title: "Approve & release",
                description: "Review our work. Once you're 100% satisfied, you release the funds to us with a single click.",
                icon: Zap,
              },
            ].map((item) => (
              <div key={item.step} className="group relative rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-white/20">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:bg-white group-hover:text-black">
                    <item.icon className="size-6" />
                  </div>
                  <span className="text-4xl font-light text-white/10">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Security Section */}
        <div className="mt-32 rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent)] p-8 md:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
                Built for trust. <br />
                <span className="text-white/50">Engineered for security.</span>
              </h2>
              <p className="mt-6 text-lg text-white/60">
                Powered by StayVise and Razorpay, our escrow system ensures that neither party is at risk. Funds are held in licensed nodal accounts until milestones are met.
              </p>
              
              <ul className="mt-10 space-y-4">
                {[
                  "RBI regulated payment processing",
                  "99.1% dispute-free completion rate",
                  "Automated payout upon approval",
                  "Protection against non-payment",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="size-5 text-white/40" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative aspect-square max-w-md lg:ml-auto">
              <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />
              <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="text-center">
                  <CreditCard className="mx-auto size-16 text-white/20" />
                  <div className="mt-6 text-5xl font-light text-white">₹2.4Cr+</div>
                  <p className="mt-2 text-sm tracking-widest text-white/40 uppercase">Secured via Escrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicPageShell>
  );
}
