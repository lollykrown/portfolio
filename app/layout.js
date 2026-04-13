import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from "@/components/Footer";
import Script from "next/script";
import AnalyticsManager from "@/components/AnalyticsManager";
import { PageTracker } from "@/components/PageTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://lollykrown.xyz'),

  title: {
    default: 'Lollykrown | Creative Developer',
    template: '%s | Lollykrown',
  },

  description:
    'LollyKrown is a creative developer crafting modern, high-performance web experiences with clean design and smooth interactions.',

  keywords: [
    'Lollykrown',
    'Frontend Developer',
    'Next.js Developer',
    'Web Developer Portfolio',
    'UI Developer',
    'React.js Developer',
    'Fullstack Developer',
    'Node.js Developer',
    'React Native Developer',
    'SEO',
    'HTML5', 'CSS3', 'JavaScript', 'websites', 'sites', 'portfolio', 'responsive',
  ],

  openGraph: {
    title: 'LollyKrown | Creative Developer',
    description:
      'Modern web experiences built with performance, design, and scalability in mind.',
    url: 'https://lollykrown.xyz',
    siteName: 'Lollykrown',
    images: [
      {
        url: '/og-image.jpg', // 👈 add this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  author:'Kayode Agboola',
  twitter: {
    card: 'summary_large_image',
    title: 'Lollykrown | Creative Developer',
    description:
      'Explore modern web projects and creative development work.',
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://lollykrown.xyz'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
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

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageGallery',
              name: 'LollyKrown Photography',
              url: 'https://lollykrown.xyz/photography',
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
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


