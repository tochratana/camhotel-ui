"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  ChevronDown,
  ConciergeBell,
  Mail,
  MapPin,
  Phone,
  Star,
  Utensils,
} from "lucide-react";
import { roomCard } from "@/data/roomCard";
import { useGetRatingsQuery, useGetRoomsQuery } from "@/lib/feature/hotelSlice";
import { resolveMediaUrl } from "@/lib/media-url";
import RoomCard from "@/components/homepage/RoomCard";

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

type HomepageStatsPlaceholder = {
  totalUsers: string;
  totalRooms: string;
  totalRoomTypes: string;
  totalBookings: string;
  totalStaff: string;
  totalRatings: string;
};

const statsPlaceholder: HomepageStatsPlaceholder = {
  totalUsers: "--",
  totalRooms: "--",
  totalRoomTypes: "--",
  totalBookings: "--",
  totalStaff: "--",
  totalRatings: "--",
};

const statsCards: Array<{
  key: keyof HomepageStatsPlaceholder;
  label: string;
  hint: string;
}> = [
  { key: "totalUsers", label: "Total Users", hint: "Guests & accounts" },
  { key: "totalRooms", label: "Total Rooms", hint: "All room inventory" },
];

export default function Homepage() {
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

  const { data: ratingData, isFetching: isRatingsFetching } = useGetRatingsQuery({
    page: 0,
    size: 6,
  });

  const featuredRatings = useMemo(() => {
    const ratings = ratingData?.data?.content ?? [];
    return ratings.slice(0, 3);
  }, [ratingData]);

  return (
    <main className="bg-background min-h-screen font-sans selection:bg-[#dce1ff] dark:selection:bg-blue-900/50">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden animate-in fade-in duration-1000">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz59i7Cb4S5Pgd5Y4_GeLXk8Ue3HN6sxYdWnkKI0C1CaSnUPVJR17SWDR4KQiGQCGpJB5iEH8wZlpf7hdSQIxnSHoyFRTh-q2MoQ46K2Ad1E-mM27NmYpUKU27eFJbMasZvxc7DP7XPhNdKyluxELTY02cMoPmhUf8SyEpZOPzoGFOAdIdHDRjA9L9B9apEwbNPldjF6d5rxBtaNLVyYImCghrBftSIiNfE11oiFNqWn1ntDVtEwtvh-9UUTVvJ0Ruop8lqTrg1K0"
            className="w-full h-full object-cover"
            alt="Lobby"
            width={100}
            height={400}
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Your Premium <span className="text-[#dce1ff]">Stay Awaits</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience architectural elegance and curated hospitality at
            CamHotel. Every detail designed for your ultimate comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#rooms"
              className="w-full sm:w-auto bg-white dark:bg-blue-500 text-[#00236f] dark:text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#dce1ff] dark:hover:bg-blue-400 transition-colors shadow-xl"
            >
              Explore Rooms
            </a>
            <span className="text-white/80 text-xs tracking-widest uppercase">
              Login to Book Your Stay
            </span>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
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

      {/* Stats Placeholder Section */}
      <section id="stats" className="py-20 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-5">
            <div className="max-w-2xl">
              <span className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Platform Snapshot
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
                System Totals
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              Placeholder values • replace with API counts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statsCards.map((item) => (
              <article
                key={item.key}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 p-5 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-3 text-4xl font-extrabold text-[#00236f] dark:text-blue-300 leading-none">
                  {statsPlaceholder[item.key]}
                </p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {item.hint}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 px-8 bg-section-alt-bg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both">
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
      <section id="experience" className="relative overflow-hidden py-24 px-8 bg-background animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800 fill-mode-both">
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
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              {isRatingsFetching ? "Loading recent ratings..." : "Real feedback from verified customers"}
            </p>
          </div>

          {featuredRatings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredRatings.map((rating) => {
                const imageUrl = resolveMediaUrl(rating.profileImage);
                const initials = (rating.name || "G")
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part.charAt(0).toUpperCase())
                  .join("");

                return (
                  <article
                    key={rating.id}
                    className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 p-6 shadow-sm"
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
                          <p className="font-semibold text-slate-900 dark:text-white">{rating.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {rating.jobTitle || "Guest"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < rating.stars ? "fill-current" : "text-slate-300 dark:text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rating.description}
                    </p>
                  </article>
                );
              })}
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
