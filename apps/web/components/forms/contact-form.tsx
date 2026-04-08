"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { contactSubmissionSchema } from "@magnence/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { companyInfo, servicePages } from "@/lib/site-data";

type ContactFormInput = z.infer<typeof contactSubmissionSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "WEBSITE",
      budget: "",
      message: "",
      source: "contact-page",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const selectedService = servicePages.find((service) => service.service === values.service)?.title ?? values.service;
      const emailSubject = `Magnence enquiry from ${values.name}`;
      const emailBody = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone || "Not provided"}`,
        `Company: ${values.company || "Not provided"}`,
        `Service: ${selectedService}`,
        `Budget: ${values.budget || "Not provided"}`,
        `Source: ${values.source || "website-enquiry"}`,
        "",
        "Project details:",
        values.message,
      ].join("\n");

      window.location.href = `mailto:${companyInfo.supportEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  return (
    <form id="enquiry-form" onSubmit={onSubmit} className="space-y-5 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
      <div>
        <p className="text-xs tracking-[0.24em] text-white/45 uppercase">Inquiry form</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Start with inquiry</h3>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">
          Tell us what you need help with and we will come back with the right next step, timeline, and delivery direction.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Name</span>
          <input
            placeholder="Your full name"
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
            {...form.register("name")}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Email</span>
          <input
            placeholder="name@company.com"
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
            {...form.register("email")}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Phone</span>
          <input
            placeholder="+91 ..."
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
            {...form.register("phone")}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Company</span>
          <input
            placeholder="Company or brand"
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
            {...form.register("company")}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Service</span>
          <select
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/25"
            {...form.register("service")}
          >
            {servicePages.map((service) => (
              <option key={service.slug} value={service.service} className="bg-slate-950 text-white">
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block text-white/72">Budget</span>
          <input
            placeholder="Project range or monthly retainer"
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
            {...form.register("budget")}
          />
        </label>
      </div>

      <label className="text-sm">
        <span className="mb-1.5 block text-white/72">Message</span>
        <textarea
          rows={6}
          placeholder="Share what you need, what is not working, and what kind of timeline you are aiming for."
          className="w-full rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
          {...form.register("message")}
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-6 text-white/45">
          By submitting, you agree to be contacted about your inquiry. Sensitive project details should be shared only after initial confirmation.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-slate-100 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
      </div>

      {status === "success" ? <p className="text-sm text-emerald-300">Your email app has been opened with the enquiry addressed to support@magnence.com.</p> : null}
      {status === "error" ? <p className="text-sm text-rose-300">We could not open your email app. Please email support@magnence.com directly.</p> : null}
      {Object.values(form.formState.errors).length > 0 ? <p className="text-sm text-rose-300">Please complete the required fields before sending.</p> : null}
    </form>
  );
}
