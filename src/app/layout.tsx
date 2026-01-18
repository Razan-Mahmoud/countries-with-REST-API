import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import Header from "./components/common/header";
import "./globals.css";
import ScrollToTopButton from "./components/common/scroll-to-top-button";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme-preference"
          enableColorScheme
          disableTransitionOnChange
        >
          {/* Header */}
          <Header />

          {/* Main App */}
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
