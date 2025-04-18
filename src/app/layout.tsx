'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import TopLoader from "@/components/NextTopLoader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TopLoader />
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
