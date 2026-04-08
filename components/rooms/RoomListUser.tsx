"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Search, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoomTypesQuery, useGetRoomsQuery } from "@/lib/feature/hotelSlice";
import type { RoomResponse, RoomStatus } from "@/types/hotel";

type SortOption = "price_asc" | "price_desc" | "rating_desc" | "room_asc";

type RoomFilters = {
  keyword: string;
  roomTypeId: string;
  maxPrice: string;
  checkInDate: string;
  checkOutDate: string;
  sort: SortOption;
};

const AVAILABLE_STATUS: RoomStatus = "AVAILABLE";

const initialFilters: RoomFilters = {
  keyword: "",
  roomTypeId: "ALL",
  maxPrice: "",
  checkInDate: "",
  checkOutDate: "",
  sort: "room_asc",
};

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

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, value]);

  return debouncedValue;
}

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getSortQuery(sort: SortOption): { sortBy: string; sortDirection: "asc" | "desc" } {
  switch (sort) {
    case "price_asc":
      return { sortBy: "currentPrice", sortDirection: "asc" };
    case "price_desc":
      return { sortBy: "currentPrice", sortDirection: "desc" };
    case "rating_desc":
      return { sortBy: "rating", sortDirection: "desc" };
    case "room_asc":
    default:
      return { sortBy: "roomNumber", sortDirection: "asc" };
  }
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

function getDateRangeError(checkInDate: string, checkOutDate: string): string | null {
  if (!checkInDate && !checkOutDate) return null;
  if (!checkInDate || !checkOutDate) {
    return "Please provide both check-in and check-out dates.";
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkOut <= checkIn) {
    return "Check-out date must be after check-in date.";
  }

  return null;
}

export default function RoomListUser() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [filters, setFilters] = useState<RoomFilters>(initialFilters);

  const debouncedKeyword = useDebouncedValue(filters.keyword, 350);
  const sortQuery = getSortQuery(filters.sort);
  const dateRangeError = getDateRangeError(filters.checkInDate, filters.checkOutDate);
  const hasValidDateRange = !dateRangeError && filters.checkInDate && filters.checkOutDate;

  const queryArgs = useMemo(
    () => ({
      page,
      size: pageSize,
      keyword: debouncedKeyword.trim() || undefined,
      roomTypeId: filters.roomTypeId === "ALL" ? undefined : Number(filters.roomTypeId),
      status: AVAILABLE_STATUS,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      checkInDate: hasValidDateRange ? filters.checkInDate : undefined,
      checkOutDate: hasValidDateRange ? filters.checkOutDate : undefined,
      sortBy: sortQuery.sortBy,
      sortDirection: sortQuery.sortDirection,
    }),
    [
      debouncedKeyword,
      filters.checkInDate,
      filters.checkOutDate,
      filters.maxPrice,
      filters.roomTypeId,
      hasValidDateRange,
      page,
      pageSize,
      sortQuery.sortBy,
      sortQuery.sortDirection,
    ],
  );

  const roomsQuery = useGetRoomsQuery(queryArgs);
  const roomTypesQuery = useGetRoomTypesQuery({ page: 0, size: 100 });

  const rooms = roomsQuery.data?.data?.content ?? [];
  const totalElements = roomsQuery.data?.data?.totalElements ?? 0;
  const totalPages = Math.max(roomsQuery.data?.data?.totalPages ?? 1, 1);
  const roomTypes = roomTypesQuery.data?.data?.content ?? [];

  const isLoading = roomsQuery.isLoading || roomsQuery.isFetching;
  const startItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const endItem = totalElements === 0 ? 0 : Math.min((page + 1) * pageSize, totalElements);

  const updateFilters = (patch: Partial<RoomFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(0);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <div className="pt-24 pb-20">
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-[#d0d8ff] text-[#00164e] dark:bg-blue-900/50 dark:text-blue-200 rounded-full">
            Explore Accommodations
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#00236f] dark:text-blue-300 tracking-tight mb-6">
            Our Sanctuaries
          </h1>
          <p className="max-w-2xl text-[#444651] dark:text-slate-300 text-lg leading-relaxed">
            Live backend data with instant filtering. Only currently available rooms are shown.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <SlidersHorizontal className="h-4 w-4" />
              Smart Filters
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  value={filters.keyword}
                  onChange={(event) => updateFilters({ keyword: event.target.value })}
                  className="pl-9"
                  placeholder="Search room number, type, amenities..."
                />
              </div>

              <Select
                value={filters.roomTypeId}
                onValueChange={(value) => updateFilters({ roomTypeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All room types</SelectItem>
                  {roomTypes.map((roomType) => (
                    <SelectItem key={roomType.id} value={String(roomType.id)}>
                      {roomType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                min="0"
                value={filters.maxPrice}
                onChange={(event) => updateFilters({ maxPrice: event.target.value })}
                placeholder="Max price"
              />

              <Select
                value={filters.sort}
                onValueChange={(value) => updateFilters({ sort: value as SortOption })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room_asc">Room number (A-Z)</SelectItem>
                  <SelectItem value="price_asc">Price (low-high)</SelectItem>
                  <SelectItem value="price_desc">Price (high-low)</SelectItem>
                  <SelectItem value="rating_desc">Top rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
              <Input
                type="date"
                value={filters.checkInDate}
                onChange={(event) => updateFilters({ checkInDate: event.target.value })}
              />
              <Input
                type="date"
                value={filters.checkOutDate}
                onChange={(event) => updateFilters({ checkOutDate: event.target.value })}
              />
              <Button type="button" variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Filters update automatically while you type.
            </p>
            {dateRangeError ? (
              <p className="text-sm text-rose-600 dark:text-rose-400">{dateRangeError}</p>
            ) : null}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {startItem}-{endItem} of {totalElements} available rooms
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Rows:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(0);
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[6, 9, 12, 20].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="min-h-[300px] flex items-center justify-center text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading rooms...
            </div>
          ) : roomsQuery.isError ? (
            <div className="min-h-[300px] rounded-xl border border-rose-300 bg-rose-50 text-rose-700 flex items-center justify-center text-sm">
              Failed to load rooms from backend.
            </div>
          ) : rooms.length === 0 ? (
            <div className="min-h-[300px] rounded-xl border border-slate-300 bg-white dark:bg-slate-900 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              No available rooms found for the current filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, index) => {
                const imageUrl = getSafeImageUrl(room, index);
                const amenities = (room.roomType?.amenities ?? "")
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .slice(0, 3);

                return (
                  <article
                    key={room.id}
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500"
                  >
                    <Link href={`/rooms/${room.id}`} className="block relative h-72 overflow-hidden">
                      <Image
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={`Room ${room.roomNumber}`}
                        width={1000}
                        height={700}
                        src={imageUrl}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                          {room.roomType?.name ?? "Room"}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-emerald-600/90 text-white text-[10px] uppercase tracking-widest rounded-full">
                          {toTitleCase(room.status)}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">
                          <Link href={`/rooms/${room.id}`}>Room {room.roomNumber}</Link>
                        </h3>
                        <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-bold ml-1">
                            {typeof room.rating === "number" ? room.rating.toFixed(1) : "0.0"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#444651] dark:text-slate-400 mb-4 line-clamp-2">
                        {room.roomType?.description ||
                          `Floor ${room.floorNumber} room with curated comfort and amenities.`}
                      </p>
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {amenities.length > 0 ? (
                          amenities.map((amenity) => (
                            <span
                              key={`${room.id}-${amenity}`}
                              className="inline-flex items-center rounded-md bg-[#eef2ff] dark:bg-slate-800 px-2 py-1 text-xs text-[#1f2b5c] dark:text-slate-300"
                            >
                              {amenity}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-[#eef2ff] dark:bg-slate-800 px-2 py-1 text-xs text-[#1f2b5c] dark:text-slate-300">
                            Amenities available
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                        <div>
                          <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">
                            {moneyFormatter.format(Number(room.currentPrice ?? 0))}
                          </span>
                          <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">
                            / night
                          </span>
                        </div>
                        <Button asChild className="px-4 py-2 text-sm">
                          <Link href={`/rooms/${room.id}`}>
                            View Details
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0 || isLoading}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
