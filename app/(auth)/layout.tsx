import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e8e9f0] dark:bg-slate-950">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617098907765-5e09a5f1d4c6?q=80&w=1964&auto=format&fit=crop')",
          }}
        />
      </div>

      <div className="absolute left-5 top-5 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Home
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
