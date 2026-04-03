import React from "react";

export default function AdminLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-background px-6 pt-28 pb-20">
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </main>
    );
}
