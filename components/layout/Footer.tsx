"use client";

import {footerData} from "@/data/menuData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const hideFooterRoutes = [
        "/login",
        "/register",
        "/admin",
        "/staff",
        "/customer",
        "/bookings",
        "/profile",
        "/dashboard",
    ];
    const shouldHideFooter = hideFooterRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    if (shouldHideFooter) return null;

    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0c16]">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full mx-auto max-w-7xl">
                <div className="mb-8 md:mb-0">
                    <div className="font-sans font-bold text-lg text-blue-900 dark:text-blue-200 mb-2">
                        CamHotel
                    </div>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                        © {currentYear} CamHotel Premium Hospitality. All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-8">
                    {footerData.map((link, index) => (
                        <Link
                            key={index}
                            href={link.link}
                            className="font-sans text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-all opacity-80 hover:opacity-100"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>

            </div>
        </footer>
    )
}
