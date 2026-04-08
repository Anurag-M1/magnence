import { Button } from "@/components/ui/button";
import { enquiryFormHref } from "@/lib/site-data";
import RotatingText from "./RotatingText";

const audienceGroups = ["Startups", "Agencies", "Founders", "Local Brands", "Creators", "Growing Teams"];
const projectNames = [
  "Nexora Capital",
  "Atlas Ops",
  "Lume Studio",
  "Northstar Advisory",
  "Pulse Commerce",
  "Verve Health",
  "Harbor Stay",
  "Cobalt Logistics",
];

const ArrowRight = () => (
  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Play = () => (
  <svg className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
);

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center px-4 pb-8 pt-20 sm:pb-10 sm:pt-24">
      <div className="relative z-10 mx-auto max-w-4xl text-center animate-fade-in-hero">
        <div className="mb-8 mt-12 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md animate-fade-in-badge">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white/60"></span>
          <span>Strategize</span>
          <span className="mx-3 h-2 w-2 rounded-full bg-white/60" />
          <span>Automate</span>
          <span className="mx-3 h-2 w-2 rounded-full bg-white/60" />
          <span>Scale</span>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-balance text-white sm:text-4xl md:text-6xl lg:text-7xl animate-fade-in-heading">
          <span className="text-white">Build your</span>
          <br />
          <span className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:mt-6 md:mt-8">
            <span className="text-white">Next</span>
            <RotatingText
              texts={["AI Platform", "Intelligent Website", "Automation System", "Digital Product", "Technology Partner"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-sm px-4 text-base font-light leading-relaxed text-white text-balance sm:mb-12 sm:max-w-3xl sm:px-0 sm:text-xl md:text-2xl animate-fade-in-subheading">
          Magnence is an AI-led technology services company building intelligent websites, automation workflows, web
          apps, digital products, and growth systems for modern businesses.
        </p>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:mb-10 sm:flex-row animate-fade-in-buttons">
          <Button
            size="lg"
            className="group relative cursor-pointer overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
            asChild
          >
            <a href={enquiryFormHref}>
              Start Your Project
              <ArrowRight />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group cursor-pointer rounded-full border-white/30 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-white/10"
            asChild
          >
            <a href="#features">
              <Play />
              Explore Services
            </a>
          </Button>
        </div>

        <div className="hidden overflow-hidden px-4 text-center sm:block animate-fade-in-trust">
          <p className="mb-4 text-sm text-white/90">Trusted by operators, founders, and brands that expect disciplined AI-led execution</p>
          <div className="relative mx-auto w-full max-w-4xl space-y-3 overflow-hidden">
            <div className="flex animate-slide-left items-center gap-4 text-white transition-all duration-500">
              {[audienceGroups, audienceGroups].map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-4 whitespace-nowrap">
                  {group.map((item) => (
                    <div key={`${groupIndex}-${item}`} className="rounded-full border border-white/15 bg-black/40 px-5 py-2 text-base font-semibold text-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:text-lg">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex animate-slide-right items-center gap-4 text-white/80">
              {[projectNames, projectNames].map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-4 whitespace-nowrap">
                  {group.map((item) => (
                    <div key={`${groupIndex}-${item}`} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.18em] text-white/88 uppercase">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 overflow-hidden px-4 text-center sm:hidden animate-fade-in-trust">
          <p className="mb-4 text-sm text-white/90">For teams that expect disciplined AI-led execution</p>
          <div className="relative mx-auto w-full max-w-sm space-y-3 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-black to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-black to-transparent"></div>
            <div className="flex animate-slide-left-mobile items-center gap-3 text-white">
              {[audienceGroups, audienceGroups].map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-3 whitespace-nowrap">
                  {group.map((item) => (
                    <div key={`${groupIndex}-${item}`} className="rounded-full border border-white/12 bg-black/40 px-4 py-2 text-sm font-semibold text-white/95">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex animate-slide-right-mobile items-center gap-3 text-white/85">
              {[projectNames, projectNames].map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-3 whitespace-nowrap">
                  {group.map((item) => (
                    <div key={`${groupIndex}-${item}`} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/88 uppercase">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
