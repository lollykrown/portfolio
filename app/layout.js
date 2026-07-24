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


