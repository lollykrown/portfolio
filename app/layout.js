import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from "@/components/Footer";
import AnalyticsManager from "@/components/AnalyticsManager";
import { PageTracker } from "@/components/PageTracker";
import StructuredData from "@/components/StructuredData";
const SITE_URL = "https://lollykrown.xyz";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lollykrown | Creative Developer',
    template: '%s | Lollykrown',
  },
  description:
    "LollyKrown is a creative frontend developer crafting modern, high-performance web experiences with Next.js — clean design, smooth interactions, and scalable architecture.",
  keywords: [
    'Lollykrown',
    'Frontend Developer',
    'Fullstack Developer',
    'Mobile Developer',
    'Next.js Developer',
    'Web Developer Portfolio',
    "TypeScript Developer",
    "Freelance Web Developer",
    'UI Developer',
    'React.js Developer',
    'Node.js Developer',
    'React Native Developer',
    'SEO',
    'HTML5', 'CSS3', 'JavaScript', 'websites', 'sites', 'portfolio', 'responsive',
  ],
  applicationName: "LollyKrown",
  authors: [{ name: "Kayode Agboola", url: SITE_URL }],
  creator: "Kayode Agboola",
  publisher: "LollyKrown",
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "LollyKrown",
    title: 'LollyKrown | Creative Developer',
    description:
      'Modern web experiences built with performance, design, and scalability in mind.',
    locale: 'en_GB',
    images: [
      {
        url: '/og-image.jpg', // 👈 add this image
        width: 1200,
        height: 630,
        alt: "LollyKrown — creative developer portfolio",
      },
    ],
  },
  author:'Kayode Agboola',
  twitter: {
    card: 'summary_large_image',
    title: 'Lollykrown | Creative Developer',
    description:
      'Explore modern web projects and creative development work.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                  var themes = {
                    amber:   { '--color-accent':'#f59e0b','--color-accent-light':'#fcd34d','--color-accent-hover':'#d97706','--color-accent-muted':'#92400e','--color-accent-subtle':'#fbbf24','--color-grad-from':'#f59e0b','--color-grad-via':'#fbbf24','--color-grad-to':'#fcd34d','--color-grad-alt-to':'#fb923c','--color-arrow-stroke':'#1c1917','--color-scroll-stroke':'#fbbf24' },
                    emerald: { '--color-accent':'#10b981','--color-accent-light':'#6ee7b7','--color-accent-hover':'#059669','--color-accent-muted':'#064e3b','--color-accent-subtle':'#34d399','--color-grad-from':'#10b981','--color-grad-via':'#34d399','--color-grad-to':'#6ee7b7','--color-grad-alt-to':'#14b8a6','--color-arrow-stroke':'#022c22','--color-scroll-stroke':'#34d399' },
                    rose:    { '--color-accent':'#f43f5e','--color-accent-light':'#fda4af','--color-accent-hover':'#e11d48','--color-accent-muted':'#881337','--color-accent-subtle':'#fb7185','--color-grad-from':'#f43f5e','--color-grad-via':'#fb7185','--color-grad-to':'#fda4af','--color-grad-alt-to':'#fb923c','--color-arrow-stroke':'#fff1f2','--color-scroll-stroke':'#fb7185' },
                    blue:    { '--color-accent':'#3b82f6','--color-accent-light':'#93c5fd','--color-accent-hover':'#2563eb','--color-accent-muted':'#1e3a8a','--color-accent-subtle':'#60a5fa','--color-grad-from':'#3b82f6','--color-grad-via':'#60a5fa','--color-grad-to':'#93c5fd','--color-grad-alt-to':'#22d3ee','--color-arrow-stroke':'#eff6ff','--color-scroll-stroke':'#60a5fa' },
                    violet:  { '--color-accent':'#8b5cf6','--color-accent-light':'#c4b5fd','--color-accent-hover':'#7c3aed','--color-accent-muted':'#4c1d95','--color-accent-subtle':'#a78bfa','--color-grad-from':'#8b5cf6','--color-grad-via':'#a78bfa','--color-grad-to':'#c4b5fd','--color-grad-alt-to':'#818cf8','--color-arrow-stroke':'#f5f3ff','--color-scroll-stroke':'#a78bfa' },
                    lime:    { '--color-accent':'#84cc16','--color-accent-light':'#d9f99d','--color-accent-hover':'#65a30d','--color-accent-muted':'#1a2e05','--color-accent-subtle':'#a3e635','--color-grad-from':'#84cc16','--color-grad-via':'#a3e635','--color-grad-to':'#d9f99d','--color-grad-alt-to':'#4ade80','--color-arrow-stroke':'#1a2e05','--color-scroll-stroke':'#a3e635' },
                    sky:     { '--color-accent':'#0ea5e9','--color-accent-light':'#bae6fd','--color-accent-hover':'#0284c7','--color-accent-muted':'#0c4a6e','--color-accent-subtle':'#38bdf8','--color-grad-from':'#0ea5e9','--color-grad-via':'#38bdf8','--color-grad-to':'#bae6fd','--color-grad-alt-to':'#a5f3fc','--color-arrow-stroke':'#f0f9ff','--color-scroll-stroke':'#38bdf8' },
                  };
                  var c = localStorage.getItem('color-theme') || 'amber';
                  var vars = themes[c] || themes.amber;
                  Object.keys(vars).forEach(function(k) { document.documentElement.style.setProperty(k, vars[k]); });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <StructuredData/>
        <ThemeProvider attribute="class" defaultTheme="dark">
        <AnalyticsManager>
        <Navbar />
          {children}

          <Footer />
          <PageTracker/>
        </AnalyticsManager>
        </ThemeProvider>
      </body>
    </html>
  );
}


