"use client";

import { Loader2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import { buildCustomerDashboardData } from "@/lib/dashboard-data";
import { useGetMyBookingsQuery, useGetRoomsQuery } from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

export default function CustomerDashboard() {
  const profileQuery = useGetCurrentUserQuery();
  const myBookingsQuery = useGetMyBookingsQuery({ page: 0, size: 50 });
  const roomsQuery = useGetRoomsQuery({ page: 0, size: 50 });

  const profile = profileQuery.data?.data;
  const myBookings = myBookingsQuery.data?.data?.content ?? [];
  const rooms = roomsQuery.data?.data?.content ?? [];

  const dashboardData = buildCustomerDashboardData({
    myBookings,
    myBookingTotal: myBookingsQuery.data?.data?.totalElements ?? myBookings.length,
    rooms,
    roomTotal: roomsQuery.data?.data?.totalElements ?? rooms.length,
  });

  const isLoading =
    profileQuery.isLoading || myBookingsQuery.isLoading || roomsQuery.isLoading;
  const hasError = profileQuery.isError || myBookingsQuery.isError || roomsQuery.isError;

  const config = getCustomerDashboardConfig(profile);

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
      chartTitle="My Stay Timeline"
      chartDescription={
        hasError
          ? "Some metrics failed to load; showing available backend data."
          : "Your reservation activity from backend data"
      }
    />
  );
}
