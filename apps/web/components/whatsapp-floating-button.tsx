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
      className="fixed bottom-4 right-4 z-[80] inline-flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500 text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition duration-200 hover:scale-[1.02] hover:bg-emerald-400 sm:bottom-6 sm:right-6 sm:h-[3.75rem] sm:w-[3.75rem]"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
