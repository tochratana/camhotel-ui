"use client";

import {
  LucideArrowRight,
  LucideBedDouble,
  LucideBusFront,
  LucideCalendarCheck,
  LucideConciergeBell,
  LucideWifi,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useGetFacilitiesQuery } from "@/lib/feature/facilitySlice";
import { resolveMediaUrl } from "@/lib/media-url";

export default function FacilityBlock() {
  const { data: response, isLoading, isError } = useGetFacilitiesQuery();
  const data = Array.isArray(response?.data) ? response.data[0] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8ff] dark:bg-input-bg">
        <Loader2 className="size-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse font-medium">Preparing your luxury experience...</p>
      </div>
    );
  }

  // Fallback if data is missing or error occurs
  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8ff] dark:bg-input-bg text-center p-8">
        <h2 className="text-2xl font-bold text-[#00236f] dark:text-[#dce1ff] mb-2">Content Unavailable</h2>
        <p className="text-muted-foreground">We're having trouble loading the facilities information. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#faf8ff] dark:bg-input-bg text-[#1a1b21] dark:text-[#eeedf4] font-sans selection:bg-[#b6c4ff] selection:text-[#00164e] transition-colors duration-300">
        <main className="pt-32 pb-16">
          {/* Hero Section */}
          <header className="max-w-7xl mx-auto px-8 mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] text-[#757682] dark:text-[#c5c5d3] mb-4 block font-bold">
                  Exquisite Living
                </span>
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-[#00236f] dark:text-[#dce1ff] leading-tight">
                  {(data.exquisiteHeader || "").split('.').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 ? <><br /> </> : ''}
                    </span>
                  ))}
                </h1>
              </div>
              <div className="max-w-xs">
                <p className="text-[#444651] dark:text-[#c5c5d3] leading-relaxed border-l-2 border-[#d0d8ff] pl-4">
                  {data.exquisiteBody}
                </p>
              </div>
            </div>
          </header>

          <section className="max-w-7xl mx-auto px-8 space-y-24">
            {/* 1. Accommodations */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 aspect-16/10 md:aspect-video overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-xl ring-1 ring-black/5">
                <Image
                  src={resolveMediaUrl(data.accommodationsImage)}
                  className="w-full h-full object-cover"
                  alt="Accommodations"
                  width={1200}
                  height={800}
                  unoptimized={true}
                />
              </div>
              <div className="md:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6e2c00] dark:text-[#ffb691]">
                  Accommodations
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1b21] dark:text-white">
                  {data.accommodationsHeader}
                </h2>
                <p className="text-[#444651] dark:text-[#c5c5d3] text-lg">
                  {data.accommodationsBody}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(data.accommodationsType || []).map((type, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#dce1ff] dark:bg-[#4059aa] rounded-2xl px-4 py-2 transition-transform hover:scale-105 cursor-default">
                      <span className="material-symbols-outlined text-[#1e3a8a] dark:text-[#b6c4ff]">
                        {idx % 2 === 0 ? <LucideBedDouble size={20} /> : <LucideWifi size={20} />}
                      </span>
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Leisure (Pool) */}
            <div className="relative rounded-3xl overflow-hidden h-112.5 md:h-137.5 group shadow-2xl">
              <Image
                src={resolveMediaUrl(data.leisureImage)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Leisure"
                width={1200}
                height={800}
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-end md:items-center p-8 md:p-16">
                <div className="max-w-lg text-white space-y-4">
                  <span className="text-xs uppercase tracking-widest opacity-70 font-bold">
                    Leisure
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold">
                    {data.leisureHeader}
                  </h2>
                  <p className="text-slate-300 text-lg hidden sm:block">
                    {data.leisureBody}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Gastronomy */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
              <div className="md:col-span-4 p-8 rounded-3xl flex flex-col justify-center bg-card-bg border shadow-sm backdrop-blur-sm">
                <span className="text-xs uppercase tracking-widest text-[#6e2c00] font-bold mb-4">
                  Gastronomy
                </span>
                <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
                  {data.gastronomyHeader}
                </h2>
                <p className="leading-relaxed mb-8 text-[#444651] dark:text-[#c5c5d3]">
                  {data.gastronomyBody}
                </p>
                <button className="flex items-center gap-2 font-bold hover:translate-x-2 transition-all text-text-card-footer w-fit">
                  Reserve a Table{" "}
                  <LucideArrowRight size={20} />
                </button>
              </div>
              <div className="md:col-span-8 grid grid-cols-2 gap-4">
                {(data.gastronomyImage || []).map((img, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-lg aspect-square group ring-1 ring-black/5">
                    <Image
                      src={resolveMediaUrl(img)}
                      alt={`Gastronomy ${idx + 1}`}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Exceptional Service - Fixed Grid */}
            <div className="bg-[#f4f3fa] dark:bg-[#6D7698] rounded-3xl p-10 md:p-16 border border-transparent dark:border-slate-700 shadow-inner">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold dark:text-white tracking-tight">
                  Exceptional Service
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: <LucideBusFront size={24} className="font-bold" />,
                    title: "Private Chauffeur",
                    desc: "Luxury fleet for your transit.",
                  },
                  {
                    icon: (
                      <LucideCalendarCheck size={24} className="font-bold" />
                    ),
                    title: "Event Planning",
                    desc: "Exclusive access to city venues.",
                  },
                  {
                    icon: (
                      <LucideConciergeBell size={24} className="font-bold" />
                    ),
                    title: "24/7 Service",
                    desc: "Personalized attention anytime.",
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center group">
                    <div className="w-16 h-16 bg-[#dce1ff] dark:bg-[#4059aa] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#00236f] dark:text-white group-hover:rotate-12 transition-transform duration-300 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#444651] dark:text-[#c5c5d3] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
