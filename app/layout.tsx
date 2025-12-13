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
          <main className="container">{children}</main>
          <RootFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
