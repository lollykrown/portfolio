import PhotographyComp from "@/components/PhotographyComp";

export const metadata = {
  title: 'Photography',
  description:
    'Explore photography by LollyKrown — a collection of portraits, creative shots, and visual storytelling capturing moments, mood, and detail.',
  alternates: {
    canonical: '/photography',
  },
  keywords: [
    'Photography portfolio',
    'Portrait photography',
    'Creative photography',
    'Visual storytelling',
    'LollyKrown photography',
    'Events Photography',
    'Travel Photography',
    'Weddings','Maternity','Baby','Newborn'
  ],

  openGraph: {
    title: 'Photography | Lollykrown',
    description:
      'A curated photography collection capturing people, moments, and atmosphere.',
    url: 'https://lollykrown.xyz/photography',
    images: ['/og-photography.jpg'], // 👈 create this
  },
};

// ─── Main page ────────────────────────────────────────────────────
export default function Photography() {
  return (
    <PhotographyComp/>
  );
}