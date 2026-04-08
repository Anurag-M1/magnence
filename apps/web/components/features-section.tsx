"use client";

import { useEffect, useRef, useState } from "react";

type DemoEmail = {
  subject: string;
  status: "unread" | "replied";
};

type DemoLead = {
  name: string;
  score: number;
  qualified: boolean;
};

type DemoConnection = {
  name: string;
  connected: boolean;
};

const initialEmails: DemoEmail[] = [
  { subject: "Service inquiry", status: "unread" },
  { subject: "Appointment request", status: "unread" },
  { subject: "Quote needed", status: "unread" },
];

const initialLeads: DemoLead[] = [
  { name: "Sarah M.", score: 0, qualified: false },
  { name: "John D.", score: 0, qualified: false },
  { name: "Mike R.", score: 0, qualified: false },
];

const initialConnections: DemoConnection[] = [
  { name: "CRM", connected: false },
  { name: "WhatsApp", connected: false },
  { name: "Calendar", connected: false },
  { name: "Email", connected: false },
];

const AnimatedChatDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true, visible: false },
    { text: "I'd like to book an appointment", isBot: false, visible: false },
    { text: "Perfect! I can help with that. What service are you interested in?", isBot: true, visible: false },
  ]);
  const [typingDots, setTypingDots] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const scenarios = [
      [
        { text: "Hi! How can I help you today?", isBot: true },
        { text: "I'd like to book an appointment", isBot: false },
        { text: "Perfect! I can help with that. What service are you interested in?", isBot: true },
      ],
      [
        { text: "Hello! I'm available 24/7 to assist you.", isBot: true },
        { text: "Do you have weekend availability?", isBot: false },
        { text: "I can check our weekend slots for you.", isBot: true },
      ],
      [
        { text: "Good evening! How may I assist you?", isBot: true },
        { text: "I need help with pricing", isBot: false },
        { text: "I'd be happy to provide pricing information right away!", isBot: true },
      ],
    ];

    const currentScenario = scenarios[cycleCount % scenarios.length];
    if (!currentScenario) return;
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })));

    const timer = setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i === 0 })));

      setTimeout(() => {
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= 1 })));

        setTimeout(() => {
          const typingInterval = setInterval(() => {
            setTypingDots((prev) => (prev + 1) % 4);
          }, 500);

          setTimeout(() => {
            clearInterval(typingInterval);
            setMessages((prev) => prev.map((msg) => ({ ...msg, visible: true })));

            setTimeout(() => {
              setCycleCount((prev) => prev + 1);
            }, 3000);
          }, 2000);
        }, 1000);
      }, 1500);
    }, 500);

    return () => clearTimeout(timer);
  }, [isActive, cycleCount]);

  return (
    <div className="relative h-32 overflow-hidden rounded-lg bg-slate-50 p-4">
      <div className="absolute right-2 top-2 flex items-center gap-1">
        <div className="h-2 w-2 animate-pulse rounded-full bg-slate-500"></div>
        <span className="text-xs font-medium text-slate-500">24/7</span>
      </div>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex transition-all duration-500 ${msg.isBot ? "justify-start" : "justify-end"} ${msg.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            <div className={`max-w-[80%] rounded-full px-3 py-1.5 text-xs ${msg.isBot ? "bg-slate-200 text-slate-700" : "bg-blue-500 text-white"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="rounded-full bg-slate-200 px-3 py-1.5">
              <div className="flex space-x-1">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className={`h-1 w-1 rounded-full bg-slate-500 transition-opacity duration-300 ${typingDots >= dot ? "opacity-100" : "opacity-30"}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnimatedPhoneDemo = ({ isActive }: { isActive: boolean }) => {
  const [callState, setCallState] = useState<"idle" | "ringing" | "answered">("idle");
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const cycleCall = () => {
      setCallState("ringing");
      setTimeout(() => {
        setCallState("answered");
        setTimeout(() => {
          setCallState("idle");
          setCallCount((prev) => prev + 1);
          setTimeout(cycleCall, 2000);
        }, 2000);
      }, 2000);
    };

    const timer = setTimeout(cycleCall, 800);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="relative flex h-32 items-center justify-center rounded-lg bg-slate-50 p-4">
      <div className="absolute right-2 top-2 text-xs font-medium text-slate-500">Calls: {callCount + 1}</div>
      <div className="relative">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 transition-all duration-500 ${callState === "ringing" ? "animate-pulse scale-110" : ""} ${callState === "answered" ? "bg-blue-500" : ""}`}>
          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        {callState === "ringing" && (
          <>
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-slate-500"></div>
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-slate-500 animation-delay-75"></div>
          </>
        )}
        {callState === "answered" && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
            <div className="whitespace-nowrap rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">Call answered</div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnimatedCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      setSelectedDate(15);
      setTimeout(() => setBooked(true), 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="h-32 rounded-lg bg-slate-50 p-4">
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`flex h-4 w-4 items-center justify-center rounded transition-all duration-300 ${
              day === selectedDate ? (booked ? "scale-110 bg-slate-800 text-white" : "scale-110 bg-blue-500 text-white") : day % 7 === 0 || day % 6 === 0 ? "bg-slate-200 text-slate-400" : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      {booked && <div className="mt-2 animate-fade-in text-xs font-medium text-slate-700">✓ Appointment booked for the 15th</div>}
    </div>
  );
};

const AnimatedEmailDemo = ({ isActive }: { isActive: boolean }) => {
  const [emails, setEmails] = useState<DemoEmail[]>(initialEmails);

  useEffect(() => {
    if (!isActive) return;

    initialEmails.forEach((_, index) => {
      setTimeout(() => {
        setEmails((prev) => prev.map((email, i) => (i === index ? { ...email, status: "replied" } : email)));
      }, 1000 + index * 800);
    });
  }, [isActive]);

  return (
    <div className="h-32 overflow-hidden rounded-lg bg-slate-50 p-4">
      <div className="space-y-2">
        {emails.map((email, i) => (
          <div key={i} className={`flex items-center gap-2 rounded p-2 transition-all duration-500 ${email.status === "replied" ? "bg-slate-100" : "bg-white"}`}>
            <div className={`h-2 w-2 rounded-full ${email.status === "replied" ? "bg-slate-700" : "bg-blue-500"}`} />
            <span className="flex-1 text-xs text-slate-700">{email.subject}</span>
            {email.status === "replied" && (
              <svg className="h-3 w-3 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedLeadsDemo = ({ isActive }: { isActive: boolean }) => {
  const [leads, setLeads] = useState(initialLeads);

  useEffect(() => {
    if (!isActive) return;

    initialLeads.forEach((_, index) => {
      setTimeout(() => {
        const targetScore = [85, 92, 78][index] ?? 0;
        const interval = setInterval(() => {
          setLeads((prev) =>
            prev.map((lead, i) => {
              if (i === index && lead.score < targetScore) {
                const newScore = Math.min(lead.score + 5, targetScore);
                return {
                  ...lead,
                  score: newScore,
                  qualified: newScore >= 80,
                };
              }
              return lead;
            }),
          );
        }, 50);

        setTimeout(() => clearInterval(interval), 1000);
      }, index * 600);
    });
  }, [isActive]);

  return (
    <div className="h-32 overflow-hidden rounded-lg bg-slate-50 p-4">
      <div className="space-y-2">
        {leads.map((lead, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-12 text-xs text-slate-700">{lead.name}</span>
            <div className="h-2 flex-1 rounded-full bg-slate-200">
              <div className={`h-2 rounded-full transition-all duration-500 ${lead.qualified ? "bg-slate-800" : "bg-blue-500"}`} style={{ width: `${lead.score}%` }} />
            </div>
            <span className="w-8 text-xs font-medium">{lead.score}%</span>
            {lead.qualified && <span className="text-xs text-slate-700">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedIntegrationsDemo = ({ isActive }: { isActive: boolean }) => {
  const [connections, setConnections] = useState(initialConnections);

  useEffect(() => {
    if (!isActive) return;

    initialConnections.forEach((_, index) => {
      setTimeout(() => {
        setConnections((prev) => prev.map((conn, i) => (i === index ? { ...conn, connected: true } : conn)));
      }, 500 + index * 400);
    });
  }, [isActive]);

  return (
    <div className="h-32 rounded-lg bg-slate-50 p-4">
      <div className="grid grid-cols-2 gap-2">
        {connections.map((conn, i) => (
          <div key={i} className={`flex items-center gap-2 rounded p-2 transition-all duration-500 ${conn.connected ? "bg-slate-100" : "bg-white"}`}>
            <div className={`h-2 w-2 rounded-full transition-colors duration-500 ${conn.connected ? "bg-slate-700" : "bg-slate-300"}`} />
            <span className="text-xs text-slate-700">{conn.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-slate-500">{connections.filter((c) => c.connected).length}/4 connected</div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Business Websites",
    description:
      "AI-led company websites, landing pages, and digital brand surfaces built to improve discovery, trust, and qualified enquiries.",
    demo: AnimatedChatDemo,
    size: "large",
  },
  {
    title: "Content & Copy",
    description:
      "AI-assisted messaging systems, service-page writing, and editorial support that make your business easier to understand and easier to trust.",
    demo: AnimatedPhoneDemo,
    size: "medium",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing fixes, updates, technical cleanup, monitoring, and retained support so your live systems keep improving after launch.",
    demo: AnimatedCalendarDemo,
    size: "medium",
  },
  {
    title: "Agency & Freelance Support",
    description:
      "Flexible overflow delivery for agencies and teams that need dependable frontend, AI workflow, content, and launch execution support.",
    demo: AnimatedIntegrationsDemo,
    size: "medium",
  },
  {
    title: "Marketing & Campaign Support",
    description:
      "AI-informed service pages, campaign updates, landing systems, and conversion-focused marketing execution for growing brands.",
    demo: AnimatedEmailDemo,
    size: "medium",
  },
  {
    title: "Automation & Launch Operations",
    description: "Structured support for automations, launches, revisions, and post-release optimization when timing matters.",
    demo: AnimatedPhoneDemo,
    size: "large",
  },
  {
    title: "AI-Ready Request Flow",
    description: "Inquiry routing, service matching, and operational intelligence so incoming work lands in the right lane faster.",
    demo: AnimatedLeadsDemo,
    size: "medium",
  },
];

const serviceHighlights = [
  "Business Websites",
  "Web Apps",
  "AI Workflows",
  "Automation",
  "UI/UX Design",
  "Content & Copy",
  "Landing Pages",
  "Ecommerce",
  "CRM Setup",
  "Maintenance",
  "Technical Support",
  "Marketing",
  "IT Consulting",
  "Agency Support",
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState<number | null>(null);

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
    <section id="features" ref={sectionRef} data-nav-theme="light" className="relative z-10">
      <div className="relative overflow-hidden rounded-t-[3rem] bg-white px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 animate-float rounded-full bg-slate-200"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className={`mb-12 text-center transition-all duration-1000 sm:mb-20 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <svg className="mr-2 h-4 w-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H1V9H3V15H1V17H3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V17H23V15H21V9H23ZM19 9V15H5V9H19ZM7.5 11.5C7.5 10.67 8.17 10 9 10S10.5 10.67 10.5 11.5 9.83 13 9 13 7.5 12.33 7.5 11.5ZM13.5 11.5C13.5 10.67 14.17 10 15 10S16.5 10.67 16.5 11.5 15.83 13 15 13 13.5 12.33 13.5 11.5ZM12 16C13.11 16 14.08 16.59 14.71 17.5H9.29C9.92 16.59 10.89 16 12 16Z" />
              </svg>
              AI-Led Services Designed to Keep Work Moving
            </div>
            <h2 className="mb-4 text-2xl font-bold text-balance text-slate-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              AI-Led Technology Services{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                Across Products, Automation, Design & Growth
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-slate-600 sm:text-lg md:text-xl">
              Magnence supports businesses with intelligent websites, web apps, AI workflows, automation systems,
              design, growth infrastructure, and ongoing technical delivery in one clear workflow.
            </p>
          </div>

          <div className={`mb-10 flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-150 sm:mb-14 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {serviceHighlights.map((item) => (
              <div
                key={item}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-slate-700 uppercase sm:text-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-1 gap-6 transition-all duration-1000 delay-300 md:grid-cols-2 xl:grid-cols-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${feature.size === "large" ? "md:col-span-2" : ""}`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl sm:p-8">
                  <div className="mb-6">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-slate-700 sm:text-2xl">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
