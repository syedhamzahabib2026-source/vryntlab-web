import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteBrandName, siteDescription, siteTitle } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteBrandName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen font-sans text-[15px] leading-relaxed md:text-base"
      >
        <ScrollProgress />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-[max(2.75rem,env(safe-area-inset-bottom,0px))] pt-5 sm:px-8 sm:pb-14 sm:pt-7 md:px-10 lg:px-16 lg:pb-16">
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
