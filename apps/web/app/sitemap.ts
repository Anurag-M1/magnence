import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const now = new Date();

  return [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/blog",
    "/contact",
    "/pricing",
    "/book",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
