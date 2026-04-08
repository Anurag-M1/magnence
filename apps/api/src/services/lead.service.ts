import { prisma } from "@magnence/db";
import { type ContactSubmissionInput } from "@magnence/types";
import { decryptSensitiveValue } from "../lib/security/crypto.js";
import { encryptPhone } from "./auth.service.js";

export async function createLead(input: ContactSubmissionInput) {
  const encryptedPhone = await encryptPhone(input.phone);
  return prisma.lead.create({
    data: {
      name: input.name,
      email: input.email,
      phone: encryptedPhone.phone,
      phoneEncrypted: encryptedPhone.phoneEncrypted,
      company: input.company,
      service: input.service,
      budget: input.budget,
      message: input.message,
      source: input.source ?? "website",
    },
  });
}

export async function listLeads(page: number, limit: number, search?: string) {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { company: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [items, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { notes: true, assignedTo: true },
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    items: items.map((lead) => ({
      ...lead,
      phone: decryptSensitiveValue(lead.phoneEncrypted) ?? lead.phone,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
