"use client";

import { Loader2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard";
import { getStaffDashboardConfig } from "@/components/dashboard/role-config";
import { buildStaffDashboardData } from "@/lib/dashboard-data";
import { useGetAllBookingsQuery, useGetRoomsQuery } from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

export default function StaffDashboard() {
  const profileQuery = useGetCurrentUserQuery();
  const roomsQuery = useGetRoomsQuery({ page: 0, size: 50 });
  const bookingsQuery = useGetAllBookingsQuery({ page: 0, size: 50 });

  const profile = profileQuery.data?.data;
  const rooms = roomsQuery.data?.data?.content ?? [];
  const bookings = bookingsQuery.data?.data?.content ?? [];

  const dashboardData = buildStaffDashboardData({
    rooms,
    roomTotal: roomsQuery.data?.data?.totalElements ?? rooms.length,
    bookings,
    bookingTotal: bookingsQuery.data?.data?.totalElements ?? bookings.length,
  });

  const isLoading =
    profileQuery.isLoading || roomsQuery.isLoading || bookingsQuery.isLoading;
  
  // Only consider it an error if profile fails or ALL data fails
  const hasError = profileQuery.isError || (roomsQuery.isError && bookingsQuery.isError);

  const config = getStaffDashboardConfig(profile);

  if (isLoading && dashboardData.rows.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardShell
      config={config}
      data={dashboardData.rows}
      cards={dashboardData.cards}
      chartData={dashboardData.chart}
      chartTitle="Operational Flow"
      isReadOnly={true}
      chartDescription={
        hasError
          ? "Some metrics failed to load; showing available backend data."
          : "Queue and check-in activity from backend bookings data"
      }
    />
  );
}
