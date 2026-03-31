"use client";

import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

export default function BookingsPage() {
  const { data } = useGetCurrentUserQuery();
  const name = data?.data?.fullName;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {name ? `Welcome back, ${name}.` : "Your current and past bookings will appear here."}
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-[#2d3154] dark:bg-[#161929]">
        <CalendarClock className="mx-auto mb-3 h-8 w-8 text-slate-400" />
        <p className="font-medium text-slate-700 dark:text-slate-200">No bookings yet.</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Start by exploring available rooms.
        </p>
        <Link
          href="/rooms"
          className="mt-4 inline-block rounded-lg bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e3a8a]"
        >
          Browse Rooms
        </Link>
      </div>
    </section>
  );
}
