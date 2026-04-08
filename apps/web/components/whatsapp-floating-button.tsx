"use client";

import { MessageCircle } from "lucide-react";
import { whatsappInquiryHref } from "@/lib/site-data";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappInquiryHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Start enquiry on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500 text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition hover:scale-[1.02] hover:bg-emerald-400 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
