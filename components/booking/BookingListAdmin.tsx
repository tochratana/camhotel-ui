import React from 'react';

export default function BookingManagementDashboard() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased overflow-hidden flex transition-colors duration-300">

            {/* SideNavBar - Hidden on mobile/tablet */}
            <aside
                className="hidden lg:flex h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 dark:bg-slate-950 border-r border-[#c5c5d3]/30 dark:border-slate-800 flex-col gap-2 p-4 z-50 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-8 px-2 mt-2">
                    <div
                        className="w-10 h-10 rounded-xl bg-[#00236f] dark:bg-blue-900 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-white align-middle">hotel</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-[#1e3a8a] dark:text-blue-300 leading-tight ">CamHotel</h2>
                        <p className="text-[10px] uppercase tracking-widest text-[#757682] dark:text-slate-500 font-bold">Admin
                            Terminal</p>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-1">
                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">dashboard</span>
                        <span>Dashboard</span>
                    </a>

                    {/* Active Tab: Bookings */}
                    <a className="flex items-center gap-3 px-4 py-3 bg-[#dce1ff]/50 dark:bg-blue-900/30 text-[#00236f] dark:text-blue-300 rounded-lg font-bold border-r-4 border-[#00236f] dark:border-blue-500 transition-all ease-in-out duration-200  text-sm"
                       href="#">
                        <span className="material-symbols-outlined align-middle"
                              style={{fontVariationSettings: "'FILL' 1"}}>calendar_month</span>
                        <span>Bookings</span>
                    </a>

                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">bed</span>
                        <span>Rooms</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">group</span>
                        <span>Guests</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">analytics</span>
                        <span>Analytics</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">campaign</span>
                        <span>Marketing</span>
                    </a>
                </nav>

                <div className="mt-auto pt-4 border-t border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col gap-1">
                    <a className="flex items-center gap-3 px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-300 hover:bg-[#e9e7ef]/50 dark:hover:bg-slate-800/50 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">contact_support</span>
                        <span>Support</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-[#ba1a1a] dark:text-red-400 hover:bg-[#ffdad6]/40 dark:hover:bg-red-900/20 rounded-lg transition-all ease-in-out duration-200  text-sm font-semibold"
                       href="#">
                        <span className="material-symbols-outlined align-middle">logout</span>
                        <span>Sign Out</span>
                    </a>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col w-full lg:ml-64 h-screen overflow-hidden">
                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-y-auto w-full">
                    <div className="p-4 md:p-8 max-w-400 mx-auto">

                        {/* Page Header Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <nav
                                    className="flex gap-2 text-xs text-[#757682] dark:text-slate-400 font-semibold mb-2 tracking-wider">
                                    <span>ADMIN</span>
                                    <span
                                        className="material-symbols-outlined text-[12px] align-middle mt-0.5">chevron_right</span>
                                    <span className="text-[#4059aa] dark:text-blue-400">RESERVATIONS</span>
                                </nav>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-[#00236f] dark:text-blue-300 tracking-tight ">Bookings
                                    Management</h1>
                                <p className="text-[#757682] dark:text-slate-400 mt-1 text-sm font-medium">Oversee and
                                    manage guest reservations across all properties.</p>
                            </div>
                            <button
                                className="bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-600 dark:to-blue-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#00236f]/20 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all w-full md:w-auto">
                                <span className="material-symbols-outlined text-[20px] align-middle">add_circle</span>
                                Quick Booking
                            </button>
                        </div>

                        {/* Dashboard Stats Quick View */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 md:mb-10">
                            <div
                                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#c5c5d3]/30 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-[10px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Active
                                    Bookings</p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <span
                                        className="text-2xl md:text-3xl font-black text-[#00236f] dark:text-blue-400 ">1,284</span>
                                    <span
                                        className="text-xs font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded border border-transparent dark:border-green-800/50">+12%</span>
                                </div>
                            </div>
                            <div
                                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#c5c5d3]/30 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-[10px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Check-ins
                                    Today</p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <span
                                        className="text-2xl md:text-3xl font-black text-[#00236f] dark:text-blue-400 ">24</span>
                                    <span
                                        className="text-xs font-bold text-[#757682] dark:text-slate-300 bg-[#f4f3fa] dark:bg-slate-800 px-2 py-0.5 rounded border border-transparent dark:border-slate-700">Target: 30</span>
                                </div>
                            </div>
                            <div
                                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#c5c5d3]/30 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-[10px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Pending
                                    Approval</p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <span
                                        className="text-2xl md:text-3xl font-black text-[#6e2c00] dark:text-amber-500 ">14</span>
                                    <span
                                        className="text-xs font-bold text-[#773205] dark:text-amber-300 bg-[#ffdbcb] dark:bg-amber-900/40 px-2 py-0.5 rounded border border-transparent dark:border-amber-800/50">Action Required</span>
                                </div>
                            </div>
                            <div
                                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#c5c5d3]/30 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-[10px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-widest mb-1">Projected
                                    Revenue</p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <span
                                        className="text-2xl md:text-3xl font-black text-[#00236f] dark:text-blue-400 ">$42,850</span>
                                    <span
                                        className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm align-middle">trending_up</span>
                                </div>
                            </div>
                        </div>

                        {/* Filter & Search Bar */}
                        <div
                            className="bg-[#f4f3fa] dark:bg-slate-900/60 rounded-t-xl p-4 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-4 border border-[#c5c5d3]/30 dark:border-slate-800 border-b-0">
                            <div
                                className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg shadow-sm border border-[#c5c5d3]/50 dark:border-slate-700 w-full md:w-auto overflow-x-auto overflow-y-hidden">
                                <button
                                    className="px-4 py-2 text-xs font-bold rounded-md bg-[#00236f] dark:bg-blue-600 text-white transition-all whitespace-nowrap">All
                                    Bookings
                                </button>
                                <button
                                    className="px-4 py-2 text-xs font-bold rounded-md text-[#757682] dark:text-slate-400 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">Pending
                                </button>
                                <button
                                    className="px-4 py-2 text-xs font-bold rounded-md text-[#757682] dark:text-slate-400 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">Confirmed
                                </button>
                                <button
                                    className="px-4 py-2 text-xs font-bold rounded-md text-[#757682] dark:text-slate-400 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">On-Site
                                </button>
                                <button
                                    className="px-4 py-2 text-xs font-bold rounded-md text-[#757682] dark:text-slate-400 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">Completed
                                </button>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <button
                                    className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 border border-[#c5c5d3]/50 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold text-[#444651] dark:text-slate-300 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">
                                    <span
                                        className="material-symbols-outlined text-[18px] align-middle">filter_list</span>
                                    More Filters
                                </button>
                                <button
                                    className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 border border-[#c5c5d3]/50 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold text-[#444651] dark:text-slate-300 hover:bg-[#f4f3fa] dark:hover:bg-slate-800 transition-all whitespace-nowrap">
                                    <span
                                        className="material-symbols-outlined text-[18px] align-middle">file_download</span>
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* High-Density Data Table */}
                        <div
                            className="bg-white dark:bg-slate-900 rounded-b-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800 overflow-hidden w-full">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead
                                        className="bg-[#f4f3fa]/80 dark:bg-slate-800/80 border-b border-[#e9e7ef] dark:border-slate-700">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider">Booking
                                            ID
                                        </th>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider">Guest
                                            Name
                                        </th>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider text-center">Room</th>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider">Stay
                                            Dates
                                        </th>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 lg:px-6 py-4 text-[11px] font-bold text-[#757682] dark:text-slate-400 uppercase tracking-wider text-right">Total
                                            Amount
                                        </th>
                                        <th className="px-4 lg:px-6 py-4"></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f4f3fa] dark:divide-slate-800/50">

                                    {/* Row 1 */}
                                    <tr className="hover:bg-[#faf8ff] dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-[#00236f] dark:text-blue-400 font-mono">#CH-20942</td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-[#00236f] dark:text-blue-300 font-bold text-xs shrink-0">AM
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Alex
                                                        Mercer</p>
                                                    <p className="text-[10px] text-[#757682] dark:text-slate-400">alex.mercer@email.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-center">
                                            <span
                                                className="text-xs font-bold text-[#444651] dark:text-slate-300 bg-[#e3e1e9] dark:bg-slate-800 px-2 py-1 rounded">Room 402</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <p className="text-sm font-medium text-[#444651] dark:text-slate-300">Oct 12
                                                - Oct 15</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400">3 Nights</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#dce1ff] dark:bg-blue-900/40 text-[#264191] dark:text-blue-300 border border-transparent dark:border-blue-800/50 uppercase tracking-wider">CONFIRMED</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">$1,240.00</p>
                                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">PAID</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#e3e1e9] dark:hover:bg-slate-700 rounded-lg transition-all text-[#757682] dark:text-slate-400">
                                                <span
                                                    className="material-symbols-outlined text-[20px] align-middle">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-[#faf8ff] dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-[#00236f] dark:text-blue-400 font-mono">#CH-20945</td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-[#6e2c00] dark:text-amber-400 font-bold text-xs shrink-0">SK
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Sarah
                                                        Koenig</p>
                                                    <p className="text-[10px] text-[#757682] dark:text-slate-400">s.koenig@media.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-center">
                                            <span
                                                className="text-xs font-bold text-[#444651] dark:text-slate-300 bg-[#e3e1e9] dark:bg-slate-800 px-2 py-1 rounded">Room 215</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <p className="text-sm font-medium text-[#444651] dark:text-slate-300">Oct 14
                                                - Oct 17</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400">3 Nights</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#ffdbcb] dark:bg-amber-900/40 text-[#773205] dark:text-amber-300 border border-transparent dark:border-amber-800/50 uppercase tracking-wider">PENDING</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">$850.00</p>
                                            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">DUE</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#e3e1e9] dark:hover:bg-slate-700 rounded-lg transition-all text-[#757682] dark:text-slate-400">
                                                <span
                                                    className="material-symbols-outlined text-[20px] align-middle">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-[#faf8ff] dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-[#00236f] dark:text-blue-400 font-mono">#CH-20890</td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    alt="Guest"
                                                    className="w-8 h-8 rounded-full object-cover shrink-0"
                                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop"
                                                />
                                                <div>
                                                    <p className="text-sm font-bold text-[#1a1b21] dark:text-white">David
                                                        Chen</p>
                                                    <p className="text-[10px] text-[#757682] dark:text-slate-400">dchen.official@gmail.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-center">
                                            <span
                                                className="text-xs font-bold text-[#444651] dark:text-slate-300 bg-[#e3e1e9] dark:bg-slate-800 px-2 py-1 rounded">Room 901</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <p className="text-sm font-medium text-[#444651] dark:text-slate-300">Oct 10
                                                - Oct 12</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400">2 Nights</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border border-transparent dark:border-green-800/50 uppercase tracking-wider">CHECKED_IN</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">$3,100.00</p>
                                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">PAID</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#e3e1e9] dark:hover:bg-slate-700 rounded-lg transition-all text-[#757682] dark:text-slate-400">
                                                <span
                                                    className="material-symbols-outlined text-[20px] align-middle">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="hover:bg-[#faf8ff] dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-[#00236f] dark:text-blue-400 font-mono">#CH-20875</td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#757682] dark:text-slate-300 font-bold text-xs shrink-0">JW
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#1a1b21] dark:text-white">John
                                                        Wick</p>
                                                    <p className="text-[10px] text-[#757682] dark:text-slate-400">continental.guest@email.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-center">
                                            <span
                                                className="text-xs font-bold text-[#444651] dark:text-slate-300 bg-[#e3e1e9] dark:bg-slate-800 px-2 py-1 rounded">Room 405</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <p className="text-sm font-medium text-[#444651] dark:text-slate-300">Oct 08
                                                - Oct 11</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400">3 Nights</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#e9e7ef] dark:bg-slate-800 text-[#757682] dark:text-slate-300 border border-[#c5c5d3]/50 dark:border-slate-700 uppercase tracking-wider">CHECKED_OUT</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">$1,450.00</p>
                                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">PAID</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#e3e1e9] dark:hover:bg-slate-700 rounded-lg transition-all text-[#757682] dark:text-slate-400">
                                                <span
                                                    className="material-symbols-outlined text-[20px] align-middle">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr className="hover:bg-[#faf8ff] dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-[#00236f] dark:text-blue-400 font-mono">#CH-20811</td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-[#ba1a1a] dark:text-red-400 font-bold text-xs shrink-0">EL
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#1a1b21] dark:text-white">Emma
                                                        Loft</p>
                                                    <p className="text-[10px] text-[#757682] dark:text-slate-400">e.loft@design.net</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-center">
                                            <span
                                                className="text-xs font-bold text-[#444651] dark:text-slate-300 bg-[#e3e1e9] dark:bg-slate-800 px-2 py-1 rounded">Room 102</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <p className="text-sm font-medium text-[#444651] dark:text-slate-300">Oct 15
                                                - Oct 18</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400">3 Nights</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#ffdad6] dark:bg-red-900/40 text-[#93000a] dark:text-red-400 border border-transparent dark:border-red-800/50 uppercase tracking-wider">CANCELLED</span>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <p className="text-sm font-bold text-[#1a1b21] dark:text-white">$0.00</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400 font-bold">REFUNDED</p>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right">
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#e3e1e9] dark:hover:bg-slate-700 rounded-lg transition-all text-[#757682] dark:text-slate-400">
                                                <span
                                                    className="material-symbols-outlined text-[20px] align-middle">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Area */}
                            <div
                                className="p-4 lg:p-6 bg-[#f4f3fa] dark:bg-slate-900/60 border-t border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                                <p className="text-xs font-medium text-[#757682] dark:text-slate-400">Showing <span
                                    className="font-bold text-[#1a1b21] dark:text-white">1 - 5</span> of <span
                                    className="font-bold text-[#1a1b21] dark:text-white">428</span> reservations</p>
                                <div className="flex gap-1 md:gap-2">
                                    <button
                                        className="p-1.5 md:p-2 border border-[#c5c5d3]/50 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50 text-[#757682] dark:text-slate-400"
                                        disabled>
                                        <span
                                            className="material-symbols-outlined text-[18px] align-middle">chevron_left</span>
                                    </button>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00236f] dark:bg-blue-600 text-white text-xs font-bold shadow-sm">1
                                    </button>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#757682] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-[#c5c5d3]/50 dark:hover:border-slate-700 text-xs font-bold transition-all">2
                                    </button>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#757682] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-[#c5c5d3]/50 dark:hover:border-slate-700 text-xs font-bold transition-all">3
                                    </button>
                                    <span
                                        className="flex items-center text-[#757682] dark:text-slate-500 px-1">...</span>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#757682] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-[#c5c5d3]/50 dark:hover:border-slate-700 text-xs font-bold transition-all">24
                                    </button>
                                    <button
                                        className="p-1.5 md:p-2 border border-[#c5c5d3]/50 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-[#757682] dark:text-slate-400">
                                        <span
                                            className="material-symbols-outlined text-[18px] align-middle">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contextual Insights Section */}
                        <div className="mt-8 lg:mt-12 grid grid-cols-1 xl:grid-cols-3 gap-6">

                            <div
                                className="xl:col-span-2 bg-linear-to-r from-[#1e3a8a] to-[#312e81] dark:from-blue-900 dark:to-indigo-950 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-900/10 dark:shadow-none">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold  mb-2 text-white">Weekend Peak
                                        Alert</h3>
                                    <p className="text-blue-200 dark:text-blue-300 text-sm max-w-md mb-6 leading-relaxed">Occupancy
                                        for the upcoming weekend (Oct 20-22) has reached 94%. We recommend increasing
                                        dynamic pricing for the remaining 3 suites.</p>
                                    <div className="flex flex-wrap gap-3 md:gap-4">
                                        <button
                                            className="bg-white text-[#1e3a8a] dark:text-blue-900 px-5 py-2.5 rounded-lg text-xs font-extrabold active:scale-95 transition-all shadow-sm">Adjust
                                            Rates
                                        </button>
                                        <button
                                            className="bg-[#1e3a8a]/50 dark:bg-blue-800/50 backdrop-blur-md text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#1e3a8a] dark:hover:bg-blue-800 transition-all border border-white/10">View
                                            Trends
                                        </button>
                                    </div>
                                </div>
                                {/* Decorative Element */}
                                <div
                                    className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none hidden sm:block">
                                    <span
                                        className="material-symbols-outlined text-[160px] lg:text-[200px] -rotate-12 absolute -right-4 lg:-right-10 -top-4 lg:-top-10 align-middle">bar_chart_4_bars</span>
                                </div>
                            </div>

                            <div
                                className="bg-[#e9e7ef] dark:bg-slate-800/80 rounded-2xl p-6 border border-[#c5c5d3]/30 dark:border-slate-700 shadow-sm">
                                <h3 className="text-sm font-bold  text-[#00236f] dark:text-blue-300 mb-4 flex items-center justify-between">
                                    Recent Logs
                                    <span className="material-symbols-outlined text-[16px] align-middle">history</span>
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full bg-[#00236f] dark:bg-blue-400 mt-1.5 shrink-0"></div>
                                        <div>
                                            <p className="text-xs font-bold text-[#1a1b21] dark:text-white">#CH-20942
                                                status updated</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400 mt-0.5">Confirmed
                                                by Receptionist Jane • 5m ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] dark:bg-red-500 mt-1.5 shrink-0"></div>
                                        <div>
                                            <p className="text-xs font-bold text-[#1a1b21] dark:text-white">Cancellation
                                                Request</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400 mt-0.5">Booking
                                                #CH-20811 processed • 1h ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 mt-1.5 shrink-0"></div>
                                        <div>
                                            <p className="text-xs font-bold text-[#1a1b21] dark:text-white">New
                                                Reservation</p>
                                            <p className="text-[10px] text-[#757682] dark:text-slate-400 mt-0.5">Penthouse
                                                Booked by David Chen • 3h ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}