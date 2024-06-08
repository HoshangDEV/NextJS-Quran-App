import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CopyrightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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
        <main className="container">{children}</main>
        <Separator />
        <footer className="flex my-8 font-medium text-sm items-center justify-center h-10 text-muted-foreground">
          <CopyrightIcon className="w-4 h-4 mr-2" />
          <Link
            href="https://github.com/HoshangDEV"
            className="hover:underline"
            target="_blank">
            HoshangDEV
          </Link>{" "}
          | {new Date().getFullYear()}
        </footer>
        <Toaster richColors />
      </body>
    </html>
  );
}
