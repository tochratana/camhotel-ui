import React from 'react';
import Image from "next/image";

export default function AdminDashboard() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased transition-colors duration-300 flex flex-col md:flex-row">

            {/* SideNavBar - Hidden on Mobile */}
            <aside
                className="hidden md:flex flex-col bg-[#faf8ff] dark:bg-slate-950 h-screen w-64 fixed left-0 top-0 border-r border-[#c5c5d3]/20 dark:border-slate-800 pt-20 pb-6 z-40 transition-colors duration-300">
                <div className="px-6 mb-8 mt-4">
                    <div className="bg-[#00236f]/5 dark:bg-blue-900/20 p-4 rounded-xl">
                        <p className="text-[#00236f] dark:text-blue-300 font-black text-lg font-['Manrope']">CamHotel</p>
                        <p className="text-[#1e3a8a]/70 dark:text-blue-400/70 text-xs font-semibold font-['Manrope']">Premium
                            Management</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 font-['Manrope'] text-sm font-semibold overflow-y-auto">
                    <a className="flex items-center gap-3 bg-white dark:bg-slate-900 text-[#1e3a8a] dark:text-blue-300 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg py-2.5 px-3 my-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined text-[#1e3a8a] dark:text-blue-400 align-middle"
                              style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
                        Dashboard
                    </a>
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg hover:translate-x-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined align-middle">bed</span>
                        Rooms
                    </a>
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg hover:translate-x-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined align-middle">category</span>
                        Room Types
                    </a>
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg hover:translate-x-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined align-middle">event_available</span>
                        Bookings
                    </a>
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg hover:translate-x-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined align-middle">payments</span>
                        Payments
                    </a>
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg hover:translate-x-1 transition-all"
                       href="#">
                        <span className="material-symbols-outlined align-middle">group</span>
                        Users
                    </a>
                </nav>

                <div className="px-4 mt-auto space-y-1">
                    <a className="flex items-center gap-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 py-2.5 px-3 rounded-lg transition-all font-['Manrope'] text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">settings</span>
                        Settings
                    </a>
                    <a className="flex items-center gap-3 text-[#ba1a1a] dark:text-red-400 hover:bg-[#ba1a1a]/10 dark:hover:bg-red-900/20 py-2.5 px-3 rounded-lg transition-all font-['Manrope'] text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">logout</span>
                        Logout
                    </a>

                    <div
                        className="mt-4 p-4 bg-[#1e3a8a] dark:bg-blue-900/40 rounded-xl text-[#90a8ff] dark:text-blue-200">
                        <p className="text-xs font-bold mb-2">Need help?</p>
                        <button
                            className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-xs font-bold transition-colors">
                            Support Center
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <div className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-24 md:pt-24 min-h-screen">

                {/* Breadcrumbs / Header Section */}
                <div
                    className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1b21] dark:text-white tracking-tight font-['Manrope']">
                            Management Dashboard
                        </h1>
                        <p className="text-[#757682] dark:text-slate-400 mt-1 font-['Inter'] text-sm md:text-base">
                            Welcome back, Alex. Here&#39;s what&#39;s happening today at CamHotel.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div
                            className="bg-[#f4f3fa] dark:bg-slate-800/60 px-4 py-2 rounded-xl flex items-center gap-2 border border-transparent dark:border-slate-700/50">
                            <span
                                className="material-symbols-outlined text-[#00236f] dark:text-blue-400 text-sm align-middle">calendar_today</span>
                            <span
                                className="text-xs font-bold text-[#444651] dark:text-slate-300 font-['Inter'] uppercase tracking-widest">Oct 24, 2023</span>
                        </div>
                    </div>
                </div>

                {/* Bento Grid KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">

                    {/* KPI Card 1 */}
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border-b-2 border-[#dce1ff] dark:border-blue-500/50 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="text-[10px] font-bold text-[#757682] dark:text-slate-400 font-['Inter'] uppercase tracking-widest">Total Rooms</span>
                            <span
                                className="material-symbols-outlined text-[#00236f]/40 dark:text-blue-400/50 align-middle">bed</span>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-[#1a1b21] dark:text-white font-['Manrope']">128</p>
                            <p className="text-xs text-[#757682] dark:text-slate-400 mt-1">Across 4 wings</p>
                        </div>
                    </div>

                    {/* KPI Card 2 */}
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border-b-2 border-[#dce1ff] dark:border-blue-500/50 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="text-[10px] font-bold text-[#757682] dark:text-slate-400 font-['Inter'] uppercase tracking-widest">Today&#39;s Bookings</span>
                            <span
                                className="material-symbols-outlined text-[#00236f]/40 dark:text-blue-400/50 align-middle">event_note</span>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-[#1a1b21] dark:text-white font-['Manrope']">42</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span
                                    className="material-symbols-outlined text-xs text-green-600 dark:text-green-400 align-middle">trending_up</span>
                                <p className="text-xs text-green-600 dark:text-green-400 font-bold">+12% vs
                                    yesterday</p>
                            </div>
                        </div>
                    </div>

                    {/* KPI Card 3 */}
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border-b-2 border-[#dce1ff] dark:border-blue-500/50 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="text-[10px] font-bold text-[#757682] dark:text-slate-400 font-['Inter'] uppercase tracking-widest">Occupancy</span>
                            <span
                                className="material-symbols-outlined text-[#00236f]/40 dark:text-blue-400/50 align-middle">group_work</span>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-[#1a1b21] dark:text-white font-['Manrope']">88%</p>
                            <div className="w-full bg-[#e9e7ef] dark:bg-slate-700 h-1.5 rounded-full mt-2">
                                <div className="bg-[#00236f] dark:bg-blue-500 h-full rounded-full w-[88%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* KPI Card 4 */}
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border-b-2 border-[#ffdbcb] dark:border-amber-500/50 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="text-[10px] font-bold text-[#757682] dark:text-slate-400 font-['Inter'] uppercase tracking-widest">Revenue (Daily)</span>
                            <span
                                className="material-symbols-outlined text-[#4b1c00]/40 dark:text-amber-500/50 align-middle">payments</span>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-[#1a1b21] dark:text-white font-['Manrope']">$14,250</p>
                            <p className="text-xs text-[#757682] dark:text-slate-400 mt-1">Weekly: $98,400</p>
                        </div>
                    </div>

                    {/* KPI Card 5 */}
                    <div
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border-b-2 border-[#ffdad6] dark:border-red-500/50 flex flex-col justify-between hover:-translate-y-1 transition-transform sm:col-span-2 lg:col-span-1">
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className="text-[10px] font-bold text-[#757682] dark:text-slate-400 font-['Inter'] uppercase tracking-widest">Pending Pmts</span>
                            <span
                                className="material-symbols-outlined text-[#ba1a1a]/40 dark:text-red-500/50 align-middle">warning</span>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-[#1a1b21] dark:text-white font-['Manrope']">07</p>
                            <p className="text-xs text-[#ba1a1a] dark:text-red-400 font-bold mt-1">Requires
                                Attention</p>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Analytics Section */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Revenue Trends Chart Placeholder */}
                        <div
                            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
                                <div>
                                    <h3 className="text-lg font-bold font-['Manrope'] text-[#1a1b21] dark:text-white">Weekly
                                        Performance</h3>
                                    <p className="text-xs text-[#757682] dark:text-slate-400">Revenue and Occupancy
                                        tracking</p>
                                </div>
                                <select
                                    className="bg-[#f4f3fa] dark:bg-slate-800 border-none rounded-lg text-xs font-bold text-[#444651] dark:text-slate-300 focus:ring-[#00236f] dark:focus:ring-blue-500 outline-none p-2 cursor-pointer w-full sm:w-auto">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>

                            <div className="relative h-48 md:h-64 w-full flex items-end justify-between px-2 md:px-4">
                                {/* Simple Bar Chart Representation */}
                                {[
                                    {day: 'Mon', bg1: 'h-[40%]', bg2: 'h-[65%]'},
                                    {day: 'Tue', bg1: 'h-[50%]', bg2: 'h-[75%]'},
                                    {day: 'Wed', bg1: 'h-[35%]', bg2: 'h-[60%]'},
                                    {day: 'Thu', bg1: 'h-[60%]', bg2: 'h-[90%]'},
                                    {day: 'Fri', bg1: 'h-[45%]', bg2: 'h-[80%]'},
                                    {day: 'Sat', bg1: 'h-[70%]', bg2: 'h-[95%]'},
                                    {day: 'Sun', bg1: 'h-[55%]', bg2: 'h-[85%]'},
                                ].map((col, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                        <div
                                            className={`w-4 md:w-8 bg-[#00236f]/10 dark:bg-blue-500/20 rounded-t-lg group-hover:bg-[#00236f]/20 dark:group-hover:bg-blue-500/40 transition-colors ${col.bg1}`}></div>
                                        <div
                                            className={`w-4 md:w-8 bg-[#00236f] dark:bg-blue-500 rounded-t-lg shadow-lg ${col.bg2}`}></div>
                                        <span
                                            className="text-[8px] md:text-[10px] font-bold text-[#757682] dark:text-slate-400 uppercase">{col.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Room Status Grid */}
                        <div
                            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold font-['Manrope'] text-[#1a1b21] dark:text-white">Operational
                                    View</h3>
                                <button
                                    className="text-[#00236f] dark:text-blue-400 text-xs font-bold hover:underline">View
                                    All
                                </button>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-2 md:gap-3">
                                {/* Rooms Map */}
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">101
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">102
                                </div>
                                <div
                                    className="aspect-square bg-[#e9e7ef] dark:bg-slate-800 text-[#757682] dark:text-slate-400 rounded-lg flex items-center justify-center text-xs font-bold">103
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">104
                                </div>
                                <div
                                    className="aspect-square bg-[#ffdbcb] dark:bg-amber-900/40 text-[#773205] dark:text-amber-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#4b1c00]/10 dark:border-amber-500/20">105
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">106
                                </div>
                                <div
                                    className="aspect-square bg-[#e9e7ef] dark:bg-slate-800 text-[#757682] dark:text-slate-400 rounded-lg flex items-center justify-center text-xs font-bold">107
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">108
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">201
                                </div>
                                <div
                                    className="aspect-square bg-[#ffdad6] dark:bg-red-900/40 text-[#93000a] dark:text-red-300 rounded-lg flex items-center justify-center text-xs font-bold border border-[#ba1a1a]/10 dark:border-red-500/20">202
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">203
                                </div>
                                <div
                                    className="aspect-square bg-[#dce1ff] dark:bg-blue-900/50 text-[#264191] dark:text-blue-200 rounded-lg flex items-center justify-center text-xs font-bold border border-[#00236f]/10 dark:border-blue-500/20">204
                                </div>
                            </div>

                            <div
                                className="mt-6 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400">
                                <div className="flex items-center gap-1.5"><span
                                    className="w-2 h-2 rounded-full bg-[#dce1ff] dark:bg-blue-500"></span> Occupied
                                </div>
                                <div className="flex items-center gap-1.5"><span
                                    className="w-2 h-2 rounded-full bg-[#e9e7ef] dark:bg-slate-600"></span> Vacant
                                </div>
                                <div className="flex items-center gap-1.5"><span
                                    className="w-2 h-2 rounded-full bg-[#ffdbcb] dark:bg-amber-500"></span> Cleaning
                                </div>
                                <div className="flex items-center gap-1.5"><span
                                    className="w-2 h-2 rounded-full bg-[#ffdad6] dark:bg-red-500"></span> Maintenance
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar equivalent) */}
                    <div className="space-y-6 md:space-y-8">

                        {/* Recent Activity Sidebar */}
                        <div
                            className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                            <h3 className="text-lg font-bold font-['Manrope'] text-[#1a1b21] dark:text-white mb-6">Recent
                                Activity</h3>
                            <div className="space-y-6">

                                {/* Activity Item 1 */}
                                <div className="flex gap-4 items-start group">
                                    <div
                                        className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                                        <Image alt="Guest"
                                               width={100}
                                               height={400}
                                               className="w-full h-full object-cover"
                                               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Sarah
                                                Jenkins</p>
                                            <span
                                                className="text-[10px] font-bold text-[#90a8ff] dark:text-blue-200 px-2 py-0.5 bg-[#dce1ff] dark:bg-blue-900/60 rounded uppercase">Check-in</span>
                                        </div>
                                        <p className="text-xs text-[#757682] dark:text-slate-400 mt-0.5">Room 204 •
                                            Deluxe Suite</p>
                                        <p className="text-[10px] text-[#757682] dark:text-slate-500 mt-2 flex items-center gap-1">
                                            <span
                                                className="material-symbols-outlined text-[12px] align-middle">schedule</span> 12
                                            mins ago
                                        </p>
                                    </div>
                                </div>

                                {/* Activity Item 2 */}
                                <div className="flex gap-4 items-start group">
                                    <div
                                        className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                                        <Image alt="Guest"
                                               width={100}
                                               height={400}
                                               className="w-full h-full object-cover"
                                               src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">David
                                                Miller</p>
                                            <span
                                                className="text-[10px] font-bold text-[#773205] dark:text-amber-200 px-2 py-0.5 bg-[#ffdbcb] dark:bg-amber-900/60 rounded uppercase">New Booking</span>
                                        </div>
                                        <p className="text-xs text-[#757682] dark:text-slate-400 mt-0.5">Room 101 •
                                            Classic Queen</p>
                                        <p className="text-[10px] text-[#757682] dark:text-slate-500 mt-2 flex items-center gap-1">
                                            <span
                                                className="material-symbols-outlined text-[12px] align-middle">schedule</span> 45
                                            mins ago
                                        </p>
                                    </div>
                                </div>

                                {/* Activity Item 3 */}
                                <div className="flex gap-4 items-start group">
                                    <div
                                        className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                                        <Image alt="Guest"
                                               width={100}
                                               height={400}
                                               className="w-full h-full object-cover"
                                               src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Elena
                                                Rodriguez</p>
                                            <span
                                                className="text-[10px] font-bold text-[#3d4565] dark:text-slate-200 px-2 py-0.5 bg-[#bdc5eb] dark:bg-slate-700 rounded uppercase">Check-out</span>
                                        </div>
                                        <p className="text-xs text-[#757682] dark:text-slate-400 mt-0.5">Room 305 •
                                            Penthouse</p>
                                        <p className="text-[10px] text-[#757682] dark:text-slate-500 mt-2 flex items-center gap-1">
                                            <span
                                                className="material-symbols-outlined text-[12px] align-middle">schedule</span> 1
                                            hour ago
                                        </p>
                                    </div>
                                </div>

                                {/* Activity Item 4 */}
                                <div className="flex gap-4 items-start group">
                                    <div
                                        className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                                        <Image alt="Guest"
                                               width={100}
                                               height={400}
                                               className="w-full h-full object-cover"
                                               src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Marcus
                                                Thorne</p>
                                            <span
                                                className="text-[10px] font-bold text-[#90a8ff] dark:text-blue-200 px-2 py-0.5 bg-[#dce1ff] dark:bg-blue-900/60 rounded uppercase">Check-in</span>
                                        </div>
                                        <p className="text-xs text-[#757682] dark:text-slate-400 mt-0.5">Room 208 • Twin
                                            Single</p>
                                        <p className="text-[10px] text-[#757682] dark:text-slate-500 mt-2 flex items-center gap-1">
                                            <span
                                                className="material-symbols-outlined text-[12px] align-middle">schedule</span> 2
                                            hours ago
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <button
                                className="w-full mt-8 py-3 border border-[#c5c5d3]/50 dark:border-slate-700 rounded-lg text-xs font-bold text-[#1a1b21] dark:text-slate-300 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-colors uppercase tracking-widest">
                                Full Activity Log
                            </button>
                        </div>

                        {/* VIP/Special Alerts Card */}
                        <div
                            className="bg-linear-to-br from-[#6e2c00] to-[#4b1c00] dark:from-amber-700 dark:to-amber-900 p-6 rounded-xl shadow-lg text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className="material-symbols-outlined text-[#ffdbcb] dark:text-amber-300 align-middle">hotel_class</span>
                                <h3 className="font-['Manrope'] font-bold uppercase text-xs tracking-widest">VIP Arrival
                                    Alert</h3>
                            </div>
                            <p className="text-sm font-medium mb-4 text-[#ffdbcb]/90 dark:text-amber-100/90 leading-relaxed">
                                Ambassador John Doe arriving at 6:00 PM. Room 501 (Presidential Suite) preparation 90%
                                complete.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 px-2.5 py-1 rounded text-[10px] font-bold tracking-wide">Flowers Set</span>
                                <span className="bg-white/20 px-2.5 py-1 rounded text-[10px] font-bold tracking-wide">Climate Confirmed</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}