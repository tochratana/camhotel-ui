"use client";

import { FormEvent, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import {
  useCreateStaffMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/lib/feature/hotelSlice";
import type { UserResponse } from "@/types/auth";

const ROLE_OPTIONS = ["ADMIN", "STAFF", "CUSTOMER"] as const;

type RoleName = (typeof ROLE_OPTIONS)[number];

type StaffFormState = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const EMPTY_STAFF_FORM: StaffFormState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

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

function parseApiError(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") return fallback;

  const maybeError = error as {
    data?: {
      message?: string;
      error?: string;
    };
    error?: string;
  };

  if (typeof maybeError.data?.message === "string") return maybeError.data.message;
  if (typeof maybeError.data?.error === "string") return maybeError.data.error;
  if (typeof maybeError.error === "string") return maybeError.error;
  return fallback;
}

export default function AdminUsersPage() {
  const isMobile = useIsMobile();
  const profileQuery = useGetCurrentUserQuery();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [staffForm, setStaffForm] = useState<StaffFormState>(EMPTY_STAFF_FORM);
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(false);
  const [roleDraftByUserId, setRoleDraftByUserId] = useState<Record<number, RoleName>>(
    {},
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const config = getAdminDashboardConfig(profileQuery.data?.data);
  const currentAdminId = profileQuery.data?.data?.id;
  const usersQuery = useGetUsersQuery({ page, size: pageSize });
  const [createStaff, createStaffState] = useCreateStaffMutation();
  const [updateUserRole, updateUserRoleState] = useUpdateUserRoleMutation();
  const [deleteUser, deleteUserState] = useDeleteUserMutation();

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

  const getRoleDraft = (user: UserResponse): RoleName => {
    const role = roleDraftByUserId[user.id];
    if (role) return role;
    const currentRole = user.role?.name;
    if (currentRole === "ADMIN" || currentRole === "STAFF" || currentRole === "CUSTOMER") {
      return currentRole;
    }
    return "CUSTOMER";
  };

  const handleCreateStaff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const payload = {
      fullName: staffForm.fullName.trim(),
      email: staffForm.email.trim(),
      password: staffForm.password,
      phoneNumber: staffForm.phoneNumber.trim() || undefined,
    };

    if (!payload.fullName || !payload.email || !payload.password) {
      setFeedback("Full name, email, and password are required.");
      return;
    }

    try {
      await createStaff(payload).unwrap();
      setStaffForm(EMPTY_STAFF_FORM);
      setIsStaffFormOpen(false);
      setPage(0);
      setFeedback(`Staff account created for ${payload.fullName}.`);
    } catch (error) {
      setFeedback(parseApiError(error, "Unable to create staff account."));
    }
  };

  const handleStartCreateStaff = () => {
    setStaffForm(EMPTY_STAFF_FORM);
    setFeedback(null);
    setIsStaffFormOpen(true);
  };

  const handleStaffFormOpenChange = (open: boolean) => {
    setIsStaffFormOpen(open);
    if (!open) {
      setStaffForm(EMPTY_STAFF_FORM);
    }
  };

  const handleCancelStaffCreate = () => {
    setStaffForm(EMPTY_STAFF_FORM);
    setIsStaffFormOpen(false);
    setFeedback("Form closed.");
  };

  const handleRoleDraftChange = (userId: number, role: RoleName) => {
    setRoleDraftByUserId((prev) => ({ ...prev, [userId]: role }));
    setFeedback(null);
  };

  const handleUpdateRole = async (user: UserResponse) => {
    const nextRole = getRoleDraft(user);
    if (nextRole === user.role?.name) {
      setFeedback(`${user.fullName} is already ${formatRole(nextRole)}.`);
      return;
    }

    setFeedback(null);
    try {
      await updateUserRole({ id: user.id, role: nextRole }).unwrap();
      setFeedback(`${user.fullName} role updated to ${formatRole(nextRole)}.`);
    } catch (error) {
      setFeedback(parseApiError(error, "Unable to update user role."));
    }
  };

  const handleDeleteUser = async (user: UserResponse) => {
    const confirmed = window.confirm(
      `Delete user ${user.fullName}? This will soft-delete the account.`,
    );
    if (!confirmed) return;

    setFeedback(null);
    try {
      await deleteUser(user.id).unwrap();
      setFeedback(`${user.fullName} deleted successfully.`);
    } catch (error) {
      setFeedback(parseApiError(error, "Unable to delete user."));
    }
  };

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

                <div className="flex items-center gap-2">
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
                  <Button type="button" onClick={handleStartCreateStaff}>
                    Create Staff
                  </Button>
                </div>
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
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role Control</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-28 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading users...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-28 text-center text-muted-foreground">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => {
                        const draftRole = getRoleDraft(user);
                        const isUpdatingRole =
                          updateUserRoleState.isLoading &&
                          updateUserRoleState.originalArgs?.id === user.id;
                        const isDeleting =
                          deleteUserState.isLoading && deleteUserState.originalArgs === user.id;
                        const isCurrentAdmin = currentAdminId === user.id;

                        return (
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
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Select
                                  value={draftRole}
                                  onValueChange={(value) =>
                                    handleRoleDraftChange(user.id, value as RoleName)
                                  }
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ROLE_OPTIONS.map((role) => (
                                      <SelectItem key={role} value={role}>
                                        {formatRole(role)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => void handleUpdateRole(user)}
                                  disabled={isUpdatingRole || isCurrentAdmin}
                                >
                                  {isUpdatingRole ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Save"
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => void handleDeleteUser(user)}
                                disabled={isDeleting || isCurrentAdmin}
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  "Delete"
                                )}
                              </Button>
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
      <Drawer
        open={isStaffFormOpen}
        onOpenChange={handleStaffFormOpenChange}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>Create Staff Account</DrawerTitle>
            <DrawerDescription>
              Create staff users directly from admin panel.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateStaff}>
              <div className="space-y-2">
                <Label htmlFor="drawer-staff-full-name">Full Name</Label>
                <Input
                  id="drawer-staff-full-name"
                  value={staffForm.fullName}
                  onChange={(event) =>
                    setStaffForm((prev) => ({ ...prev, fullName: event.target.value }))
                  }
                  placeholder="Staff name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-staff-email">Email</Label>
                <Input
                  id="drawer-staff-email"
                  type="email"
                  value={staffForm.email}
                  onChange={(event) =>
                    setStaffForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="staff@camhotel.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-staff-password">Password</Label>
                <Input
                  id="drawer-staff-password"
                  type="password"
                  value={staffForm.password}
                  onChange={(event) =>
                    setStaffForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-staff-phone">Phone Number</Label>
                <Input
                  id="drawer-staff-phone"
                  value={staffForm.phoneNumber}
                  onChange={(event) =>
                    setStaffForm((prev) => ({ ...prev, phoneNumber: event.target.value }))
                  }
                  placeholder="+855..."
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <Button type="submit" disabled={createStaffState.isLoading}>
                  {createStaffState.isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create Staff"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelStaffCreate}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </DashboardFrame>
  );
}
