"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BedDouble,
  CalendarCheck,
  ConciergeBell,
  DoorOpen,
  Mail,
  MapPin,
  Phone,
  Star,
  Utensils,
  Users,
  type LucideIcon,
} from "lucide-react";
import { roomCard } from "@/data/roomCard";
import {
  useGetHomepageStatsQuery,
  useGetRatingsQuery,
  useGetRoomsQuery,
} from "@/lib/feature/hotelSlice";
import { resolveMediaUrl } from "@/lib/media-url";
import RoomCard from "@/components/homepage/RoomCard";
import type { HomepageStatsResponse } from "@/types/hotel";

function toSafeImage(imageUrl: string | null | undefined, fallback: string) {
  const resolvedImage = resolveMediaUrl(imageUrl);
  return resolvedImage || fallback;
}

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

const statsCards: Array<{
  key: keyof HomepageStatsResponse;
  label: string;
  hint: string;
  icon: LucideIcon;
  decimal?: boolean;
}> = [
  {
    key: "totalUsers",
    label: "Users",
    hint: "Registered active users",
    icon: Users,
  },
  {
    key: "totalRooms",
    label: "Rooms",
    hint: "Total active inventory",
    icon: BedDouble,
  },
  {
    key: "availableRooms",
    label: "Available",
    hint: "Ready to book now",
    icon: DoorOpen,
  },
  {
    key: "occupiedRooms",
    label: "Occupied",
    hint: "Currently in use",
    icon: CalendarCheck,
  },
  {
    key: "averageRating",
    label: "Average Rating",
    hint: "Guest score",
    icon: Star,
    decimal: true,
  },
];

export default function Homepage() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Slideshow images for hero - 6 different hotel images
  const heroImages = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=2000&q=80", // Modern hotel lobby
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80", // Luxury bedroom
    "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=2000&q=80", // Hotel exterior
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=2000&q=80", // Premium suite
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=2000&q=80", // Hotel corridor
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80", // Rooftop/view
  ];

  // Auto-scroll slideshow every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Navigation handlers
  const goToPrevious = () => {
    setHeroImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goToNext = () => {
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setHeroImageIndex(index);
  };

  const {
    data: homepageStatsData,
    isFetching: isHomepageStatsFetching,
    isError: isHomepageStatsError,
  } = useGetHomepageStatsQuery();

  const homepageStats = homepageStatsData?.data;
  const integerFormat = useMemo(() => new Intl.NumberFormat("en-US"), []);
  const decimalFormat = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [],
  );

  const occupancyRate = useMemo(() => {
    if (!homepageStats || homepageStats.totalRooms <= 0) {
      return 0;
    }
    const occupancy =
      (homepageStats.occupiedRooms / homepageStats.totalRooms) * 100;
    return Math.min(100, Math.max(0, Math.round(occupancy)));
  }, [homepageStats]);

  const activeBookingsValue = useMemo(() => {
    if (!homepageStats) {
      return "--";
    }
    return integerFormat.format(homepageStats.activeBookings);
  }, [homepageStats, integerFormat]);

  const formatStatsValue = (
    key: keyof HomepageStatsResponse,
    useDecimal = false,
  ): string => {
    if (!homepageStats) {
      return "--";
    }
    const value = homepageStats[key];
    if (typeof value !== "number") {
      return "--";
    }
    return useDecimal
      ? decimalFormat.format(value)
      : integerFormat.format(value);
  };

  const defaultDateRange = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = addDays(today, 1);
    return {
      checkInDate: toDateInputValue(today),
      checkOutDate: toDateInputValue(tomorrow),
    };
  }, []);

  const { data, isFetching, isError } = useGetRoomsQuery({
    page: 0,
    size: 4,
    status: "AVAILABLE",
    checkInDate: defaultDateRange.checkInDate,
    checkOutDate: defaultDateRange.checkOutDate,
  });

  const featuredRooms = useMemo(() => {
    const apiRooms = data?.data?.content ?? [];
    if (apiRooms.length === 0) {
      return roomCard;
    }

    return apiRooms.slice(0, 4).map((room, index) => {
      const fallback = roomCard[index % roomCard.length];
      const roomType = room.roomType?.name ?? "Room";
      const nightlyPrice = Number(room.currentPrice ?? 0);

      return {
        title: `${roomType} ${room.roomNumber}`,
        tag: "Bookable",
        image: toSafeImage(room.imageUrl, fallback.image),
        description: `${roomType} on floor ${room.floorNumber}. From $${nightlyPrice.toFixed(0)} per night.`,
        isVip: nightlyPrice >= 350,
        href: `/rooms/${room.id}?checkInDate=${defaultDateRange.checkInDate}&checkOutDate=${defaultDateRange.checkOutDate}`,
      };
    });
  }, [data, defaultDateRange.checkInDate, defaultDateRange.checkOutDate]);

  const { data: ratingData } = useGetRatingsQuery({
    page: 0,
    size: 24,
  });

  const featuredRatings = useMemo(() => {
    const ratings = ratingData?.data?.content ?? [];
    return ratings;
  }, [ratingData]);

  const ratingsTrackRef = useRef<HTMLDivElement | null>(null);
  const [isRatingsHovered, setIsRatingsHovered] = useState(false);

  useEffect(() => {
    const track = ratingsTrackRef.current;
    if (!track) {
      return;
    }
    track.scrollLeft = 0;
  }, [featuredRatings.length]);

  useEffect(() => {
    if (featuredRatings.length <= 1) {
      return;
    }

    let frameId = 0;

    const animate = () => {
      const track = ratingsTrackRef.current;
      if (track && !isRatingsHovered) {
        track.scrollLeft += 0.35;
        const resetPoint = track.scrollWidth / 2;
        if (track.scrollLeft >= resetPoint) {
          track.scrollLeft -= resetPoint;
        }
      }
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [featuredRatings.length, isRatingsHovered]);

  const marqueeRatings = useMemo(() => {
    if (featuredRatings.length <= 1) {
      return featuredRatings;
    }
    return [...featuredRatings, ...featuredRatings];
  }, [featuredRatings]);

  return (
    <main className="bg-background min-h-screen font-sans selection:bg-[#dce1ff] dark:selection:bg-blue-900/50">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {/* Image carousel */}
          {heroImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
                index === heroImageIndex ? "opacity-100" : "opacity-0"
              }`}
              alt={`Hero slide ${index + 1}`}
              width={2000}
              height={1200}
              unoptimized={true}
              priority={index === 0}
            />
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2f76]/85 via-[#1a3a8a]/75 to-[#2d5ab8]/85 dark:from-[#0a1628]/90 dark:via-[#0f2a4a]/85 dark:to-[#1a3a5a]/90"></div>

          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-6 py-20">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            {/* Animated Badge */}
            <div className="flex justify-center animate-in fade-in slide-in-from-top-8 duration-1000">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 dark:border-blue-400/30 bg-white/10 dark:bg-white/5 px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-blue-300/50 dark:hover:border-blue-400/50 group hover:bg-white/15 dark:hover:bg-white/8">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform"></div>
                <span className="text-sm font-semibold text-blue-100 dark:text-blue-200">
                  Discover Your Dream Stay
                </span>
              </div>
            </div>

            {/* Modern Heading with better hierarchy */}
            <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 fill-mode-both">
              <div className="space-y-6">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.2]">
                    Discover Your
                  </h1>
                </div>
                <div className="relative">
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tighter leading-[1.2]">
                    Perfect Escape
                  </h2>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full blur-sm"></div>
                </div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-blue-50 dark:text-blue-100 pt-8 font-light max-w-3xl mx-auto leading-relaxed">
                Experience timeless elegance, seamless booking, and
                unforgettable moments. Every stay tells a story at CamHotel.
              </p>
            </div>

            {/* CTA Buttons - Modern Grid Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              <a
                href="#rooms"
                className="group relative px-10 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm text-[#0f2f76] dark:text-white bg-white dark:bg-gradient-to-r dark:from-blue-400 dark:to-blue-500 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Book Now</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="/login"
                className="px-10 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm text-white dark:text-white border-2 border-white/40 dark:border-blue-300/60 hover:border-white/80 dark:hover:border-blue-300 hover:bg-white/20 dark:hover:bg-blue-400/20 transition-all duration-300 backdrop-blur-sm group"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">
          {/* Slide Navigation Buttons & Indicators */}
          <div className="flex items-center gap-6">
            {/* <button
              onClick={goToPrevious}
              className="group relative p-3 rounded-full border-2 border-white/30 hover:border-white/70 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button> */}

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 dark:border-white/15 bg-white/8 dark:bg-white/5 backdrop-blur-md">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === heroImageIndex
                      ? "w-8 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  title={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGKCYAGgmC9djnyY2gXdUFO5mpIrsJE0XKLzZbvxU8z-0S1ddkt_b14rMHw-Ic-FIQreXF69ouPiP9LsJUU97x4kEjElUXXVKXXRdTtKs9Pr3MdhaGy6f7i7exOYZqSolarkTJ8IcNEI-MmAx3Rr6Y21YCTcPzwX9O7Hcwa7fBsiTYP0Q48f0nOiAXhUaxcHyKdudqAjVdyfmRz5CeDN8un29JGoz8XUwZooye0OPBHW-BdCyvQxJDji8x18Z95fn6J7Wl1-_PGB0"
                className="w-full h-full object-cover"
                alt="Heritage"
                width={100}
                height={100}
                unoptimized={true}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#1e3a8a] dark:bg-blue-600 p-8 rounded-xl shadow-xl hidden lg:block">
              <p className="text-white font-bold text-4xl italic">35+</p>
              <p className="text-[#dce1ff] dark:text-blue-200 text-xs uppercase tracking-widest">
                Years of Excellence
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Our Heritage
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                A Legacy of <br />
                Refined Hospitality
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Founded on the principles of discretion and architectural beauty,
              CamHotel has been the sanctuary for discerning travelers for over
              three decades.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <ConciergeBell className="text-[#00236f] dark:text-blue-400 w-8 h-8" />
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Bespoke Concierge
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Personalized attention to your every request, 24/7.
                </p>
              </div>
              <div className="space-y-2">
                <Utensils className="text-[#00236f] dark:text-blue-400 w-8 h-8" />
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Fine Dining
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  World-class culinary experiences crafted by master chefs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section
        id="stats"
        className="py-20 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-5">
            <div className="max-w-2xl">
              <span className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Platform Snapshot
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
                Live Performance
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              {isHomepageStatsFetching
                ? "Refreshing live metrics..."
                : isHomepageStatsError
                  ? "Failed to load stats • showing fallback values"
                  : "Powered by real-time backend totals"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <article className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-[#00236f]/15 dark:border-blue-400/30 bg-gradient-to-br from-[#00236f] via-[#17439f] to-[#2b5dbf] p-6 md:p-7 shadow-xl">
              <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-blue-200/20 blur-2xl" />

              <div className="relative z-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-100/90">
                  Active Bookings
                </p>
                <p className="mt-3 text-5xl font-extrabold text-white leading-none">
                  {activeBookingsValue}
                </p>
                <p className="mt-3 text-sm text-blue-100/90">
                  Guests currently in reservation flow
                </p>

                <div className="mt-6 rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-blue-100/90 uppercase tracking-wider">
                    <span>Occupancy</span>
                    <span>{occupancyRate}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-blue-50">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-blue-100/75">
                        Available
                      </p>
                      <p className="text-xl font-bold">
                        {formatStatsValue("availableRooms")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-blue-100/75">
                        Occupied
                      </p>
                      <p className="text-xl font-bold">
                        {formatStatsValue("occupiedRooms")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {statsCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.key}
                    className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <Icon className="w-4 h-4 text-[#00236f] dark:text-blue-300" />
                    </div>
                    <p className="mt-3 text-4xl font-extrabold text-[#00236f] dark:text-blue-300 leading-none">
                      {formatStatsValue(item.key, item.decimal)}
                    </p>
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      {item.hint}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section
        id="rooms"
        className="py-24 px-8 bg-section-alt-bg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[#4b1c00] dark:text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
                Accommodations
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
                Curated Sanctuaries
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              Booking available after login
              {isFetching ? " • loading live rooms..." : ""}
              {isError ? " • showing fallback list" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((item, index) => (
              <RoomCard
                key={index}
                title={item.title}
                tag={item.tag}
                image={item.image}
                description={item.description}
                isVip={item.isVip}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Experience Section */}
      <section
        id="experience"
        className="relative overflow-hidden py-24 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800 fill-mode-both"
      >
        <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-[#dce1ff]/50 dark:bg-blue-900/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-amber-100/60 dark:bg-amber-900/20 blur-3xl" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-stretch relative z-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Signature Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Designed Around the
                <br />
                Way You Travel
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
                From arrival to checkout, every step is curated to feel smooth,
                private, and memorable. We pair thoughtful service with premium
                comfort so your stay feels effortless.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-[#00236f] dark:text-blue-300">
                  24/7
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Concierge support
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-[#00236f] dark:text-blue-300">
                  15 min
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  To city center
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-[#00236f] dark:text-blue-300">
                  98%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Returning guests
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <a
                href="tel:+85523888000"
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:border-[#00236f]/40 dark:hover:border-blue-400/60 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00236f] dark:text-blue-400" />
                <span>+855 23 888 000</span>
              </a>
              <a
                href="mailto:stay@camhotel.com"
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:border-[#00236f]/40 dark:hover:border-blue-400/60 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00236f] dark:text-blue-400" />
                <span>stay@camhotel.com</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-[#00236f] dark:text-blue-400" />
                <span>Phnom Penh Riverside</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-2xl border border-white/40 dark:border-slate-700/70">
            <Image
              src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=80"
              alt="CamHotel suite experience"
              fill
              className="object-cover"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 space-y-5">
              <div className="flex items-start gap-3">
                <ConciergeBell className="w-5 h-5 text-blue-200 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold">Private Check-in</h3>
                  <p className="text-white/80 text-sm">
                    Fast, discreet arrival support tailored to your schedule.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="w-5 h-5 text-amber-200 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold">Chef-Curated Dining</h3>
                  <p className="text-white/80 text-sm">
                    Seasonal menus and in-room options crafted for comfort.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-200 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold">Prime Location</h3>
                  <p className="text-white/80 text-sm">
                    Minutes from business hubs, dining, and riverside walks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 px-8 bg-section-alt-bg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-both">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-5">
            <div className="max-w-xl">
              <span className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Guest Ratings
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
                What Our Guests Say
              </h2>
            </div>
          </div>

          {featuredRatings.length > 0 ? (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f6f7fc] to-transparent dark:from-[#121625]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f6f7fc] to-transparent dark:from-[#121625]" />
              <div
                ref={ratingsTrackRef}
                className="flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 px-1"
                onMouseEnter={() => setIsRatingsHovered(true)}
                onMouseLeave={() => setIsRatingsHovered(false)}
              >
                {marqueeRatings.map((rating, index) => {
                  const imageUrl = resolveMediaUrl(rating.profileImage);
                  const initials = (rating.name || "G")
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part.charAt(0).toUpperCase())
                    .join("");

                  return (
                    <article
                      key={`${rating.id}-${index}`}
                      className="group min-w-[300px] md:min-w-[360px] lg:min-w-[390px] max-w-[390px] shrink-0 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-in fade-in slide-in-from-right-6 duration-700 fill-mode-both"
                      style={{ animationDelay: `${(index % 10) * 70}ms` }}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={rating.name}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-full object-cover"
                              unoptimized={true}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-[#dce1ff] dark:bg-blue-900/70 text-[#00236f] dark:text-blue-200 font-bold flex items-center justify-center">
                              {initials || "G"}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {rating.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {rating.jobTitle || "Guest"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={`${rating.id}-${index}-star-${starIndex}`}
                              className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                                starIndex < rating.stars
                                  ? "fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-6">
                        {rating.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
              No public ratings yet. Be the first guest to leave feedback.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
