import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/providers/theme-provider";
import { useTheme } from "next-themes";
import TopLoader from "@/components/NextTopLoader";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMA",
  description: "An elegant, Open source responsive task management tool built with Next.js and shadcn/ui.",
  icons: {
    icon: "/favicon.png"
  }
};




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
