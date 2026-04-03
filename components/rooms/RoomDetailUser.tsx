import React from 'react';
import Image from "next/image";

export default function RoomDetailUser() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
            <div className="pt-20">
                {/* Hero Section */}
                <section className="relative w-full h-[50vh] md:h-153.5 overflow-hidden bg-slate-900">
                    <Image
                        alt="Deluxe Suite Hero"
                        width={100}
                        height={400}
                        className="w-full h-full object-cover opacity-90"
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop"
                    />
                    <div
                        className="absolute inset-0 bg-linear-to-t from-[#1a1b21]/80 dark:from-slate-950/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-7xl mx-auto">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[#b6c4ff] dark:text-blue-300 font-['Inter'] text-xs md:text-sm uppercase tracking-[0.2em] mb-2 font-bold">
                                    Signature Collection
                                </p>
                                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight font-['Manrope']">
                                    Deluxe Ocean Suite
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Room Details Column */}
                        <div className="lg:col-span-8 space-y-12 md:space-y-16">

                            {/* Quick Info Grid */}
                            <div
                                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none">
                                <div>
                                    <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-[0.65rem] md:text-xs uppercase tracking-widest mb-1 font-semibold">Room
                                        Number</p>
                                    <p className="text-lg md:text-xl font-bold text-[#1a1b21] dark:text-slate-100 font-['Manrope']">402-A</p>
                                </div>
                                <div>
                                    <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-[0.65rem] md:text-xs uppercase tracking-widest mb-1 font-semibold">Room
                                        Type</p>
                                    <p className="text-lg md:text-xl font-bold text-[#1a1b21] dark:text-slate-100 font-['Manrope']">Deluxe
                                        Suite</p>
                                </div>
                                <div>
                                    <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-[0.65rem] md:text-xs uppercase tracking-widest mb-1 font-semibold">Floor</p>
                                    <p className="text-lg md:text-xl font-bold text-[#1a1b21] dark:text-slate-100 font-['Manrope']">12th
                                        Floor</p>
                                </div>
                                <div>
                                    <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-[0.65rem] md:text-xs uppercase tracking-widest mb-1 font-semibold">Base
                                        Rate</p>
                                    <p className="text-lg md:text-xl font-bold text-[#1a1b21] dark:text-slate-100 font-['Manrope']">$540
                                        / Night</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4 md:space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] dark:text-blue-300 font-['Manrope']">Architectural
                                    Sophistication</h2>
                                <p className="text-[#444651] dark:text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl">
                                    Designed with an emphasis on space and natural light, the Deluxe Ocean Suite offers
                                    a seamless transition between indoor luxury and the coastal horizon. Featuring
                                    hand-curated Italian furniture and a private terrace, it defines the modern
                                    hospitality experience.
                                </p>
                            </div>

                            {/* Amenities Section */}
                            <div className="space-y-6 md:space-y-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#00236f] dark:text-blue-400 border-b border-[#e9e7ef] dark:border-slate-800 pb-4">
                                    Premium Amenities
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">wifi</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">Free Wi-Fi</span>
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">tv</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">Smart TV</span>
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">wine_bar</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">Mini Bar</span>
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">beach_access</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">Ocean View</span>
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">king_bed</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">King Bed</span>
                                    </div>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-lg bg-[#eeedf4] dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span
                                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400">thermostat</span>
                                        </div>
                                        <span
                                            className="font-medium text-sm md:text-base text-[#444651] dark:text-slate-300">A/C Control</span>
                                    </div>
                                </div>
                            </div>

                            {/* Maintenance Status (Read Only) */}
                            <div
                                className="bg-[#f4f3fa] dark:bg-slate-800/40 p-6 md:p-8 rounded-xl space-y-6 border border-transparent dark:border-slate-800">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400">
                                    Management Status
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div
                                        className="bg-white dark:bg-slate-900 px-6 py-4 rounded-lg flex items-center space-x-4 border border-[#c5c5d3]/30 dark:border-slate-700 w-full sm:w-auto">
                                        <div
                                            className="w-2 h-2 rounded-full bg-[#b6c4ff] dark:bg-blue-400 shrink-0"></div>
                                        <div>
                                            <p className="text-[0.65rem] font-bold uppercase text-[#444651]/60 dark:text-slate-400">Housekeeping</p>
                                            <p className="font-semibold text-[#00236f] dark:text-blue-300 text-sm md:text-base">Inspected
                                                & Ready</p>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-white dark:bg-slate-900 px-6 py-4 rounded-lg flex items-center space-x-4 border border-[#c5c5d3]/30 dark:border-slate-700 w-full sm:w-auto">
                                        <div
                                            className="w-2 h-2 rounded-full bg-[#f39461] dark:bg-amber-500 shrink-0"></div>
                                        <div>
                                            <p className="text-[0.65rem] font-bold uppercase text-[#444651]/60 dark:text-slate-400">Maintenance</p>
                                            <p className="font-semibold text-[#4b1c00] dark:text-amber-400 text-sm md:text-base">Routine
                                                Check OK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Sticky Booking Sidebar */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="sticky top-28">

                                {/* Main Booking Card */}
                                <div
                                    className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg md:shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-[0.65rem] md:text-xs uppercase tracking-widest mb-1 font-semibold">Total
                                                for 1 night</p>
                                            <h4 className="text-3xl md:text-4xl font-black text-[#1e3a8a] dark:text-blue-300 font-['Manrope']">$540.00</h4>
                                        </div>
                                        <span
                                            className="bg-[#dce1ff] dark:bg-blue-900/60 text-[#00164e] dark:text-blue-200 text-[0.6rem] md:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-transparent dark:border-blue-800/50">
                      Available
                    </span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div
                                            className="flex justify-between text-sm py-3 border-b border-[#eeedf4] dark:border-slate-800 cursor-pointer hover:opacity-80 transition-opacity">
                                            <span className="text-[#444651] dark:text-slate-400">Check-in</span>
                                            <span className="font-semibold text-[#1a1b21] dark:text-slate-200">Select Date</span>
                                        </div>
                                        <div
                                            className="flex justify-between text-sm py-3 border-b border-[#eeedf4] dark:border-slate-800 cursor-pointer hover:opacity-80 transition-opacity">
                                            <span className="text-[#444651] dark:text-slate-400">Check-out</span>
                                            <span className="font-semibold text-[#1a1b21] dark:text-slate-200">Select Date</span>
                                        </div>
                                        <div
                                            className="flex justify-between text-sm py-3 cursor-pointer hover:opacity-80 transition-opacity">
                                            <span className="text-[#444651] dark:text-slate-400">Guests</span>
                                            <span
                                                className="font-semibold text-[#1a1b21] dark:text-slate-200">2 Adults</span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-600 dark:to-blue-800 text-white py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all hover:shadow-lg hover:opacity-95 active:scale-[0.98]">
                                        Book Now
                                    </button>
                                    <p className="text-center text-[0.65rem] md:text-xs text-[#444651] dark:text-slate-400 mt-6 uppercase tracking-wider font-semibold">
                                        Best Rate Guaranteed for CamHotel Members
                                    </p>
                                </div>

                                {/* Secondary Card: Policy */}
                                <div
                                    className="mt-6 p-6 border-l-4 border-[#dce1ff] dark:border-blue-600 bg-[#f4f3fa] dark:bg-slate-800/50 rounded-r-xl">
                                    <p className="text-[0.7rem] md:text-xs font-bold uppercase text-[#00236f] dark:text-blue-400 mb-2 tracking-wider">Cancellation
                                        Policy</p>
                                    <p className="text-xs md:text-sm text-[#444651] dark:text-slate-300 leading-relaxed">
                                        Flexible cancellation up to 24 hours before arrival. No pre-payment required.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}