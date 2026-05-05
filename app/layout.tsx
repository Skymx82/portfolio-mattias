import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mattias Mathevon - Portfolio",
  description:
    "Portfolio de Mattias Mathevon, developpeur fullstack 18 ans, fondateur d'AutoSoft, cofondateur Tolarys. Candidat BTS SIO SLAM E6 mai 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <LenisProvider>
          <Navigation />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
