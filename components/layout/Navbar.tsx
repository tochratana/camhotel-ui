"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, LogOut, UserRound, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navBarData } from "@/data/menuData";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  clearStoredBasicToken,
  getDashboardPathByRole,
  normalizeRole,
} from "@/lib/admin-auth";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "@/lib/feature/userSlice";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const hideNavbarRoutes = ["/login", "/register", "/admin", "/staff", "/customer", "/bookings", "/profile", "/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const token = useAuthToken();
  const hasToken = Boolean(token);

  const { data, error } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken || shouldHideNavbar,
  });

  useEffect(() => {
    if (!error) return;
    const status = (error as { status?: number }).status;
    if (status === 401 || status === 403) {
      clearStoredBasicToken();
    }
  }, [error]);

  if (shouldHideNavbar) return null;

  const user = data?.data;
  const userRole = normalizeRole(user?.role?.name);
  const accountHref = userRole ? getDashboardPathByRole(userRole) : "/profile";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      router.push("/login");
    }
  };

  return (
      <>
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#161929]/90 backdrop-blur-md shadow-sm dark:shadow-[#0c0e1a]/50">
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tighter text-green-900 dark:text-blue-200 font-sans">
              CAM<span className="text-amber-400">-</span>HOTEL
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navBarData.map((item, index) => (
                  <Link
                      key={index}
                      href={item.link}
                      className="text-sm tracking-wide uppercase font-semibold text-slate-600 hover:text-[#00236f] transition-colors dark:text-slate-300 dark:hover:text-blue-300"
                  >
                    {item.title}
                  </Link>
              ))}
            </div>

            {/* Actions & Hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {hasToken ? (
                    <>
                      <Link href={accountHref} className="inline-flex items-center gap-2 bg-[#00236f] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                        <UserRound className="h-4 w-4" />
                        {user?.fullName?.split(" ")[0] ?? "Profile"}
                      </Link>
                      <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg font-semibold text-sm">
                        <LogOut className="h-4 w-4" />
                      </button>
                    </>
                ) : (
                    <Link href="/login" className="bg-[#00236f] text-white px-6 py-2 rounded-lg font-bold text-sm">
                      Login
                    </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Overlay */}
        <div
            className={`fixed inset-0 z-60 bg-black/50 transition-opacity duration-300 lg:hidden ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
        />

        {/* Mobile Sidebar Content */}
        <aside
            className={`fixed top-0 right-0 z-70 h-full w-70 bg-white dark:bg-[#161929] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl dark:text-white">Menu</span>
              <ThemeToggle />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4 mb-8">
              {navBarData.map((item, index) => (
                  <Link
                      key={index}
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2"
                  >
                    {item.title}
                  </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              {hasToken ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#1d2138] rounded-xl mb-2">
                      <div className="bg-[#00236f] p-2 rounded-full text-white">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold dark:text-white">{user?.fullName ?? "User"}</span>
                        <Link
                          href={accountHref}
                          onClick={() => setIsOpen(false)}
                          className="text-xs text-blue-500"
                        >
                          View Dashboard
                        </Link>
                      </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center justify-center gap-2 w-full border border-red-200 text-red-600 p-3 rounded-xl font-bold dark:border-red-900/30"
                    >
                      {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                      Logout
                    </button>
                  </>
              ) : (
                  <>
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-[#00236f] text-white text-center py-3 rounded-xl font-bold"
                    >
                      Login
                    </Link>
                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="w-full border border-[#00236f] text-[#00236f] text-center py-3 rounded-xl font-bold dark:border-blue-400 dark:text-blue-300"
                    >
                      Register
                    </Link>
                  </>
              )}
            </div>
          </div>
        </aside>
      </>
  );
}
