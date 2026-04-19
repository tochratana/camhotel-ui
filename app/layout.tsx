import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/components/provider/StoreProvider";
import { Playfair_Display, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "CamHotel — Premium Hospitality",
  description:
    "Experience architectural elegance and curated hospitality at CamHotel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        "font-sans",
        poppins.variable,
        playfairDisplay.variable,
      )}
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
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
