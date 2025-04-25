import { ThemeProvider } from "@/components/theme/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import RootFooter from "./_root/root-footer";
import "./globals.css";
import {
  Amiri,
  Amiri_Quran,
  Baloo_Bhaijaan_2,
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Poppins,
  Scheherazade_New,
} from "next/font/google";

const amiri = Amiri({
  subsets: ["latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

const amiriQuran = Amiri_Quran({
  subsets: ["latin"],
  variable: "--font-amiri-quran",
  weight: ["400"],
});

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  variable: "--font-baloo-bhaijaan-2",
  weight: ["400", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["latin"],
  variable: "--font-noto-naskh-arabic",
  weight: ["400"],
});

const scheherazadeNew = Scheherazade_New({
  subsets: ["latin"],
  variable: "--font-scheherazade-new",
  weight: ["400", "700"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["latin"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Created by @HoshangDEV",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
      ${amiri.variable} 
      ${amiriQuran.variable}
      ${balooBhaijaan2.variable}
      ${notoNaskhArabic.variable}
      ${scheherazadeNew.variable}
      ${poppins.variable}
      ${notoKufiArabic.variable}
      `}
      dir="rtl"
    >
      <body className="min-h-screen bg-background antialiased flex flex-col justify-between font-poppins">
        <ThemeProvider attribute="class" defaultTheme="system">
          <main className="container">{children}</main>
          <RootFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
