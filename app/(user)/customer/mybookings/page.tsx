"use client";

import {
  Loader2,
  CalendarIcon,
  DollarSignIcon,
  CreditCardIcon,
} from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import { useGetMyBookingsQuery } from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomerMyBookings() {
  const profileQuery = useGetCurrentUserQuery();
  const myBookingsQuery = useGetMyBookingsQuery({ page: 0, size: 50 });

  const profile = profileQuery.data?.data;
  const myBookings = myBookingsQuery.data?.data?.content ?? [];

  const config = getCustomerDashboardConfig(profile);

  const isLoading = profileQuery.isLoading || myBookingsQuery.isLoading;
  const hasError = profileQuery.isError || myBookingsQuery.isError;

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CHECKED_IN":
        return "bg-blue-100 text-blue-800";
      case "CHECKED_OUT":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <DashboardFrame config={config}>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-slate-500 mt-1">
              {hasError
                ? "Some data failed to load. Please refresh the page."
                : `You have ${myBookings.length} booking${myBookings.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {isLoading && myBookings.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : myBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-slate-500">
                  No bookings yet. Start planning your stay!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Booking #{booking.id}
                        </CardTitle>
                        <CardDescription>
                          {booking.room?.roomType?.name || "Room"} -{" "}
                          {booking.room?.roomNumber
                            ? `Room ${booking.room.roomNumber}`
                            : ""}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)}`}>
                        {booking.status?.replace("_", " ") || "Unknown"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500">Check In</p>
                          <p className="font-medium">{booking.checkInDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500">Check Out</p>
                          <p className="font-medium">{booking.checkOutDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <DollarSignIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500">Total Price</p>
                          <p className="font-medium">
                            ${booking.totalPrice?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCardIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500">Guest Name</p>
                          <p className="font-medium">
                            {booking.user?.fullName || "Not set"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardFrame>
  );
}
