"use client";

import { useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getAdminDashboardConfig } from "@/components/dashboard/role-config";
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
import { useGetRoomTypesQuery } from "@/lib/feature/hotelSlice";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function AdminRoomTypesPage() {
  const profileQuery = useGetCurrentUserQuery();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const config = getAdminDashboardConfig(profileQuery.data?.data);
  const roomTypesQuery = useGetRoomTypesQuery({ page, size: pageSize });

  const pageData = roomTypesQuery.data?.data;
  const roomTypes = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;
  const totalPages = Math.max(pageData?.totalPages ?? 1, 1);
  const isLoading = roomTypesQuery.isLoading || roomTypesQuery.isFetching;

  const averageBasePrice =
    roomTypes.length === 0
      ? 0
      : roomTypes.reduce((sum, roomType) => sum + Number(roomType.basePrice ?? 0), 0) /
        roomTypes.length;

  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  return (
    <DashboardFrame
      config={config}
      headerTitle="Room Type Catalog"
      headerDescription="Review room categories, capacities, and base prices"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Room Types</CardTitle>
              <CardDescription>
                Admin reference table for room type configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Visible Types</p>
                  <p className="text-2xl font-semibold">{roomTypes.length}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Total Types</p>
                  <p className="text-2xl font-semibold">{totalElements}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Avg Base Price</p>
                  <p className="text-2xl font-semibold">
                    {moneyFormatter.format(averageBasePrice)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => roomTypesQuery.refetch()}
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

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Amenities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading room types...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : roomTypes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                          No room types found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      roomTypes.map((roomType) => (
                        <TableRow key={roomType.id}>
                          <TableCell className="font-medium">{roomType.id}</TableCell>
                          <TableCell>{roomType.name}</TableCell>
                          <TableCell>{roomType.capacity}</TableCell>
                          <TableCell>
                            {moneyFormatter.format(Number(roomType.basePrice ?? 0))}
                          </TableCell>
                          <TableCell className="max-w-xl truncate">
                            {roomType.amenities || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing {startItem}-{endItem} of {totalElements} room types
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

              {roomTypesQuery.isError ? (
                <div className="rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive">
                  Failed to load room types from backend.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
