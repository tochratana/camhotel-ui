import React from 'react';
import Image from "next/image";

export default function RoomTypeAdmin() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased transition-colors duration-300 flex flex-col md:flex-row">
            {/* SideNavBar - Hidden on Mobile */}
            <aside
                className="hidden md:flex flex-col bg-[#faf8ff] dark:bg-slate-950 h-screen w-64 fixed left-0 top-0 border-r border-[#c5c5d3]/20 dark:border-slate-800 pt-20 pb-6 z-40 transition-colors duration-300">
                <div className="px-6 mb-8 mt-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 bg-[#1e3a8a] dark:bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-white align-middle"
                                  style={{fontVariationSettings: "'FILL' 1"}}>hotel</span>
                        </div>
                        <div>
                            <div
                                className="text-lg font-black text-[#00236f] dark:text-blue-300 ">CamHotel
                            </div>
                            <div
                                className="text-[10px] uppercase tracking-widest font-bold text-[#757682] dark:text-slate-400">Premium
                                Mgmt
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    <a className="flex items-center gap-3 mx-2 my-1 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">dashboard</span>
                        Dashboard
                    </a>
                    <a className="flex items-center gap-3 mx-2 my-1 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">bed</span>
                        Rooms
                    </a>
                    <a className="flex items-center gap-3 bg-white dark:bg-slate-900 text-[#00236f] dark:text-blue-300 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg my-1 mx-2 px-4 py-2.5  text-sm font-semibold transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined align-middle"
                              style={{fontVariationSettings: "'FILL' 1"}}>category</span>
                        Room Types
                    </a>
                    <a className="flex items-center gap-3 mx-2 my-1 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">event_available</span>
                        Bookings
                    </a>
                    <a className="flex items-center gap-3 mx-2 my-1 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">payments</span>
                        Payments
                    </a>
                    <a className="flex items-center gap-3 mx-2 my-1 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">group</span>
                        Users
                    </a>
                </nav>

                <div className="px-4 mt-auto border-t border-[#c5c5d3]/30 dark:border-slate-800 pt-4">
                    <a className="flex items-center gap-3 px-4 py-2.5 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-all text-sm font-semibold "
                       href="#">
                        <span className="material-symbols-outlined align-middle">settings</span>
                        Settings
                    </a>
                    <a className="flex items-center gap-3 px-4 py-2.5 text-[#ba1a1a] dark:text-red-400 hover:bg-[#ffdad6]/40 dark:hover:bg-red-900/20 rounded-lg transition-all text-sm font-semibold "
                       href="#">
                        <span className="material-symbols-outlined align-middle">logout</span>
                        Logout
                    </a>

                    <div
                        className="mt-4 p-4 bg-[#1e3a8a]/5 dark:bg-blue-900/20 rounded-xl border border-[#00236f]/10 dark:border-blue-500/20">
                        <p className="text-[11px] font-bold text-[#00236f] dark:text-blue-300 uppercase tracking-tighter mb-2">Support
                            Center</p>
                        <button
                            className="w-full text-xs font-bold text-white bg-[#00236f] dark:bg-blue-600 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                            Get Help
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-24 min-h-screen">

                {/* Header Section */}
                <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-4 sm:gap-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1b21] dark:text-white tracking-tight mb-2 ">
                            Room Types Management
                        </h1>
                        <p className="text-[#444651] dark:text-slate-400 font-['Inter'] text-sm">
                            Define and manage luxury categories, pricing structures, and occupancy limits.
                        </p>
                    </div>
                    <button
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-600 dark:to-blue-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#00236f]/20 hover:scale-105 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-sm align-middle">add</span>
                        Create Room Type
                    </button>
                </div>

                {/* Stats/Bento Grid Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                        <div
                            className="text-[10px] md:text-xs font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Total
                            Categories
                        </div>
                        <div
                            className="text-2xl md:text-3xl  font-extrabold text-[#00236f] dark:text-blue-400">04
                        </div>
                    </div>
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                        <div
                            className="text-[10px] md:text-xs font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Avg.
                            Base Price
                        </div>
                        <div
                            className="text-2xl md:text-3xl  font-extrabold text-[#00236f] dark:text-blue-400">$425
                        </div>
                    </div>
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                        <div
                            className="text-[10px] md:text-xs font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Occupancy
                            High
                        </div>
                        <div
                            className="text-2xl md:text-3xl  font-extrabold text-[#00236f] dark:text-blue-400">08
                        </div>
                    </div>
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                        <div
                            className="text-[10px] md:text-xs font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Active
                            Status
                        </div>
                        <div
                            className="text-2xl md:text-3xl  font-extrabold text-[#f39461] dark:text-amber-500">100%
                        </div>
                    </div>
                </div>

                {/* Data Table Section */}
                <div
                    className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
                            <thead>
                            <tr className="bg-[#f4f3fa] dark:bg-slate-800/80 border-b border-[#e9e7ef] dark:border-slate-700">
                                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#444651] dark:text-slate-300 uppercase tracking-widest">Type
                                    & Preview
                                </th>
                                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#444651] dark:text-slate-300 uppercase tracking-widest">Description</th>
                                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#444651] dark:text-slate-300 uppercase tracking-widest">Base
                                    Price
                                </th>
                                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#444651] dark:text-slate-300 uppercase tracking-widest">Max
                                    Occupancy
                                </th>
                                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-[#444651] dark:text-slate-300 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e9e7ef] dark:divide-slate-800">

                            {/* Row 1: Single */}
                            <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                            <Image alt="Single Room Preview"
                                                   width={100}
                                                   height={400}
                                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                   src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=150&auto=format&fit=crop"/>
                                        </div>
                                        <div>
                                            <div
                                                className=" font-bold text-[#1a1b21] dark:text-white">Single
                                            </div>
                                            <div className="text-xs text-[#444651] dark:text-slate-400">Standard
                                                Comfort
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 max-w-50 md:max-w-xs whitespace-normal">
                                    <p className="text-sm text-[#444651] dark:text-slate-400 line-clamp-2 leading-relaxed">Elegant
                                        living space optimized for solo travelers or business professionals with premium
                                        workspace.</p>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className="text-lg  font-bold text-[#00236f] dark:text-blue-400">$120</span>
                                        <span
                                            className="text-[10px] text-[#757682] dark:text-slate-500 font-bold">/NIGHT</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="material-symbols-outlined text-[#757682] dark:text-slate-400 text-lg align-middle">person</span>
                                        <span
                                            className="font-['Inter'] font-semibold text-[#1a1b21] dark:text-slate-200 text-sm">1 Adult</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 text-right">
                                    <div className="flex justify-end gap-1 md:gap-2">
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-400">
                                            <span className="material-symbols-outlined align-middle">edit</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400">
                                            <span className="material-symbols-outlined align-middle">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 2: Double */}
                            <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                            <Image alt="Double Room Preview"
                                                   width={100}
                                                   height={400}
                                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                   src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=150&auto=format&fit=crop"/>
                                        </div>
                                        <div>
                                            <div
                                                className=" font-bold text-[#1a1b21] dark:text-white">Double
                                            </div>
                                            <div className="text-xs text-[#444651] dark:text-slate-400">Shared Luxury
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 max-w-50 md:max-w-xs whitespace-normal">
                                    <p className="text-sm text-[#444651] dark:text-slate-400 line-clamp-2 leading-relaxed">Spacious
                                        room featuring dual high-end orthopedic mattresses and expanded vanity area.</p>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className="text-lg  font-bold text-[#00236f] dark:text-blue-400">$210</span>
                                        <span
                                            className="text-[10px] text-[#757682] dark:text-slate-500 font-bold">/NIGHT</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="material-symbols-outlined text-[#757682] dark:text-slate-400 text-lg align-middle">group</span>
                                        <span
                                            className="font-['Inter'] font-semibold text-[#1a1b21] dark:text-slate-200 text-sm">2 Adults</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 text-right">
                                    <div className="flex justify-end gap-1 md:gap-2">
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-400">
                                            <span className="material-symbols-outlined align-middle">edit</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400">
                                            <span className="material-symbols-outlined align-middle">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 3: Suite */}
                            <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                            <Image alt="Suite Preview"
                                                   width={100}
                                                   height={400}
                                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                   src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=150&auto=format&fit=crop"/>
                                        </div>
                                        <div>
                                            <div
                                                className=" font-bold text-[#1a1b21] dark:text-white">Suite
                                            </div>
                                            <div className="text-xs text-[#444651] dark:text-slate-400">Executive Tier
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 max-w-50 md:max-w-xs whitespace-normal">
                                    <p className="text-sm text-[#444651] dark:text-slate-400 line-clamp-2 leading-relaxed">Bespoke
                                        suite with separate living and sleeping quarters, including private dining and
                                        bar.</p>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className="text-lg  font-bold text-[#00236f] dark:text-blue-400">$450</span>
                                        <span
                                            className="text-[10px] text-[#757682] dark:text-slate-500 font-bold">/NIGHT</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="material-symbols-outlined text-[#757682] dark:text-slate-400 text-lg align-middle">family_restroom</span>
                                        <span
                                            className="font-['Inter'] font-semibold text-[#1a1b21] dark:text-slate-200 text-sm">3-4 Guests</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 text-right">
                                    <div className="flex justify-end gap-1 md:gap-2">
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-400">
                                            <span className="material-symbols-outlined align-middle">edit</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400">
                                            <span className="material-symbols-outlined align-middle">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 4: Penthouse */}
                            <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                            <Image alt="Penthouse Preview"
                                                   width={100}
                                                   height={400}
                                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                   src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=150&auto=format&fit=crop"/>
                                        </div>
                                        <div>
                                            <div
                                                className=" font-bold text-[#4b1c00] dark:text-amber-500">Penthouse
                                            </div>
                                            <div
                                                className="text-[10px] bg-[#ffdbcb] dark:bg-amber-900/40 text-[#773205] dark:text-amber-200 px-1.5 py-0.5 rounded font-bold uppercase inline-block mt-1 border border-transparent dark:border-amber-500/20">VVIP
                                                Tier
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 max-w-50 md:max-w-xs whitespace-normal">
                                    <p className="text-sm text-[#444651] dark:text-slate-400 line-clamp-2 leading-relaxed">The
                                        pinnacle of opulence. Top-floor 360° views, private elevator, and 24/7 dedicated
                                        butler service.</p>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className="text-lg  font-bold text-[#4b1c00] dark:text-amber-500">$1,250</span>
                                        <span
                                            className="text-[10px] text-[#757682] dark:text-slate-500 font-bold">/NIGHT</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="material-symbols-outlined text-[#773205] dark:text-amber-500 text-lg align-middle">groups</span>
                                        <span
                                            className="font-['Inter'] font-semibold text-[#1a1b21] dark:text-slate-200 text-sm">8 Guests</span>
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-5 text-right">
                                    <div className="flex justify-end gap-1 md:gap-2">
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-400">
                                            <span className="material-symbols-outlined align-middle">edit</span>
                                        </button>
                                        <button
                                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400">
                                            <span className="material-symbols-outlined align-middle">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div
                        className="bg-[#f4f3fa]/50 dark:bg-slate-800/30 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 border-t border-[#e9e7ef] dark:border-slate-700">
                        <span
                            className="text-xs text-[#444651] dark:text-slate-400 font-medium text-center sm:text-left">Showing 4 of 4 room types defined in your inventory.</span>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1.5 text-xs font-bold text-[#c5c5d3] dark:text-slate-500 hover:text-[#00236f] dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-md shadow-sm border border-[#c5c5d3]/30 dark:border-slate-700">Previous
                            </button>
                            <button
                                className="px-3 py-1.5 text-xs font-bold text-[#00236f] dark:text-blue-400 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-[#c5c5d3]/30 dark:border-slate-700">1
                            </button>
                            <button
                                className="px-3 py-1.5 text-xs font-bold text-[#c5c5d3] dark:text-slate-500 hover:text-[#00236f] dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 rounded-md shadow-sm border border-[#c5c5d3]/30 dark:border-slate-700">Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contextual Help / Tips Bento Item */}
                <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                    <div
                        className="bg-[#00236f]/5 dark:bg-blue-900/10 rounded-2xl p-6 md:p-8 border border-[#00236f]/5 dark:border-blue-500/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className=" font-extrabold text-[#00236f] dark:text-blue-400 text-lg md:text-xl mb-3">Dynamic
                                Pricing Insight</h3>
                            <p className="text-[#444651] dark:text-slate-300 text-sm leading-relaxed mb-6">
                                Based on your current data, the <strong
                                className="text-[#00236f] dark:text-blue-400">Penthouse</strong> is your highest
                                performing luxury asset. Consider adjusting base prices for the holiday season to
                                maximize yields.
                            </p>
                            <button
                                className="text-[#00236f] dark:text-blue-400 font-bold text-sm flex items-center gap-2 group">
                                Configure seasonal overrides
                                <span
                                    className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform align-middle">arrow_forward</span>
                            </button>
                        </div>
                        <span
                            className="material-symbols-outlined absolute -right-4 -bottom-4 text-[#00236f]/10 dark:text-blue-500/10 text-9xl rotate-12 align-middle">trending_up</span>
                    </div>

                    <div
                        className="bg-[#f4f3fa] dark:bg-slate-800/40 rounded-2xl p-6 md:p-8 border border-[#c5c5d3]/30 dark:border-slate-700 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                <span
                                    className="material-symbols-outlined text-[#4b1c00] dark:text-amber-500 align-middle">lightbulb</span>
                            </div>
                            <h3 className=" font-bold text-[#1a1b21] dark:text-white">Curator&#39;s
                                Tip</h3>
                        </div>
                        <p className="text-[#444651] dark:text-slate-400 text-sm italic leading-relaxed">
                            &#34;High-resolution thumbnails increase booking conversions by up to 28%. Ensure your
                            Penthouse
                            and Suite imagery highlights exclusive amenities like private terraces.&#34;
                        </p>
                    </div>

                </div>
            </main>

        </div>
    );
}