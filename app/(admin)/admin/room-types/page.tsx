"use client";

import { FormEvent, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useCreateRoomTypeMutation,
  useGetRoomTypesQuery,
  useUpdateRoomTypeMutation,
} from "@/lib/feature/hotelSlice";
import type { RoomTypePayload, RoomTypeResponse } from "@/types/hotel";

type RoomTypeFormState = {
  name: string;
  description: string;
  amenities: string;
  basePrice: string;
  capacity: string;
};

const EMPTY_ROOM_TYPE_FORM: RoomTypeFormState = {
  name: "",
  description: "",
  amenities: "",
  basePrice: "",
  capacity: "",
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

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

function toRoomTypeFormState(roomType: RoomTypeResponse): RoomTypeFormState {
  return {
    name: roomType.name,
    description: roomType.description ?? "",
    amenities: roomType.amenities ?? "",
    basePrice: String(roomType.basePrice ?? ""),
    capacity: String(roomType.capacity ?? ""),
  };
}

export default function AdminRoomTypesPage() {
  const profileQuery = useGetCurrentUserQuery();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [roomTypeForm, setRoomTypeForm] =
    useState<RoomTypeFormState>(EMPTY_ROOM_TYPE_FORM);
  const [editingRoomTypeId, setEditingRoomTypeId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const config = getAdminDashboardConfig(profileQuery.data?.data);
  const roomTypesQuery = useGetRoomTypesQuery({ page, size: pageSize });
  const [createRoomType, createRoomTypeState] = useCreateRoomTypeMutation();
  const [updateRoomType, updateRoomTypeState] = useUpdateRoomTypeMutation();

  const pageData = roomTypesQuery.data?.data;
  const roomTypes = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;
  const totalPages = Math.max(pageData?.totalPages ?? 1, 1);
  const isLoading = roomTypesQuery.isLoading || roomTypesQuery.isFetching;
  const isSaving = createRoomTypeState.isLoading || updateRoomTypeState.isLoading;

  const averageBasePrice =
    roomTypes.length === 0
      ? 0
      : roomTypes.reduce((sum, roomType) => sum + Number(roomType.basePrice ?? 0), 0) /
        roomTypes.length;

  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  const handleRoomTypeFormChange = (key: keyof RoomTypeFormState, value: string) => {
    setRoomTypeForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = (roomType: RoomTypeResponse) => {
    setEditingRoomTypeId(roomType.id);
    setRoomTypeForm(toRoomTypeFormState(roomType));
    setFeedback(`Editing room type ${roomType.name}.`);
  };

  const handleCancelEdit = () => {
    setEditingRoomTypeId(null);
    setRoomTypeForm(EMPTY_ROOM_TYPE_FORM);
    setFeedback("Create mode restored.");
  };

  const handleSaveRoomType = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const payload: RoomTypePayload = {
      name: roomTypeForm.name.trim(),
      description: roomTypeForm.description.trim() || undefined,
      amenities: roomTypeForm.amenities.trim() || undefined,
      basePrice: Number(roomTypeForm.basePrice),
      capacity: Number(roomTypeForm.capacity),
    };

    if (!payload.name) {
      setFeedback("Room type name is required.");
      return;
    }

    if (!Number.isFinite(payload.basePrice) || payload.basePrice <= 0) {
      setFeedback("Base price must be greater than 0.");
      return;
    }

    if (!Number.isFinite(payload.capacity) || payload.capacity < 1) {
      setFeedback("Capacity must be at least 1.");
      return;
    }

    try {
      if (editingRoomTypeId) {
        await updateRoomType({ id: editingRoomTypeId, payload }).unwrap();
        setFeedback(`Room type ${payload.name} updated successfully.`);
      } else {
        await createRoomType(payload).unwrap();
        setFeedback(`Room type ${payload.name} created successfully.`);
      }
      setEditingRoomTypeId(null);
      setRoomTypeForm(EMPTY_ROOM_TYPE_FORM);
      setPage(0);
    } catch (error) {
      setFeedback(parseApiError(error, "Unable to save room type."));
    }
  };

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
              <CardTitle>{editingRoomTypeId ? "Edit Room Type" : "Create Room Type"}</CardTitle>
              <CardDescription>
                {editingRoomTypeId
                  ? "Update an existing room category."
                  : "Create a new room category for your hotel."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSaveRoomType}>
                <div className="space-y-2">
                  <Label htmlFor="room-type-name">Name</Label>
                  <Input
                    id="room-type-name"
                    value={roomTypeForm.name}
                    onChange={(event) =>
                      handleRoomTypeFormChange("name", event.target.value)
                    }
                    placeholder="Deluxe Room"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type-capacity">Capacity</Label>
                  <Input
                    id="room-type-capacity"
                    type="number"
                    min={1}
                    value={roomTypeForm.capacity}
                    onChange={(event) =>
                      handleRoomTypeFormChange("capacity", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type-price">Base Price</Label>
                  <Input
                    id="room-type-price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={roomTypeForm.basePrice}
                    onChange={(event) =>
                      handleRoomTypeFormChange("basePrice", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type-description">Description</Label>
                  <Input
                    id="room-type-description"
                    value={roomTypeForm.description}
                    onChange={(event) =>
                      handleRoomTypeFormChange("description", event.target.value)
                    }
                    placeholder="Spacious room with city view"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="room-type-amenities">Amenities</Label>
                  <Input
                    id="room-type-amenities"
                    value={roomTypeForm.amenities}
                    onChange={(event) =>
                      handleRoomTypeFormChange("amenities", event.target.value)
                    }
                    placeholder="WiFi, TV, AC, Mini Bar"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : editingRoomTypeId ? (
                      "Save Changes"
                    ) : (
                      "Create Room Type"
                    )}
                  </Button>
                  {editingRoomTypeId ? (
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>

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
                      <TableHead>Capacity</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Amenities</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading room types...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : roomTypes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
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
                          <TableCell className="text-right">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(roomType)}
                            >
                              Edit
                            </Button>
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
