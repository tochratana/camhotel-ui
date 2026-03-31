"use client";

import { Loader2, LogOut, Mail, Phone, ShieldUser, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery, useLogoutMutation } from "@/lib/feature/userSlice";

export default function ProfilePage() {
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data, isLoading, isFetching } = useGetCurrentUserQuery();

  const user = data?.data;

  const handleLogout = async () => {
    await logout().unwrap();
    router.push("/login");
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-[#2d3154] dark:bg-[#161929]">
        Unable to load user profile.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Basic auth session is active.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2d3154] dark:bg-[#161929]">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Full name</p>
            <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <UserRound className="w-4 h-4" />
              {user.fullName}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</p>
            <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Phone</p>
            <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Phone className="w-4 h-4" />
              {user.phoneNumber ?? "Not set"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</p>
            <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <ShieldUser className="w-4 h-4" />
              {user.role.name}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
        Logout
      </button>
    </section>
  );
}
