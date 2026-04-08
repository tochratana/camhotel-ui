"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Loader2,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetRoomByIdQuery, useGetRoomsQuery } from "@/lib/feature/hotelSlice";
import type { RoomResponse } from "@/types/hotel";

const fallbackRoomImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
];

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getSafeImageUrl(room: RoomResponse, index: number): string {
  const imageUrl = room.imageUrl ?? "";
  const isKnownAllowedHost =
    imageUrl.startsWith("https://images.unsplash.com") ||
    imageUrl.startsWith("https://lh3.googleusercontent.com") ||
    imageUrl.startsWith("https://arystorephone.com");

  if (isKnownAllowedHost) return imageUrl;
  return fallbackRoomImages[index % fallbackRoomImages.length];
}

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const roomId = Number(params.id);
  const isValidRoomId = Number.isFinite(roomId);

  const roomQuery = useGetRoomByIdQuery(roomId, { skip: !isValidRoomId });
  const room = roomQuery.data?.data;

  const relatedQueryArgs = useMemo(
    () => ({
      page: 0,
      size: 4,
      status: "AVAILABLE" as const,
      roomTypeId: room?.roomType?.id,
      sortBy: "rating",
      sortDirection: "desc" as const,
    }),
    [room?.roomType?.id],
  );

  const relatedRoomsQuery = useGetRoomsQuery(relatedQueryArgs, {
    skip: !room?.roomType?.id,
  });

  const relatedRooms = useMemo(() => {
    const content = relatedRoomsQuery.data?.data?.content ?? [];
    return content.filter((item) => item.id !== room?.id).slice(0, 3);
  }, [relatedRoomsQuery.data?.data?.content, room?.id]);

  if (!isValidRoomId) {
    return (
      <main className="min-h-screen bg-[#faf8ff] dark:bg-slate-950 px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Invalid Room</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The room id is invalid. Please return to room listing.
          </p>
          <Button asChild>
            <Link href="/rooms">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back To Rooms
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  if (roomQuery.isLoading || roomQuery.isFetching) {
    return (
      <main className="min-h-screen bg-[#faf8ff] dark:bg-slate-950 px-6 py-24">
        <div className="max-w-4xl mx-auto flex items-center justify-center text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Loading room details...
        </div>
      </main>
    );
  }

  if (roomQuery.isError || !room) {
    return (
      <main className="min-h-screen bg-[#faf8ff] dark:bg-slate-950 px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Room Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            We could not load this room. It may have been removed.
          </p>
          <Button asChild>
            <Link href="/rooms">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back To Rooms
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const amenities = (room.roomType?.amenities ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const imageUrl = getSafeImageUrl(room, 0);

  return (
    <main className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Button asChild variant="outline" className="mb-2">
          <Link href="/rooms">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back To Rooms
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="overflow-hidden border-border/70">
            <div className="relative h-[400px] md:h-[520px]">
              <Image
                src={imageUrl}
                alt={`Room ${room.roomNumber}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          <Card className="border-border/70">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-2xl">Room {room.roomNumber}</CardTitle>
                <Badge variant="outline">{toTitleCase(room.status)}</Badge>
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                {room.roomType?.name} on floor {room.floorNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-3xl font-extrabold text-[#00236f] dark:text-blue-300">
                  {moneyFormatter.format(Number(room.currentPrice ?? 0))}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">/ night</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border p-3">
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-semibold inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    {typeof room.rating === "number" ? room.rating.toFixed(1) : "0.0"}
                  </p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-semibold inline-flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {room.roomType?.capacity ?? 1} guests
                  </p>
                </div>
                <div className="rounded-md border p-3 col-span-2">
                  <p className="text-muted-foreground">Room Type</p>
                  <p className="font-semibold inline-flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {room.roomType?.name}
                  </p>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/login">Login To Book This Room</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Room Overview</CardTitle>
              <CardDescription>
                Full details to help guests decide faster.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-7">
                {room.roomType?.description ||
                  "Comfort-focused room prepared for a smooth and relaxing stay."}
              </p>
              <div className="rounded-md border p-3 text-sm text-muted-foreground">
                Base price for this room type: {moneyFormatter.format(Number(room.roomType?.basePrice ?? 0))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>What guests can expect in this room.</CardDescription>
            </CardHeader>
            <CardContent>
              {amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Amenities information is not available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Similar Available Rooms</CardTitle>
            <CardDescription>
              More options from the same room type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {relatedRoomsQuery.isLoading || relatedRoomsQuery.isFetching ? (
              <div className="text-sm text-muted-foreground inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading similar rooms...
              </div>
            ) : relatedRooms.length === 0 ? (
              <p className="text-sm text-muted-foreground">No additional rooms available right now.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedRooms.map((relatedRoom, index) => (
                  <article key={relatedRoom.id} className="rounded-lg border overflow-hidden bg-card">
                    <div className="relative h-40">
                      <Image
                        src={getSafeImageUrl(relatedRoom, index + 1)}
                        alt={`Room ${relatedRoom.roomNumber}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">Room {relatedRoom.roomNumber}</h3>
                      <p className="text-sm text-muted-foreground">
                        {moneyFormatter.format(Number(relatedRoom.currentPrice ?? 0))} / night
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/rooms/${relatedRoom.id}`}>
                          View Details
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
