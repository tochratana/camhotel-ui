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
        <div className="absolute inset-0 bg-[#ececf3]/80 backdrop-blur-[2px] dark:bg-slate-950/78 dark:backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(109,120,154,0.14)_0px,rgba(109,120,154,0.14)_2px,transparent_2px,transparent_10px)] dark:bg-[repeating-linear-gradient(90deg,rgba(94,111,153,0.12)_0px,rgba(94,111,153,0.12)_2px,transparent_2px,transparent_12px)]" />
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

        <p className="mt-8 text-center text-xs text-slate-500/90 dark:text-slate-400/90">
          © 2026 CamHotel Premium Management System. All rights reserved.
        </p>
        <div className="mt-3 flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500/85 dark:text-slate-400/85">
          <Link href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Terms Of Service
          </Link>
          <Link href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Support
          </Link>
        </div>
      </div>

      {/* <div className="pointer-events-none absolute bottom-6 right-6 z-10 inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#1f3b93] shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-blue-300">
        <ShieldCheck className="h-3.5 w-3.5" />
        Secure Terminal
      </div> */}
    </main>
  );
}
