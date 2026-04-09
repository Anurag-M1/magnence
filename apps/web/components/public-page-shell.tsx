import type { ReactNode } from "react";
import Aurora from "@/components/Aurora";
import { Footer } from "@/components/footer";
import { GlassmorphismNav } from "@/components/glassmorphism-nav";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";

type PublicPageShellProps = {
  children: ReactNode;
  showFooter?: boolean;
  auroraSpeed?: number;
};

export function PublicPageShell({ children, showFooter = true, auroraSpeed = 0.72 }: PublicPageShellProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-black text-white">
      <main className="relative min-h-screen overflow-x-clip">
        <div className="fixed inset-0 h-full w-full pointer-events-none">
          <Aurora colorStops={["#475569", "#94a3b8", "#ffffff"]} amplitude={1.1} blend={0.55} speed={auroraSpeed} />
        </div>
        <div className="relative z-10 text-white">
          <GlassmorphismNav />
          <div className="pt-16 sm:pt-20">{children}</div>
          {showFooter ? <Footer /> : null}
          <WhatsAppFloatingButton />
        </div>
      </main>
    </div>
  );
}
