import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/lib/providers";
import Header from "./components/common/header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Countries with REST APIs",
  description: "Built with Next.js, Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-100 antialiased dark:bg-slate-700 dark:text-zinc-200`}
      >
        <Providers>
          {/* Header */}
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
