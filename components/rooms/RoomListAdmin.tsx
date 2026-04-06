import React from 'react';

export default function RoomListAdmin() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased transition-colors duration-300 flex">

            {/* SideNavBar - Hidden on mobile/tablet */}
            <aside
                className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-[#c5c5d3]/30 dark:border-slate-800 bg-[#f4f3fa] dark:bg-slate-950 pt-6 pb-6 z-40 transition-colors duration-300">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl bg-[#1e3a8a] dark:bg-blue-900 flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined align-middle"
                              style={{fontVariationSettings: "'FILL' 1"}}>hotel</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-[#00236f] dark:text-blue-300 leading-none ">CamHotel</h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-500 mt-1">Premium
                            Mgmt</p>
                    </div>
                </div>

                <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">dashboard</span>
                        <span className=" text-sm font-semibold">Dashboard</span>
                    </a>
                    <a className="flex items-center px-4 py-3 bg-white dark:bg-slate-900 text-[#00236f] dark:text-blue-300 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg my-1 mx-2 transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle"
                              style={{fontVariationSettings: "'FILL' 1"}}>bed</span>
                        <span className=" text-sm font-bold">Rooms</span>
                    </a>
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">category</span>
                        <span className=" text-sm font-semibold">Room Types</span>
                    </a>
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">event_available</span>
                        <span className=" text-sm font-semibold">Bookings</span>
                    </a>
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">payments</span>
                        <span className=" text-sm font-semibold">Payments</span>
                    </a>
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-transform duration-200 hover:translate-x-1"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">group</span>
                        <span className=" text-sm font-semibold">Users</span>
                    </a>
                </nav>

                <div className="mt-auto px-4 space-y-1 pt-4">
                    <a className="flex items-center px-4 py-3 text-[#555d7e] dark:text-slate-400 hover:bg-[#e9e7ef] dark:hover:bg-slate-800/80 rounded-lg transition-all"
                       href="#">
                        <span className="material-symbols-outlined mr-3 align-middle">settings</span>
                        <span className=" text-sm font-semibold">Settings</span>
                    </a>
                    <div className="pt-4 mt-4 border-t border-[#c5c5d3]/30 dark:border-slate-800">
                        <a className="flex items-center px-4 py-3 text-[#ba1a1a] dark:text-red-400 hover:bg-[#ffdad6]/50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                           href="#">
                            <span className="material-symbols-outlined mr-3 align-middle">logout</span>
                            <span className=" text-sm font-semibold">Logout</span>
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full lg:ml-64 min-h-screen flex flex-col">
                {/* Canvas */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10 w-full overflow-hidden">

                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#00236f] dark:text-blue-300 px-2 py-0.5 bg-[#dce1ff] dark:bg-blue-900/50 rounded border border-transparent dark:border-blue-800/50">Inventory</span>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-500">/ Rooms List</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b21] dark:text-white tracking-tight ">Room
                                Management</h2>
                            <p className="text-[#757682] dark:text-slate-400 text-sm max-w-md">Overview of all physical
                                inventory including real-time status updates and maintenance schedules.</p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
                            <button
                                className="flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-[#c5c5d3]/50 dark:border-slate-700 text-[#444651] dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-[#f4f3fa] dark:hover:bg-slate-700 transition-colors whitespace-nowrap flex">
                                <span className="material-symbols-outlined text-lg align-middle">filter_list</span>
                                Filters
                            </button>
                            <button
                                className="flex-1 sm:flex-none justify-center items-center gap-2 px-4 md:px-6 py-2.5 bg-[#00236f] dark:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-[#00236f]/20 dark:shadow-none hover:-translate-y-0.5 transition-all whitespace-nowrap flex">
                                <span className="material-symbols-outlined text-lg align-middle">add_circle</span>
                                Add Room
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Bento Grid & Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* Filters Card */}
                        <div
                            className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row flex-wrap items-center gap-4 md:gap-6 shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                            <div className="w-full sm:flex-1 sm:min-w-[200px]">
                                <label
                                    className="block text-[10px] font-bold uppercase tracking-wider text-[#757682] dark:text-slate-500 mb-2 px-1">Search
                                    Identifier</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-[#f4f3fa] dark:bg-slate-800 border-none rounded-xl py-3 pl-4 text-sm focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white transition-shadow shadow-sm outline-none placeholder-[#757682] dark:placeholder-slate-500"
                                        placeholder="Room # or wing..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:w-auto sm:min-w-[160px]">
                                <label
                                    className="block text-[10px] font-bold uppercase tracking-wider text-[#757682] dark:text-slate-500 mb-2 px-1">Room
                                    Status</label>
                                <select
                                    className="w-full bg-[#f4f3fa] dark:bg-slate-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white shadow-sm appearance-none outline-none cursor-pointer">
                                    <option>All Statuses</option>
                                    <option>AVAILABLE</option>
                                    <option>OCCUPIED</option>
                                    <option>MAINTENANCE</option>
                                </select>
                            </div>
                            <div className="w-full sm:w-auto sm:min-w-[160px]">
                                <label
                                    className="block text-[10px] font-bold uppercase tracking-wider text-[#757682] dark:text-slate-500 mb-2 px-1">Room
                                    Type</label>
                                <select
                                    className="w-full bg-[#f4f3fa] dark:bg-slate-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white shadow-sm appearance-none outline-none cursor-pointer">
                                    <option>All Types</option>
                                    <option>Deluxe Suite</option>
                                    <option>Executive King</option>
                                    <option>Standard Twin</option>
                                    <option>Presidential</option>
                                </select>
                            </div>
                            <div className="w-full sm:w-auto flex items-end h-full self-end sm:mb-1">
                                <button
                                    className="w-full sm:w-auto p-3 bg-[#1e3a8a] dark:bg-blue-600 text-white rounded-xl shadow-md hover:opacity-90 flex justify-center items-center">
                                    <span className="material-symbols-outlined align-middle">search</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Data Table Container */}
                        <div
                            className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800 overflow-hidden w-full">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                    <tr className="bg-[#f4f3fa] dark:bg-slate-800/80 border-b border-[#e9e7ef] dark:border-slate-700">
                                        <th className="px-4 md:px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Room
                                            Info
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Room
                                            Type
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Real-time
                                            Status
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Rate/Night</th>
                                        <th className="px-4 md:px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f4f3fa] dark:divide-slate-800">

                                    {/* Row 1 */}
                                    <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg bg-[#dce1ff] dark:bg-blue-900/40 flex items-center justify-center font-bold text-[#00236f] dark:text-blue-300 shrink-0">101
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1a1b21] dark:text-slate-200">Floor 1,
                                                        West Wing</p>
                                                    <p className="text-xs text-[#757682] dark:text-slate-400">Last
                                                        cleaned: 2h ago</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span
                                                className="px-2.5 py-1 bg-[#eeedf4] dark:bg-slate-800 rounded-md text-xs font-semibold text-[#444651] dark:text-slate-300">Deluxe Suite</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dce1ff] dark:bg-blue-900/30 text-[#264191] dark:text-blue-300 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-[#1e3a8a]/10 dark:border-blue-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] dark:bg-blue-400"></span>
                          AVAILABLE
                        </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-sm font-bold text-[#1a1b21] dark:text-slate-200">$240.00</span>
                                                <span className="text-[10px] text-[#757682] dark:text-slate-400">Inc. Breakfast</span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                            <div
                                                className="flex justify-end gap-1 md:gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-300 hover:bg-[#dce1ff] dark:hover:bg-blue-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">edit</span>
                                                </button>
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400 hover:bg-[#ffdad6] dark:hover:bg-red-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg bg-[#e9e7ef] dark:bg-slate-800 flex items-center justify-center font-bold text-[#444651] dark:text-slate-300 shrink-0">204
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1a1b21] dark:text-slate-200">Floor 2,
                                                        East Wing</p>
                                                    <p className="text-xs text-[#757682] dark:text-slate-400">Checkout:
                                                        Today, 11:00 AM</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span
                                                className="px-2.5 py-1 bg-[#eeedf4] dark:bg-slate-800 rounded-md text-xs font-semibold text-[#444651] dark:text-slate-300">Executive King</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbcb] dark:bg-amber-900/30 text-[#773205] dark:text-amber-300 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-[#6e2c00]/10 dark:border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6e2c00] dark:bg-amber-400"></span>
                          OCCUPIED
                        </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-sm font-bold text-[#1a1b21] dark:text-slate-200">$310.00</span>
                                                <span className="text-[10px] text-[#757682] dark:text-slate-400">Corporate Rate</span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                            <div
                                                className="flex justify-end gap-1 md:gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-300 hover:bg-[#dce1ff] dark:hover:bg-blue-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">edit</span>
                                                </button>
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400 hover:bg-[#ffdad6] dark:hover:bg-red-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg bg-[#ffdad6] dark:bg-red-900/40 flex items-center justify-center font-bold text-[#93000a] dark:text-red-300 shrink-0">305
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1a1b21] dark:text-slate-200">Floor 3,
                                                        Penthouse</p>
                                                    <p className="text-xs text-[#757682] dark:text-slate-400">AC Unit
                                                        Repair in progress</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span
                                                className="px-2.5 py-1 bg-[#eeedf4] dark:bg-slate-800 rounded-md text-xs font-semibold text-[#444651] dark:text-slate-300">Presidential</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdad6] dark:bg-red-900/30 text-[#93000a] dark:text-red-300 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-[#ba1a1a]/10 dark:border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] dark:bg-red-500"></span>
                          MAINTENANCE
                        </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-sm font-bold text-[#1a1b21] dark:text-slate-200">$850.00</span>
                                                <span
                                                    className="text-[10px] text-[#757682] dark:text-slate-400">Blocked</span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                            <div
                                                className="flex justify-end gap-1 md:gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-300 hover:bg-[#dce1ff] dark:hover:bg-blue-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">edit</span>
                                                </button>
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400 hover:bg-[#ffdad6] dark:hover:bg-red-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="hover:bg-[#f4f3fa] dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg bg-[#dce1ff] dark:bg-blue-900/40 flex items-center justify-center font-bold text-[#00236f] dark:text-blue-300 shrink-0">102
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1a1b21] dark:text-slate-200">Floor 1,
                                                        West Wing</p>
                                                    <p className="text-xs text-[#757682] dark:text-slate-400">Ready for
                                                        inspection</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span
                                                className="px-2.5 py-1 bg-[#eeedf4] dark:bg-slate-800 rounded-md text-xs font-semibold text-[#444651] dark:text-slate-300">Standard Twin</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dce1ff] dark:bg-blue-900/30 text-[#264191] dark:text-blue-300 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-[#1e3a8a]/10 dark:border-blue-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] dark:bg-blue-400"></span>
                          AVAILABLE
                        </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-sm font-bold text-[#1a1b21] dark:text-slate-200">$185.00</span>
                                                <span className="text-[10px] text-[#757682] dark:text-slate-400">Base Price</span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                            <div
                                                className="flex justify-end gap-1 md:gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#00236f] dark:hover:text-blue-300 hover:bg-[#dce1ff] dark:hover:bg-blue-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">edit</span>
                                                </button>
                                                <button
                                                    className="p-2 text-[#757682] dark:text-slate-400 hover:text-[#ba1a1a] dark:hover:text-red-400 hover:bg-[#ffdad6] dark:hover:bg-red-900/30 rounded-lg transition-all">
                                                    <span
                                                        className="material-symbols-outlined text-lg align-middle">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div
                                className="bg-[#f4f3fa]/50 dark:bg-slate-800/30 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-[#c5c5d3]/30 dark:border-slate-800 gap-4 sm:gap-0">
                                <p className="text-xs text-[#757682] dark:text-slate-400 font-medium text-center sm:text-left">
                                    Showing <span className="text-[#1a1b21] dark:text-slate-200">4</span> of <span
                                    className="text-[#1a1b21] dark:text-slate-200">128</span> rooms
                                </p>
                                <div className="flex items-center gap-1 md:gap-2">
                                    <button
                                        className="p-1 md:p-2 text-[#757682] dark:text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-30"
                                        disabled>
                                        <span className="material-symbols-outlined align-middle">chevron_left</span>
                                    </button>
                                    <div className="flex gap-1">
                                        <button
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#00236f] dark:bg-blue-600 text-white text-xs font-bold">1
                                        </button>
                                        <button
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-[#444651] dark:text-slate-300 text-xs font-bold transition-colors">2
                                        </button>
                                        <button
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-[#444651] dark:text-slate-300 text-xs font-bold transition-colors">3
                                        </button>
                                        <span
                                            className="px-1 md:px-2 py-1 md:py-2 text-[#757682] dark:text-slate-500">...</span>
                                        <button
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-[#444651] dark:text-slate-300 text-xs font-bold transition-colors">32
                                        </button>
                                    </div>
                                    <button
                                        className="p-1 md:p-2 text-[#757682] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined align-middle">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Summary Info */}
                        <div
                            className="lg:col-span-1 bg-gradient-to-br from-[#1e3a8a] to-[#00236f] dark:from-blue-800 dark:to-blue-950 p-6 rounded-2xl text-white shadow-xl shadow-[#00236f]/10 dark:shadow-none w-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                                    <span className="material-symbols-outlined align-middle"
                                          style={{fontVariationSettings: "'FILL' 1"}}>bed</span>
                                </div>
                                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Inventory Health</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Total
                                Availability</p>
                            <p className="text-4xl font-extrabold  mb-4">84%</p>
                            <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
                                <div
                                    className="bg-white h-full rounded-full w-[84%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                            <p className="text-xs opacity-80 leading-relaxed">21 rooms pending turnover. Efficiency
                                increased by 4% since last shift.</p>
                        </div>

                        {/* Mini Stat Cards */}
                        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
                            <div
                                className="bg-[#f4f3fa] dark:bg-slate-900 p-6 rounded-2xl border border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Available</span>
                                    <p className="text-2xl font-black text-[#00236f] dark:text-blue-400 mt-1">108</p>
                                </div>
                                <div
                                    className="mt-4 flex items-center gap-1 text-[10px] text-[#1e3a8a] dark:text-blue-300 font-bold">
                                    <span className="material-symbols-outlined text-sm align-middle">trending_up</span>
                                    +12 from yesterday
                                </div>
                            </div>
                            <div
                                className="bg-[#f4f3fa] dark:bg-slate-900 p-6 rounded-2xl border border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Occupied</span>
                                    <p className="text-2xl font-black text-[#4b1c00] dark:text-amber-500 mt-1">14</p>
                                </div>
                                <div
                                    className="mt-4 flex items-center gap-1 text-[10px] text-[#4b1c00] dark:text-amber-400 font-bold">
                                    <span className="material-symbols-outlined text-sm align-middle">group</span>
                                    6 VIP guests
                                </div>
                            </div>
                            <div
                                className="bg-[#f4f3fa] dark:bg-slate-900 p-6 rounded-2xl border border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#757682] dark:text-slate-400">Maintenance</span>
                                    <p className="text-2xl font-black text-[#ba1a1a] dark:text-red-500 mt-1">06</p>
                                </div>
                                <div
                                    className="mt-4 flex items-center gap-1 text-[10px] text-[#ba1a1a] dark:text-red-400 font-bold">
                                    <span className="material-symbols-outlined text-sm align-middle">engineering</span>
                                    2 Critical repairs
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Support Center Floating Button */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
                <button
                    className="group flex items-center gap-3 bg-white dark:bg-slate-900 shadow-xl dark:shadow-none shadow-[#00236f]/20 p-2 pr-4 md:pr-6 rounded-full border border-[#c5c5d3]/50 dark:border-slate-700 hover:scale-105 transition-all">
                    <div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00236f] dark:bg-blue-600 flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-sm align-middle">support_agent</span>
                    </div>
                    <span className=" text-xs md:text-sm font-bold text-[#00236f] dark:text-blue-300">Support Center</span>
                </button>
            </div>

        </div>
    );
}