import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageAnimate from "@/components/layout/PageAnimate";
import StoreProvider from "@/components/provider/StoreProvider";
import NetworkStatusBanner from "@/components/system/NetworkStatusBanner";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://camhotel-ui.tochratana.com"
).replace(/\/+$/, "");
const ogImagePath = "/image/cam-hotel.png";
const ogImageUrl = new URL(ogImagePath, siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CamHotel | Premium Hospitality in Cambodia",
    template: "%s | CamHotel",
  },
  description:
    "Book stylish rooms, discover premium facilities, and enjoy a seamless hospitality experience at CamHotel.",
  keywords: [
    "CamHotel",
    "hotel in Cambodia",
    "luxury hotel",
    "room booking",
    "online hotel reservation",
    "hospitality",
    "ISTAD",
    "tochratana",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "CamHotel",
    locale: "en_US",
    title: "CamHotel | Premium Hospitality in Cambodia",
    description:
      "Book stylish rooms, discover premium facilities, and enjoy a seamless hospitality experience at CamHotel.",
    images: [
      {
        url: ogImageUrl,
        width: 2400,
        height: 1260,
        alt: "CamHotel - Premium Hospitality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CamHotel | Premium Hospitality in Cambodia",
    description:
      "Book stylish rooms, discover premium facilities, and enjoy a seamless hospitality experience at CamHotel.",
    images: [ogImageUrl],
  },
  icons: {
    icon: "/favicon.ico",
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
      className={cn("h-full antialiased", "font-sans", poppins.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-full flex flex-col bg-background text-foreground font-sans",
        )}
      >
        <StoreProvider>
          <ThemeProvider>
            <Navbar />
            <NetworkStatusBanner />
            <PageAnimate>{children}</PageAnimate>
            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
