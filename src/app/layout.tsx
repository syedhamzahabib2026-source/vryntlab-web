import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { ConversionProvider } from "@/components/conversion/ConversionContext";
import { QuickEstimateSheet } from "@/components/conversion/QuickEstimateSheet";
import { StickyMobileCta } from "@/components/conversion/StickyMobileCta";
import { SiteChat } from "@/components/chat/SiteChat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteBrandName, siteDescription, siteTitle } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Display serif for headings — body stays Geist */
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  /** File-based icons in ./icon.png, ./apple-icon.png, ./favicon.ico — generated from public/brand/vl-logo.webp */
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
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen font-sans text-[15px] leading-relaxed md:text-base"
      >
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
