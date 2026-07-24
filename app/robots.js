export default function robots(){
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
