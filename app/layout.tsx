import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import StoreProvider from "@/components/provider/StoreProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
