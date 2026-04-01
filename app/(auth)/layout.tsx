import React from "react";

export default function AuthLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
            suppressHydrationWarning
        >
        <body className="min-h-full flex flex-col bg-background text-foreground">
            {children}
        </body>
        </html>
    );
}