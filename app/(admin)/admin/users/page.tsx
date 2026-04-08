"use client";

import { useState } from "react";
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
import { useGetUsersQuery } from "@/lib/feature/hotelSlice";

function formatRole(role?: string): string {
  if (!role) return "UNKNOWN";
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

function roleClassName(role?: string): string {
  switch (role) {
    case "ADMIN":
      return "border-violet-300 text-violet-700 bg-violet-50";
    case "STAFF":
      return "border-blue-300 text-blue-700 bg-blue-50";
    case "CUSTOMER":
      return "border-emerald-300 text-emerald-700 bg-emerald-50";
    default:
      return "";
  }
}

function formatDate(value?: string): string {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminUsersPage() {
  const profileQuery = useGetCurrentUserQuery();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const config = getAdminDashboardConfig(profileQuery.data?.data);
  const usersQuery = useGetUsersQuery({ page, size: pageSize });

  const pageData = usersQuery.data?.data;
  const users = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;
  const totalPages = Math.max(pageData?.totalPages ?? 1, 1);
  const isLoading = usersQuery.isLoading || usersQuery.isFetching;

  const adminCount = users.filter((user) => user.role?.name === "ADMIN").length;
  const staffCount = users.filter((user) => user.role?.name === "STAFF").length;
  const customerCount = users.filter((user) => user.role?.name === "CUSTOMER").length;

  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  return (
    <DashboardFrame
      config={config}
      headerTitle="User Management"
      headerDescription="Review user roles and account status"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Users Directory</CardTitle>
              <CardDescription>
                Admin overview of all users across roles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Admins</p>
                  <p className="text-2xl font-semibold">{adminCount}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Staff</p>
                  <p className="text-2xl font-semibold">{staffCount}</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Customers</p>
                  <p className="text-2xl font-semibold">{customerCount}</p>
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
                  onClick={() => usersQuery.refetch()}
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
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading users...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.fullName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={roleClassName(user.role?.name)}
                            >
                              {formatRole(user.role?.name)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.phoneNumber || "-"}</TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell>{user.isDeleted ? "Archived" : "Active"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing {startItem}-{endItem} of {totalElements} users
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

              {usersQuery.isError ? (
                <div className="rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive">
                  Failed to load users from backend.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
