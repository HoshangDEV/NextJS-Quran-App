import { ThemeProvider } from "@/components/theme/theme-provider";
import {
  amiriQuran,
  notoKufiArabic,
  notoNaskhArabic,
  poppins,
  scheherazadeNew,
} from "@/public/fonts";
import type { Metadata } from "next";
import RootFooter from "./_root/root-footer";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Quran App",
    template: "%s | Quran App",
  },
  description:
    "Read and listen to the Holy Quran with tafseer in Kurdish, Arabic, and English.",
  keywords: ["quran", "quran app", "tafseer", "islamic", "quran audio"],
  authors: [{ name: "HoshangDEV", url: "https://hoshang.dev" }],
  openGraph: {
    title: "Quran App",
    description:
      "Read and listen to the Holy Quran with tafseer in Kurdish, Arabic, and English.",
    url: "https://quran.hoshang.dev",
    siteName: "Quran App",
    type: "website",
  },
  metadataBase: new URL("https://quran.hoshang.dev"),
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
      ${amiriQuran.variable}
      ${notoNaskhArabic.variable}
      ${scheherazadeNew.variable}
      ${poppins.variable}
      ${notoKufiArabic.variable}
      `}
      dir="rtl"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased flex flex-col justify-between font-poppins">
        <ThemeProvider attribute="class" defaultTheme="system">
          <main className="container px-2 md:px-8">{children}</main>
          <RootFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
