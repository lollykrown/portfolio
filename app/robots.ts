// app/robots.ts — served automatically at /robots.txt

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://lollykrown.xyz/sitemap.xml",
    host: "https://lollykrown.xyz",
  };
}
