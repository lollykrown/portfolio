// app/sitemap.ts — served automatically at /sitemap.xml

import type { MetadataRoute } from "next";

const SITE_URL = "https://lollykrown.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/photography`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}

// If you later add individual project pages (e.g. /projects/tivitea),
// generate them dynamically:
//
// const projects = ["union-care-consult", "tivitea-africa", "care-network"];
// ...projects.map((slug) => ({
//   url: `${SITE_URL}/projects/${slug}`,
//   lastModified,
//   changeFrequency: "yearly" as const,
//   priority: 0.6,
// })),
