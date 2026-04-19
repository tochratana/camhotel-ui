"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getStaffDashboardConfig } from "@/components/dashboard/role-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import type { BookingResponse, BookingStatus } from "@/types/hotel";

const STATUS_OPTIONS: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
];

type FilterStatus = BookingStatus | "ALL";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toTitleCase(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function statusClassName(status: BookingStatus): string {
  switch (status) {
    case "PENDING":
      return "border-amber-300 text-amber-700 bg-amber-50";
    case "CONFIRMED":
      return "border-blue-300 text-blue-700 bg-blue-50";
    case "CHECKED_IN":
      return "border-emerald-300 text-emerald-700 bg-emerald-50";
    case "CHECKED_OUT":
      return "border-slate-300 text-slate-700 bg-slate-50";
    case "CANCELLED":
      return "border-rose-300 text-rose-700 bg-rose-50";
    default:
      return "";
  }
}

function parseApiError(error: unknown): string {
  if (!error || typeof error !== "object") return "Unable to update booking status.";

  const maybeError = error as {
    data?: { message?: string };
    error?: string;
  };

  if (typeof maybeError.data?.message === "string") return maybeError.data.message;
  if (typeof maybeError.error === "string") return maybeError.error;
  return "Unable to update booking status.";
}

function statusDraft(
  drafts: Record<number, BookingStatus>,
  booking: BookingResponse,
): BookingStatus {
  return drafts[booking.id] ?? booking.status;
}

export default function StaffBookingsPage() {
  const profileQuery = useGetCurrentUserQuery();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [draftStatusByBookingId, setDraftStatusByBookingId] = useState<
    Record<number, BookingStatus>
  >({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const queryArgs = useMemo(
    () =>
      statusFilter === "ALL"
        ? { page, size: pageSize }
        : { page, size: pageSize, status: statusFilter },
    [page, pageSize, statusFilter],
  );

  const bookingsQuery = useGetAllBookingsQuery(queryArgs);
  const [updateBookingStatus, updateBookingStatusState] =
    useUpdateBookingStatusMutation();
  const config = getStaffDashboardConfig(profileQuery.data?.data);

  const pageData = bookingsQuery.data?.data;
  const bookings = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;
  const totalPages = Math.max(pageData?.totalPages ?? 1, 1);

  const pendingCount = bookings.filter((booking) => booking.status === "PENDING").length;
  const activeCount = bookings.filter(
    (booking) => booking.status === "CONFIRMED" || booking.status === "CHECKED_IN",
  ).length;
  const checkedOutCount = bookings.filter(
    (booking) => booking.status === "CHECKED_OUT",
  ).length;

  const isLoading = bookingsQuery.isLoading || bookingsQuery.isFetching;

  const handleStatusFilterChange = (value: FilterStatus) => {
    setStatusFilter(value);
    setPage(0);
    setFeedback(null);
  };

  const handleStatusChange = (bookingId: number, nextStatus: BookingStatus) => {
    setDraftStatusByBookingId((prev) => ({ ...prev, [bookingId]: nextStatus }));
  };

  const handleUpdateStatus = async (booking: BookingResponse) => {
    const nextStatus = statusDraft(draftStatusByBookingId, booking);
    if (nextStatus === booking.status) {
      setFeedback(`Booking #${booking.id} is already ${toTitleCase(booking.status)}.`);
      return;
    }

    setFeedback(null);
    try {
      await updateBookingStatus({
        id: booking.id,
        status: nextStatus,
      }).unwrap();
      const msg = `Booking #${booking.id} updated to ${toTitleCase(nextStatus)}.`;
      setFeedback(msg);
      toast.success(msg);
    } catch (error) {
      const errorMsg = parseApiError(error);
      setFeedback(errorMsg);
      toast.error(errorMsg);
    }
  };

  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  return (
    <DashboardFrame
      config={config}
      headerTitle="Booking Queue"
      headerDescription="Monitor and update booking statuses for staff operations"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Staff Booking Queue</CardTitle>
              <CardDescription>
                Monitor and update booking statuses using the backend staff endpoint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs text-muted-foreground">Visible Bookings</p>
              <p className="text-2xl font-semibold">{bookings.length}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">{pendingCount}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs text-muted-foreground">Active / Checked Out</p>
              <p className="text-2xl font-semibold">
                {activeCount} / {checkedOutCount}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Select
                value={statusFilter}
                onValueChange={(value) => handleStatusFilterChange(value as FilterStatus)}
              >
                <SelectTrigger className="w-full sm:w-52">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {toTitleCase(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 50].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size} rows
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => bookingsQuery.refetch()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>

          {feedback ? (
            <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
              {feedback}
            </div>
          ) : null}

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Stay</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading bookings...
                      </span>
                    </TableCell>
                  </TableRow>
                ) : bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                      No bookings found for this filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => {
                    const selectedStatus = statusDraft(draftStatusByBookingId, booking);
                    const isUpdatingThisRow =
                      updateBookingStatusState.isLoading &&
                      updateBookingStatusState.originalArgs?.id === booking.id;

                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.user?.fullName ?? "Guest"}</TableCell>
                        <TableCell>
                          {booking.room?.roomType?.name ?? "Room"} {booking.room?.roomNumber}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{booking.checkInDate}</p>
                            <p className="text-muted-foreground">{booking.checkOutDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {moneyFormatter.format(Number(booking.totalPrice ?? 0))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusClassName(booking.status)}
                          >
                            {toTitleCase(booking.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Select
                              value={selectedStatus}
                              onValueChange={(value) =>
                                handleStatusChange(booking.id, value as BookingStatus)
                              }
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Update status" />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {toTitleCase(status)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => void handleUpdateStatus(booking)}
                              disabled={isUpdatingThisRow}
                            >
                              {isUpdatingThisRow ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Save"
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {startItem}-{endItem} of {totalElements} bookings
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0 || isLoading}
              >
                Previous
              </Button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page + 1 >= totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          </div>

          {bookingsQuery.isError ? (
            <div className="rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive">
              Failed to load staff bookings from backend.
            </div>
          ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
