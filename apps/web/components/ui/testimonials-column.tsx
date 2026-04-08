"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`relative h-[700px] overflow-hidden ${props.className ?? ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration ?? 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <div
                className="max-w-xs w-full rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] p-10 shadow-lg shadow-gray-500/10 backdrop-blur-sm"
                style={{
                  boxShadow:
                    "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(156, 163, 175, 0.1), 0 0 20px rgba(156, 163, 175, 0.05)",
                }}
                key={i}
              >
                <div className="text-sm leading-relaxed text-gray-200">{text}</div>
                <div className="mt-5">
                  <div className="font-medium tracking-tight leading-5 text-gray-100">{name}</div>
                  <div className="tracking-tight leading-5 text-gray-300 opacity-60">{role}</div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
