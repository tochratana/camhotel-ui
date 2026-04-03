import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/components/provider/StoreProvider";

export const metadata: Metadata = {
    title: "CamHotel — Premium Hospitality",
    description: "Experience architectural elegance and curated hospitality at CamHotel.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="h-full antialiased"
            suppressHydrationWarning
        >
        <body className="min-h-full flex flex-col bg-background text-foreground">
        <StoreProvider>
            <ThemeProvider>
                <Navbar/>
                {children}
                <Footer/>
            </ThemeProvider>
        </StoreProvider>
        </body>
        </html>
    );
}
