export const projects = [
  {
    title: "Union Care Consult",
    description: `A sleek, single-page website built for a small business to establish a strong and modern online presence.
    I transformed a Figma design into clean, production-ready code—starting with a solid HTML, CSS, and Bootstrap, then progressively enhancing the project by migrating it into a React-based architecture for improved scalability and maintainability. To elevate the visual experience, I integrated illustrations from unDraw, adding a polished and engaging touch to the overall design.`,
    tech: ["Next.js", 'Bootstrap','Responsive Design', 'Figma to Code', 'Illustration Integration',],
    github: "https://github.com/lollykrown",
    thumbnail: "/project1.png",
    live: "https://unioncareconsult.com",
  },
  {
    title: "Tivitea Africa",
    description: `The project focused on creating a dynamic, user-centric platform designed to 
      empower artisans—giving them seamless access to rentable workspaces and tools, while also 
      enabling them to showcase their skills and connect with potential clients.
      I was responsible for bringing the vision to life on the frontend—translating a comprehensive 
      Figma design system into a fully functional, responsive, and high-performance web experience. 
      This involved crafting reusable components, ensuring pixel-perfect implementation, 
      and delivering an intuitive interface that balances aesthetics with usability.`,
    tech: ["Next.js", "Tailwind", 'API Integration', 'Figma to Code','Authentication', 'Payment Integration', 'REST API', 'Responsive Design', 'Performance Optimization','SEO'],
    github: "https://github.com/lollykrown",
    thumbnail: "/project2.png",
    live: "https://tivitea.africa",
  },
  {
    title: "Dashboard",
    description: "A powerful, highly customizable dashboard application built with Next.js and a modern ecosystem of supporting libraries, designed for scalability, performance, and a seamless user experience.",
    tech: ["Next.js", "Tailwind","Chart Libraries",],
    github: "https://github.com/lollykrown",
    thumbnail: "/project3.png",
    live: "https://robust-dashboard.netlify.app",
  },
];

// ─── Categories ───────────────────────────────────────────────────
export const categories = [
  { id: "all",       label: "All Work" },
  { id: "portraits", label: "Portraits" },
  { id: "weddings",  label: "Weddings" },
  { id: "events",    label: "Events" },
  { id: "maternity",    label: "Maternity" },
  // { id: "editorial", label: "Editorial" },
  // { id: "nature",     label: "Nature" },
  // { id:"travel", label:"Travel" },
  // { id: "product",    label: "Product" },
  { id: "baby",      label: "Baby" },
  { id: "other",     label: "Other" },
];

// ─── Photo data ───────────────────────────────────────────────────
export const photos = [
  { id: 1,  category: "weddings",  src: "https://res.cloudinary.com/lollykrown/image/upload/v1775987390/photography/KAY_2447-Edit.jpg", alt: "Civil Wedding", aspectRatio: "wide", location: "City Hall,Sunderland, UK" },
  { id: 2,  category: "portraits",  src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007141/photography/0737.jpg", alt: "Studio Portrait", aspectRatio: "tall", location: "Lollykrown Studios, Sunderland, UK" },
  { id: 3,  category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1775995918/photography/KAY_0505.jpg",    alt: "Birthday Celebrant's Dance", aspectRatio: "wide",   location: "Maya Suite, Sheffield, UK" },
  { id: 4,  category: "baby",      src: "https://res.cloudinary.com/lollykrown/image/upload/v1775988516/photography/KAY_8943-Edit.jpg", alt: "Newborn Baby Portrait", aspectRatio: "tall", location: "Lollykrown Studios, Sunderland, UK" },
  { id: 5,  category: "portraits", src: "https://res.cloudinary.com/lollykrown/image/upload/v1775987389/photography/KAY_2106-Edit.jpg", alt: "Sunset Portrait", aspectRatio: "tall", location: "Osaka Gardens, Sunderland, UK" },
  { id: 6,  category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1775989009/photography/KAY_0805.jpg", alt: "Aso Ebi Ladies", aspectRatio: "wide", location: "Fedash Centre, Sunderland, UK" },
  { id: 7,  category: "maternity", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776006164/photography/KAY_3868.jpg", alt: "Maternity Photoshoot", aspectRatio: "tall", location: "Mowbray Park, Sunderland, UK" },
  { id: 8,  category: "portraits", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007342/photography/KAY_7587.jpg", alt: "Birthday Portrait", aspectRatio: "tall", location: "Lezzet Restaurant, Newcastle, UK" },
  { id: 9,  category: "weddings",  src: "https://res.cloudinary.com/lollykrown/image/upload/v1775987389/photography/KAY_2369.jpg", alt: "Couple Portrait", aspectRatio: "wide",   location: "Brew & Bake, Sunderland, UK" },
  { id: 10, category: "maternity", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776006161/photography/KAY_3783.jpg", alt: "Maternity Photoshoot", aspectRatio: "tall", location: "Mowbray Park, Sunderland, UK" },
  { id: 11, category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1775995079/photography/KAY_1451.jpg", alt: "Birthday Celebrant's Dance", aspectRatio: "square", location: "Fedash Centre, Sunderland, UK" },
  { id: 12, category: "portraits", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007144/photography/0589a.jpg", alt: "Studio Portrait", aspectRatio: "tall", location: "Lollykrown Studios, Sunderland, UK" },
  { id: 13, category: "baby",      src: "https://res.cloudinary.com/lollykrown/image/upload/v1775988552/photography/KAY_8941.jpg", alt: "Newborn Baby Portrait",  aspectRatio: "square", location: "Lollykrown Studios, Sunderland, UK" },
  { id: 14, category: "portraits", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007341/photography/KAY_7604.jpg", alt: "Birthday Portrait",    aspectRatio: "tall",   location: "Lezzet Restaurant, Newcastle, UK" },
  { id: 15, category: "baby",      src: "https://res.cloudinary.com/lollykrown/image/upload/v1775988521/photography/KAY_9019-Edit.jpg", alt: "Newborn Baby Portrait",  aspectRatio: "square", location: "Lollykrown Studios, Sunderland, UK" },
  { id: 16, category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1775987392/photography/KAY_5469.jpg", alt: "African Cultural Dance and Drama", aspectRatio: "wide", location: "Fedash Centre, Sunderland, UK" },
  { id: 17, category: "weddings",  src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007195/photography/IMG_7011.jpg", alt: "Couple Photoshoot", aspectRatio: "square", location: "Heaton Park, Newcastle, UK" },
  { id: 18, category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1776007340/photography/KAY_7539.jpg", alt: "Birthday Dinner", aspectRatio: "square", location: "Lezzet Restaurant, Newcastle, UK" },
  { id: 19, category: "maternity", src: "https://res.cloudinary.com/lollykrown/image/upload/v1776006168/photography/KAY_3867.jpg", alt: "Maternity Photoshoot",    aspectRatio: "tall",   location: "Mowbray Park, Sunderland, UK" },
  { id: 20, category: "events",    src: "https://res.cloudinary.com/lollykrown/image/upload/v1775995080/photography/KAY_0693.jpg",     alt: "Birthday dance",      aspectRatio: "tall",   location: "Seaham City Hall, Seaham, UK" },
  // { id: 17, category: "nature",    src: "/photos/nature-3.jpg",    alt: "Aurora over lake",          aspectRatio: "square", location: "Iceland" },
  // { id: 18, category: "editorial", src: "/photos/editorial-3.jpg", alt: "Street style editorial",    aspectRatio: "tall",   location: "Milan, Italy" },
  // { id: 19, category: "product",   src: "/photos/product-3.jpg",   alt: "Product photography",       aspectRatio: "square", location: "Berlin, Germany" },
  { id: 21, category: "baby",      src: "https://res.cloudinary.com/lollykrown/image/upload/v1775988554/photography/KAY_9055-Edit.jpg", alt: "Sleeping newborn", aspectRatio: "wide",   location: "Lollykrown Studios, Sunderland, UK" },
];