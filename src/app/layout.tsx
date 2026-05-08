import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { ConversionProvider } from "@/components/conversion/ConversionContext";
import { QuickEstimateSheet } from "@/components/conversion/QuickEstimateSheet";
import { StickyMobileCta } from "@/components/conversion/StickyMobileCta";
import { SiteChat } from "@/components/chat/SiteChat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteBrandName, siteDescription, siteTitle } from "@/lib/site";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Inter for body text — clean, professional readability */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vryntlab.com"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteBrandName,
    type: "website",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og-image.png"],
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
      className={`${geistSans.variable} ${inter.variable} h-full bg-[#080810] antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#080810] font-sans text-[15px] leading-relaxed text-[#C8C8D8] md:text-base"
      >
        <SchemaOrg />
        <ConversionProvider>
          <ScrollProgress />
          <SiteHeader />
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-[max(5.75rem,env(safe-area-inset-bottom,0px))] pt-0 sm:px-8 md:px-10 lg:px-16 lg:pb-[max(4rem,env(safe-area-inset-bottom,0px))]">
            <main className="flex flex-1 flex-col pt-4 sm:pt-5">{children}</main>
            <SiteFooter />
          </div>
          <QuickEstimateSheet />
          <StickyMobileCta />
          <SiteChat />
        </ConversionProvider>
      </body>
    </html>
  );
}
