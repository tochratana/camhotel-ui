"use client";

import { Loader2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard";
import { getAdminDashboardConfig } from "@/components/dashboard/role-config";
import { buildAdminDashboardData } from "@/lib/dashboard-data";
import {
  useGetAllBookingsQuery,
  useGetRoomsQuery,
  useGetRoomTypesQuery,
  useGetUsersQuery,
} from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

export default function AdminDashboard() {
  const profileQuery = useGetCurrentUserQuery();
  const roomsQuery = useGetRoomsQuery({ page: 0, size: 50 });
  const roomTypesQuery = useGetRoomTypesQuery({ page: 0, size: 50 });
  const usersQuery = useGetUsersQuery({ page: 0, size: 50 });
  const bookingsQuery = useGetAllBookingsQuery({ page: 0, size: 50 });

  const profile = profileQuery.data?.data;
  const rooms = roomsQuery.data?.data?.content ?? [];
  const roomTypes = roomTypesQuery.data?.data?.content ?? [];
  const users = usersQuery.data?.data?.content ?? [];
  const bookings = bookingsQuery.data?.data?.content ?? [];

  const dashboardData = buildAdminDashboardData({
    rooms,
    roomTotal: roomsQuery.data?.data?.totalElements ?? rooms.length,
    roomTypes,
    roomTypeTotal: roomTypesQuery.data?.data?.totalElements ?? roomTypes.length,
    users,
    userTotal: usersQuery.data?.data?.totalElements ?? users.length,
    bookings,
    bookingTotal: bookingsQuery.data?.data?.totalElements ?? bookings.length,
  });

  const isLoading =
    profileQuery.isLoading ||
    roomsQuery.isLoading ||
    roomTypesQuery.isLoading ||
    usersQuery.isLoading ||
    bookingsQuery.isLoading;

  const hasError =
    profileQuery.isError ||
    roomsQuery.isError ||
    roomTypesQuery.isError ||
    usersQuery.isError ||
    bookingsQuery.isError;

  const config = getAdminDashboardConfig(profile);

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
      chartTitle="Booking Throughput"
      chartDescription={
        hasError
          ? "Some metrics failed to load; showing available backend data."
          : "Bookings trend from your current backend snapshot"
      }
    />
  );
}
