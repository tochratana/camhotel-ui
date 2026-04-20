"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterLink = {
  title: string;
  href: string;
};

const publicFeatureLinks: FooterLink[] = [
  { title: "Home", href: "/" },
  { title: "Rooms", href: "/rooms" },
  { title: "Facilities", href: "/facilities" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const customerFeatureLinks: FooterLink[] = [
  { title: "Login", href: "/login" },
  { title: "Register", href: "/register" },
  { title: "Customer Dashboard", href: "/customer" },
  { title: "Book a Room", href: "/customer/book" },
  { title: "My Bookings", href: "/customer/mybookings" },
  { title: "Profile", href: "/customer/profile" },
  { title: "My Rating", href: "/customer/rating" },
  { title: "Customer Settings", href: "/customer/settings" },
];

const managementFeatureLinks: FooterLink[] = [
  { title: "Admin Dashboard", href: "/admin" },
  { title: "Manage Rooms", href: "/admin/rooms" },
  { title: "Room Types", href: "/admin/room-types" },
  { title: "Manage Users", href: "/admin/users" },
  { title: "Admin Bookings", href: "/admin/bookings" },
  { title: "Admin Settings", href: "/admin/settings" },
  { title: "Staff Dashboard", href: "/staff" },
  { title: "Staff Rooms", href: "/staff/rooms" },
  { title: "Staff Bookings", href: "/staff/bookings" },
  { title: "Staff Settings", href: "/staff/settings" },
];

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
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (shouldHideFooter) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0c16]">
      <div className="px-8 py-14 w-full mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.9fr]">
          <div className="space-y-4">
            {/* <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
              Final Project
            </p> */}
            <div className="w-fit">
              <Image
                src="/logo-tran.svg"
                alt="CamHotel logo"
                width={170}
                height={62}
                className="h-14 w-auto"
                priority={false}
              />
            </div>
            <Link href="/" className="text-2xl font-bold tracking-tighter text-green-900 dark:text-blue-200 font-sans">
              CAM<span className="text-amber-400">-</span>HOTEL
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-md">
              School final project showcasing complete hotel workflows from
              public browsing to customer booking and admin or staff operations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">
              Public Features
            </h4>
            <div className="space-y-2">
              {publicFeatureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">
              Customer Features
            </h4>
            <div className="space-y-2">
              {customerFeatureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">
              Staff/Admin Features
            </h4>
            <div className="space-y-2">
              {managementFeatureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:text-right lg:items-end flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
              School
            </p>
            <div className="w-fit lg:ml-auto">
              <Image
                src="/logo/istad-light.png"
                alt="School logo (light mode)"
                width={190}
                height={68}
                className="h-14 w-auto block dark:hidden"
                priority={false}
              />
              <Image
                src="/logo/istad-dark.png"
                alt="School logo (dark mode)"
                width={190}
                height={68}
                className="h-14 w-auto hidden dark:block"
                priority={false}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              School Final Project
            </p>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {currentYear} CamHotel. Final Project Submission. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Built with Next.js and Redux Toolkit
          </p>
        </div>
      </div>
    </footer>
  );
}
