import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme/theme-provider";
import RootFooter from "./_root/root-footer";
import { Analytics } from "@vercel/analytics/react";

const fontRoboto = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col justify-between",
          fontRoboto.variable
        )}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <main className="container">{children}</main>
          <Separator />
          <RootFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
