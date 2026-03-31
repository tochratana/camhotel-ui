"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, LogOut, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navBarData } from "@/data/menuData";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { clearStoredBasicToken } from "@/lib/auth";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import { useGetCurrentUserQuery, useLogoutMutation } from "@/lib/feature/userSlice";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const token = useAuthToken();
  const hasToken = Boolean(token);

  const { data, error, isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (!error) return;

    const status = (error as { status?: number }).status;
    if (status === 401 || status === 403) {
      clearStoredBasicToken();
    }
  }, [error]);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  if (isAuthPage) return null;

  const user = data?.data;

  const handleLogout = async () => {
    await logout().unwrap();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#161929]/90 backdrop-blur-md shadow-sm dark:shadow-[#0c0e1a]/50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[#00236f] dark:text-blue-200 font-sans">
          CamHotel
        </Link>

        <div className="hidden md:flex items-center space-x-8">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {hasToken ? (
            <>
              {isFetching && !user ? (
                <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading
                </span>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 bg-[#00236f] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#1e3a8a] dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <UserRound className="h-4 w-4" />
                    {user?.fullName?.split(" ")[0] ?? "Profile"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 hover:bg-slate-100 dark:border-[#2d3154] dark:text-slate-200 dark:hover:bg-[#1d2138] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="border border-[#00236f] text-[#00236f] px-4 py-2 rounded-lg font-bold text-sm tracking-wide hover:bg-[#00236f]/10 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/10"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-500 dark:to-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-transform active:scale-95"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
