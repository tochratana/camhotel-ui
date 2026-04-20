"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
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
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetRoomTypesQuery,
  useGetRoomsQuery,
  useUploadRoomImageMutation,
  useUpdateRoomMutation,
  useUpdateRoomStatusMutation,
} from "@/lib/feature/hotelSlice";
import { resolveMediaUrl } from "@/lib/media-url";
import type { RoomPayload, RoomResponse, RoomStatus } from "@/types/hotel";

const ROOM_STATUS_OPTIONS: RoomStatus[] = [
  "AVAILABLE",
  "OCCUPIED",
  "CLEANING",
  "MAINTENANCE",
];

type FilterStatus = RoomStatus | "ALL";
type FilterRoomTypeId = number | "ALL";

type RoomFormState = {
  floorNumber: string;
  roomNumber: string;
  currentPrice: string;
  imageUrl: string;
  rating: string;
  status: RoomStatus;
  roomTypeId: string;
};

const EMPTY_ROOM_FORM: RoomFormState = {
  floorNumber: "",
  roomNumber: "",
  currentPrice: "",
  imageUrl: "",
  rating: "0",
  status: "AVAILABLE",
  roomTypeId: "",
};

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

function statusDraft(
  drafts: Record<number, RoomStatus>,
  room: RoomResponse,
): RoomStatus {
  return drafts[room.id] ?? room.status;
}

function toRoomFormState(room: RoomResponse): RoomFormState {
  return {
    floorNumber: String(room.floorNumber),
    roomNumber: room.roomNumber,
    currentPrice: String(room.currentPrice),
    imageUrl: room.imageUrl ?? "",
    rating: String(room.rating ?? 0),
    status: room.status,
    roomTypeId: String(room.roomType?.id ?? ""),
  };
}

export default function AdminRoomsPage() {
  const isMobile = useIsMobile();
  const profileQuery = useGetCurrentUserQuery();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [roomTypeFilter, setRoomTypeFilter] = useState<FilterRoomTypeId>("ALL");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [draftStatusByRoomId, setDraftStatusByRoomId] = useState<
    Record<number, RoomStatus>
  >({});
  const [roomForm, setRoomForm] = useState<RoomFormState>(EMPTY_ROOM_FORM);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
  const [isRoomFormOpen, setIsRoomFormOpen] = useState(false);
  const [selectedRoomImageFile, setSelectedRoomImageFile] = useState<File | null>(null);
  const [roomImagePreviewUrl, setRoomImagePreviewUrl] = useState("");
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
  const [createRoom, createRoomState] = useCreateRoomMutation();
  const [updateRoom, updateRoomState] = useUpdateRoomMutation();
  const [deleteRoom, deleteRoomState] = useDeleteRoomMutation();
  const [uploadRoomImage, uploadRoomImageState] = useUploadRoomImageMutation();

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
  const isSavingRoom =
    createRoomState.isLoading ||
    updateRoomState.isLoading ||
    uploadRoomImageState.isLoading;
  const roomImagePreview = roomImagePreviewUrl || resolveMediaUrl(roomForm.imageUrl);

  useEffect(() => {
    return () => {
      if (roomImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(roomImagePreviewUrl);
      }
    };
  }, [roomImagePreviewUrl]);

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
      const successMsg = `Room ${room.roomNumber} updated to ${toTitleCase(nextStatus)}.`;
      setFeedback(successMsg);
      toast.success(successMsg);
    } catch (error) {
      const errorMsg = parseApiError(error, "Unable to update room status.");
      setFeedback(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleRoomFormChange = (key: keyof RoomFormState, value: string) => {
    setRoomForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditRoom = (room: RoomResponse) => {
    setEditingRoomId(room.id);
    setRoomForm(toRoomFormState(room));
    setSelectedRoomImageFile(null);
    if (roomImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(roomImagePreviewUrl);
    }
    setRoomImagePreviewUrl("");
    setIsRoomFormOpen(true);
    setFeedback(`Editing room ${room.roomNumber}.`);
  };

  const handleStartCreateRoom = () => {
    setEditingRoomId(null);
    setRoomForm(EMPTY_ROOM_FORM);
    setSelectedRoomImageFile(null);
    if (roomImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(roomImagePreviewUrl);
    }
    setRoomImagePreviewUrl("");
    setFeedback(null);
    setIsRoomFormOpen(true);
  };

  const handleRoomFormOpenChange = (open: boolean) => {
    setIsRoomFormOpen(open);
    if (!open) {
      setEditingRoomId(null);
      setRoomForm(EMPTY_ROOM_FORM);
      setSelectedRoomImageFile(null);
      if (roomImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(roomImagePreviewUrl);
      }
      setRoomImagePreviewUrl("");
    }
  };

  const handleCancelRoomEdit = () => {
    setEditingRoomId(null);
    setRoomForm(EMPTY_ROOM_FORM);
    setSelectedRoomImageFile(null);
    if (roomImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(roomImagePreviewUrl);
    }
    setRoomImagePreviewUrl("");
    setIsRoomFormOpen(false);
    setFeedback("Form closed.");
  };

  const handleRoomImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedRoomImageFile(file);

    if (roomImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(roomImagePreviewUrl);
    }

    if (!file) {
      setRoomImagePreviewUrl("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSelectedRoomImageFile(null);
      setRoomImagePreviewUrl("");
      setFeedback("Please select a valid image file.");
      return;
    }

    setRoomImagePreviewUrl(URL.createObjectURL(file));
    setFeedback(null);
  };

  const handleSaveRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!roomForm.roomTypeId) {
      setFeedback("Room type is required.");
      return;
    }

    const roomNumber = roomForm.roomNumber.trim();
    let imageUrl = roomForm.imageUrl.trim();

    if (selectedRoomImageFile) {
      try {
        const result = await uploadRoomImage({ file: selectedRoomImageFile }).unwrap();
        const uploadedPath = result?.data?.filePath?.trim();

        if (!uploadedPath) {
          setFeedback("Image uploaded but no file path was returned.");
          return;
        }

        imageUrl = uploadedPath;
        handleRoomFormChange("imageUrl", uploadedPath);
        setSelectedRoomImageFile(null);
        if (roomImagePreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(roomImagePreviewUrl);
        }
        setRoomImagePreviewUrl("");
      } catch (error) {
        const errorMsg = parseApiError(error, "Unable to upload room image.");
        setFeedback(errorMsg);
        toast.error(errorMsg);
        return;
      }
    }

    const payload: RoomPayload = {
      floorNumber: Number(roomForm.floorNumber),
      roomNumber,
      currentPrice: Number(roomForm.currentPrice),
      imageUrl,
      rating: Number(roomForm.rating),
      status: roomForm.status,
      roomTypeId: Number(roomForm.roomTypeId),
    };

    if (!payload.roomNumber || !payload.imageUrl) {
      setFeedback("Room number and uploaded image are required.");
      return;
    }

    if (!Number.isFinite(payload.currentPrice) || payload.currentPrice <= 0) {
      setFeedback("Current price must be greater than 0.");
      return;
    }

    if (!Number.isFinite(payload.floorNumber) || payload.floorNumber < 0) {
      setFeedback("Floor number must be 0 or greater.");
      return;
    }

    if (!Number.isFinite(payload.rating) || payload.rating < 0 || payload.rating > 5) {
      setFeedback("Rating must be between 0 and 5.");
      return;
    }

    try {
      if (editingRoomId) {
        await updateRoom({ id: editingRoomId, payload }).unwrap();
        const msg = `Room ${payload.roomNumber} updated successfully.`;
        setFeedback(msg);
        toast.success(msg);
      } else {
        await createRoom(payload).unwrap();
        const msg = `Room ${payload.roomNumber} created successfully.`;
        setFeedback(msg);
        toast.success(msg);
      }
      setEditingRoomId(null);
      setRoomForm(EMPTY_ROOM_FORM);
      setSelectedRoomImageFile(null);
      if (roomImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(roomImagePreviewUrl);
      }
      setRoomImagePreviewUrl("");
      setIsRoomFormOpen(false);
      setPage(0);
    } catch (error) {
      const errorMsg = parseApiError(error, "Unable to save room.");
      setFeedback(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleDeleteRoom = async (room: RoomResponse) => {
    const confirmed = window.confirm(
      `Delete room ${room.roomNumber}? This will soft-delete the room.`,
    );
    if (!confirmed) return;

    setFeedback(null);
    try {
      await deleteRoom(room.id).unwrap();
      const msg = `Room ${room.roomNumber} deleted successfully.`;
      setFeedback(msg);
      toast.success(msg);
    } catch (error) {
      const errorMsg = parseApiError(error, "Unable to delete room.");
      setFeedback(errorMsg);
      toast.error(errorMsg);
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

                <div className="flex items-center gap-2">
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
                  <Button type="button" onClick={handleStartCreateRoom}>
                    Create Room
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
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Status Control</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-28 text-center text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading rooms...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : rooms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-28 text-center text-muted-foreground">
                          No rooms found for this filter.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rooms.map((room) => {
                        const selectedStatus = statusDraft(draftStatusByRoomId, room);
                        const isUpdatingStatus =
                          updateRoomStatusState.isLoading &&
                          updateRoomStatusState.originalArgs?.id === room.id;
                        const isDeletingRoom =
                          deleteRoomState.isLoading && deleteRoomState.originalArgs === room.id;

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
                            <TableCell>
                              <div className="flex items-center gap-2">
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
                                  variant="outline"
                                  onClick={() => void handleUpdateStatus(room)}
                                  disabled={isUpdatingStatus}
                                >
                                  {isUpdatingStatus ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Save"
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditRoom(room)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => void handleDeleteRoom(room)}
                                  disabled={isDeletingRoom}
                                >
                                  {isDeletingRoom ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Delete"
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
      <Drawer
        open={isRoomFormOpen}
        onOpenChange={handleRoomFormOpenChange}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>{editingRoomId ? "Edit Room" : "Create Room"}</DrawerTitle>
            <DrawerDescription>
              {editingRoomId
                ? "Update an existing room configuration."
                : "Create a new room in the hotel inventory."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSaveRoom}>
              <div className="space-y-2">
                <Label htmlFor="drawer-room-number">Room Number</Label>
                <Input
                  id="drawer-room-number"
                  value={roomForm.roomNumber}
                  onChange={(event) =>
                    handleRoomFormChange("roomNumber", event.target.value)
                  }
                  placeholder="A-101"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-floor-number">Floor Number</Label>
                <Input
                  id="drawer-floor-number"
                  type="number"
                  min={0}
                  value={roomForm.floorNumber}
                  onChange={(event) =>
                    handleRoomFormChange("floorNumber", event.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-room-price">Current Price</Label>
                <Input
                  id="drawer-room-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={roomForm.currentPrice}
                  onChange={(event) =>
                    handleRoomFormChange("currentPrice", event.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-room-rating">Rating (0-5)</Label>
                <Input
                  id="drawer-room-rating"
                  type="number"
                  min={0}
                  max={5}
                  value={roomForm.rating}
                  onChange={(event) => handleRoomFormChange("rating", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="drawer-room-image-file">Room Image</Label>
                <Input
                  id="drawer-room-image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleRoomImageFileChange}
                />
                <p className="text-xs text-muted-foreground">
                  The image uploads automatically when you click{" "}
                  {editingRoomId ? "Save Changes" : "Create Room"}.
                </p>
                {roomImagePreview ? (
                  <div className="overflow-hidden rounded-md border">
                    <img
                      src={roomImagePreview}
                      alt="Room preview"
                      className="h-44 w-full object-cover"
                    />
                  </div>
                ) : null}
                <Input
                  value={roomForm.imageUrl}
                  placeholder="Upload an image to generate file path"
                  readOnly
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select
                  value={roomForm.roomTypeId || "NONE"}
                  onValueChange={(value) =>
                    handleRoomFormChange("roomTypeId", value === "NONE" ? "" : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">Select type</SelectItem>
                    {roomTypes.map((roomType) => (
                      <SelectItem key={roomType.id} value={String(roomType.id)}>
                        {roomType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={roomForm.status}
                  onValueChange={(value) =>
                    handleRoomFormChange("status", value as RoomStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOM_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {toTitleCase(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <Button type="submit" disabled={isSavingRoom}>
                  {isSavingRoom ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingRoomId ? (
                    "Save Changes"
                  ) : (
                    "Create Room"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelRoomEdit}>
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
