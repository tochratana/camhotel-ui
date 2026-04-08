"use client";

import { useMemo, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getAdminDashboardConfig } from "@/components/dashboard/role-config";
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
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import {
  useGetRoomTypesQuery,
  useGetRoomsQuery,
  useUpdateRoomStatusMutation,
} from "@/lib/feature/hotelSlice";
import type { RoomResponse, RoomStatus } from "@/types/hotel";

const ROOM_STATUS_OPTIONS: RoomStatus[] = [
  "AVAILABLE",
  "OCCUPIED",
  "CLEANING",
  "MAINTENANCE",
];

type FilterStatus = RoomStatus | "ALL";
type FilterRoomTypeId = number | "ALL";

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

function statusClassName(status: RoomStatus): string {
  switch (status) {
    case "AVAILABLE":
      return "border-emerald-300 text-emerald-700 bg-emerald-50";
    case "OCCUPIED":
      return "border-blue-300 text-blue-700 bg-blue-50";
    case "CLEANING":
      return "border-amber-300 text-amber-700 bg-amber-50";
    case "MAINTENANCE":
      return "border-rose-300 text-rose-700 bg-rose-50";
    default:
      return "";
  }
}

function parseApiError(error: unknown): string {
  if (!error || typeof error !== "object") return "Unable to update room status.";

  const maybeError = error as {
    data?: { message?: string };
    error?: string;
  };

  if (typeof maybeError.data?.message === "string") return maybeError.data.message;
  if (typeof maybeError.error === "string") return maybeError.error;
  return "Unable to update room status.";
}

function statusDraft(
  drafts: Record<number, RoomStatus>,
  room: RoomResponse,
): RoomStatus {
  return drafts[room.id] ?? room.status;
}

export default function AdminRoomsPage() {
  const profileQuery = useGetCurrentUserQuery();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [roomTypeFilter, setRoomTypeFilter] = useState<FilterRoomTypeId>("ALL");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [draftStatusByRoomId, setDraftStatusByRoomId] = useState<
    Record<number, RoomStatus>
  >({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const config = getAdminDashboardConfig(profileQuery.data?.data);

  const roomTypesQuery = useGetRoomTypesQuery({ page: 0, size: 100 });

  const queryArgs = useMemo(
    () => ({
      page,
      size: pageSize,
      status: statusFilter === "ALL" ? undefined : statusFilter,
      roomTypeId: roomTypeFilter === "ALL" ? undefined : roomTypeFilter,
    }),
    [page, pageSize, roomTypeFilter, statusFilter],
  );

  const roomsQuery = useGetRoomsQuery(queryArgs);
  const [updateRoomStatus, updateRoomStatusState] = useUpdateRoomStatusMutation();

  const pageData = roomsQuery.data?.data;
  const rooms = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;
  const totalPages = Math.max(pageData?.totalPages ?? 1, 1);
  const roomTypes = roomTypesQuery.data?.data?.content ?? [];

  const availableCount = rooms.filter((room) => room.status === "AVAILABLE").length;
  const occupiedCount = rooms.filter((room) => room.status === "OCCUPIED").length;
  const cleaningCount = rooms.filter((room) => room.status === "CLEANING").length;
  const maintenanceCount = rooms.filter((room) => room.status === "MAINTENANCE").length;

  const isLoading = roomsQuery.isLoading || roomsQuery.isFetching;

  const handleStatusFilterChange = (value: FilterStatus) => {
    setStatusFilter(value);
    setPage(0);
    setFeedback(null);
  };

  const handleRoomTypeFilterChange = (value: string) => {
    setRoomTypeFilter(value === "ALL" ? "ALL" : Number(value));
    setPage(0);
    setFeedback(null);
  };

  const handleStatusChange = (roomId: number, nextStatus: RoomStatus) => {
    setDraftStatusByRoomId((prev) => ({ ...prev, [roomId]: nextStatus }));
  };

  const handleUpdateStatus = async (room: RoomResponse) => {
    const nextStatus = statusDraft(draftStatusByRoomId, room);
    if (nextStatus === room.status) {
      setFeedback(`Room ${room.roomNumber} is already ${toTitleCase(room.status)}.`);
      return;
    }

    setFeedback(null);
    try {
      await updateRoomStatus({
        id: room.id,
        status: nextStatus,
      }).unwrap();
      setFeedback(`Room ${room.roomNumber} updated to ${toTitleCase(nextStatus)}.`);
    } catch (error) {
      setFeedback(parseApiError(error));
    }
  };

  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  return (
    <DashboardFrame
      config={config}
      headerTitle="Room Management"
      headerDescription="Monitor room inventory and control room status"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Admin Room Board</CardTitle>
              <CardDescription>
                Full room visibility across all types and floors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="text-2xl font-semibold">{availableCount}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Occupied</p>
                  <p className="text-2xl font-semibold">{occupiedCount}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Cleaning</p>
                  <p className="text-2xl font-semibold">{cleaningCount}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                  <p className="text-2xl font-semibold">{maintenanceCount}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      handleStatusFilterChange(value as FilterStatus)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-52">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Statuses</SelectItem>
                      {ROOM_STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {toTitleCase(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={String(roomTypeFilter)}
                    onValueChange={handleRoomTypeFilterChange}
                  >
                    <SelectTrigger className="w-full sm:w-52">
                      <SelectValue placeholder="Room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Room Types</SelectItem>
                      {roomTypes.map((roomType) => (
                        <SelectItem key={roomType.id} value={String(roomType.id)}>
                          {roomType.name}
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
                  onClick={() => roomsQuery.refetch()}
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
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
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
                            Loading rooms...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : rooms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                          No rooms found for this filter.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rooms.map((room) => {
                        const selectedStatus = statusDraft(draftStatusByRoomId, room);
                        const isUpdatingThisRow =
                          updateRoomStatusState.isLoading &&
                          updateRoomStatusState.originalArgs?.id === room.id;

                        return (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">
                              Room {room.roomNumber}
                            </TableCell>
                            <TableCell>{room.roomType?.name ?? "Room"}</TableCell>
                            <TableCell>{room.floorNumber}</TableCell>
                            <TableCell>
                              {moneyFormatter.format(Number(room.currentPrice ?? 0))}
                            </TableCell>
                            <TableCell>
                              {typeof room.rating === "number" ? room.rating.toFixed(1) : "0.0"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={statusClassName(room.status)}
                              >
                                {toTitleCase(room.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Select
                                  value={selectedStatus}
                                  onValueChange={(value) =>
                                    handleStatusChange(room.id, value as RoomStatus)
                                  }
                                >
                                  <SelectTrigger className="w-44">
                                    <SelectValue placeholder="Update status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ROOM_STATUS_OPTIONS.map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {toTitleCase(status)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => void handleUpdateStatus(room)}
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
                  Showing {startItem}-{endItem} of {totalElements} rooms
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

              {roomsQuery.isError ? (
                <div className="rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive">
                  Failed to load admin rooms from backend.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
