import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "I build fast, scalable web apps with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* <body className="bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors duration-300"> */}
      <body className="min-h-full flex flex-col">
        <Providers>
        <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}


