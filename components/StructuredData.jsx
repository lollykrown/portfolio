const SITE_URL = "https://lollykrown.xyz";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Kayode Agboola",
  alternateName: "LollyKrown",
  givenName: "Kayode",
  familyName: "Agboola",
  url: SITE_URL,
  image: `${SITE_URL}/pp.jpg`,
  email: "mailto:admin@lollykrown.xyz",
  jobTitle: "Fullstack Developer",
  description:
    "Freelance web developer building fast, scalable web apps with Next.js — specialising in authentication systems, API integration, and clean, responsive UI.",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Authentication",
    "REST APIs",
    "Web Performance",
    "CMS Integration",
    "Accessibility",
    "UI Design",
  ],
  sameAs: [
    "https://github.com/lollykrown",
    "https://linkedin.com/in/kayodeagboola",
    "https://twitter.com/lollykrown",
    "https://dribbble.com/lollykrown",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "LollyKrown",
  description:
    "Portfolio of LollyKrown — creative developer crafting modern, high-performance web experiences.",
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-GB",
};

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

// Portfolio projects as an ItemList of CreativeWorks
const portfolio = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/projects#portfolio`,
  name: "Selected Projects",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        name: "Union Care Consult",
        url: "https://unioncareconsult.com",
        creator: { "@id": `${SITE_URL}/#person` },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebSite",
        name: "Tivitea Africa",
        url: "https://tivitea.africa",
        creator: { "@id": `${SITE_URL}/#person` },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "WebSite",
        name: "Estandz Place Consulting Ltd",
        url: "https://estandzplaceconsulting.co.uk/",
        creator: { "@id": `${SITE_URL}/#person` },
      },
    },
  ],
};

export default function StructuredData() {
  const schemas = [person, website, profilePage, portfolio];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
