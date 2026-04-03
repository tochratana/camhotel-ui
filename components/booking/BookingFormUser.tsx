import React from 'react';
import Image from "next/image";

export default function BookingFormUser() {
    return (
        <div
            className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">

                {/* Page Header */}
                <div className="mb-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#00236f] dark:text-blue-300 tracking-tight mb-4 font-['Manrope']">
                        Book Your Stay
                    </h1>
                    <p className="text-[#444651] dark:text-slate-300 max-w-2xl text-lg leading-relaxed">
                        Experience architectural luxury and curated hospitality. Please provide your details below to
                        finalize your reservation at CamHotel.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Main Form Section */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Section 1: Personal Information */}
                        <section
                            className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                            <div className="flex items-center space-x-4 mb-8">
                                <div
                                    className="w-10 h-10 rounded-full bg-[#dce1ff] dark:bg-blue-900/50 flex items-center justify-center text-[#00164e] dark:text-blue-200 font-bold shrink-0">1
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a1b21] dark:text-white font-['Manrope']">Personal
                                    Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Full
                                        Name</label>
                                    <input
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all placeholder:text-[#757682] dark:placeholder:text-slate-500 outline-none"
                                        placeholder="Johnathan Doe"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Email
                                        Address</label>
                                    <input
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all placeholder:text-[#757682] dark:placeholder:text-slate-500 outline-none"
                                        placeholder="j.doe@example.com"
                                        type="email"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2 md:col-span-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Phone
                                        Number</label>
                                    <input
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all placeholder:text-[#757682] dark:placeholder:text-slate-500 outline-none"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Stay Details */}
                        <section
                            className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                            <div className="flex items-center space-x-4 mb-8">
                                <div
                                    className="w-10 h-10 rounded-full bg-[#dce1ff] dark:bg-blue-900/50 flex items-center justify-center text-[#00164e] dark:text-blue-200 font-bold shrink-0">2
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a1b21] dark:text-white font-['Manrope']">Stay
                                    Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Check-in
                                        Date</label>
                                    <input
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all outline-none scheme-light dark:scheme-dark"
                                        type="date"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Check-out
                                        Date</label>
                                    <input
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all outline-none scheme-light dark:scheme-dark"
                                        type="date"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Number
                                        of Guests</label>
                                    <select
                                        defaultValue="2 Guests"
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all outline-none cursor-pointer"
                                    >
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4+ Guests</option>
                                    </select>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Room
                                        Selection</label>
                                    <select
                                        defaultValue="Executive Suite"
                                        className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all outline-none cursor-pointer"
                                    >
                                        <option>Deluxe City View</option>
                                        <option>Executive Suite</option>
                                        <option>Penthouse Sanctuary</option>
                                        <option>Garden Villa</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Additional Requests */}
                        <section
                            className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800">
                            <div className="flex items-center space-x-4 mb-8">
                                <div
                                    className="w-10 h-10 rounded-full bg-[#dce1ff] dark:bg-blue-900/50 flex items-center justify-center text-[#00164e] dark:text-blue-200 font-bold shrink-0">3
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a1b21] dark:text-white font-['Manrope']">Special
                                    Requests</h2>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label
                                    className="text-xs font-bold uppercase tracking-widest text-[#444651] dark:text-slate-400 ml-1">Preferences
                                    & Notes</label>
                                <textarea
                                    className="w-full bg-[#e3e1e9] dark:bg-slate-800 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-[#4059aa] dark:focus:border-blue-400 text-[#1a1b21] dark:text-white transition-all placeholder:text-[#757682] dark:placeholder:text-slate-500 outline-none resize-y"
                                    placeholder="e.g. Early check-in, dietary restrictions, or anniversary arrangements..."
                                    rows={4}
                                />
                            </div>
                        </section>

                        {/* CTA */}
                        <div className="flex justify-end pt-4">
                            <button
                                className="w-full md:w-auto bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-600 dark:to-blue-800 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center space-x-3">
                                <span>Proceed to Confirmation</span>
                                <span className="material-symbols-outlined align-middle">arrow_forward</span>
                            </button>
                        </div>

                    </div>

                    {/* Sidebar Booking Summary */}
                    <aside className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-32">
                        <div
                            className="bg-[#f4f3fa] dark:bg-slate-900/80 rounded-xl overflow-hidden shadow-sm border border-transparent dark:border-slate-800">

                            {/* Image Header for Summary */}
                            <div className="h-48 w-full relative">
                                <Image
                                    alt="Executive Suite"
                                    width={100}
                                    height={400}
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
                                />
                                <div className="absolute bottom-4 left-4">
                  <span
                      className="bg-[#1e3a8a]/90 dark:bg-blue-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest shadow-sm">
                    Executive Suite
                  </span>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-6">
                                <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white font-['Manrope']">Booking
                                    Summary</h3>
                                <div className="space-y-4">
                                    <div
                                        className="flex justify-between items-center py-2 border-b border-[#e9e7ef] dark:border-slate-700/50">
                                        <span className="text-[#444651] dark:text-slate-400 font-medium">Room Rate (3 nights)</span>
                                        <span
                                            className="text-[#1a1b21] dark:text-slate-200 font-semibold">$1,455.00</span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b border-[#e9e7ef] dark:border-slate-700/50">
                                        <span
                                            className="text-[#444651] dark:text-slate-400 font-medium">Service Fees</span>
                                        <span className="text-[#1a1b21] dark:text-slate-200 font-semibold">$85.00</span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center py-2 border-b border-[#e9e7ef] dark:border-slate-700/50">
                                        <span
                                            className="text-[#444651] dark:text-slate-400 font-medium">Taxes (12%)</span>
                                        <span
                                            className="text-[#1a1b21] dark:text-slate-200 font-semibold">$184.80</span>
                                    </div>
                                </div>

                                <div
                                    className="bg-white dark:bg-slate-800 p-5 rounded-xl flex justify-between items-center shadow-sm border border-[#c5c5d3]/20 dark:border-slate-700">
                                    <div>
                                        <p className="text-[0.65rem] font-bold uppercase tracking-tighter text-[#757682] dark:text-slate-400 mb-1">Total
                                            Amount</p>
                                        <p className="text-2xl md:text-3xl font-extrabold text-[#00236f] dark:text-blue-400 tracking-tight font-['Manrope']">$1,724.80</p>
                                    </div>
                                    <span
                                        className="material-symbols-outlined text-[#1e3a8a] dark:text-blue-500 text-4xl align-middle">payments</span>
                                </div>

                                <div
                                    className="flex items-start space-x-3 text-sm text-[#444651] dark:text-slate-400 leading-relaxed">
                                    <span
                                        className="material-symbols-outlined text-[#4059aa] dark:text-blue-400 shrink-0 text-[18px] align-middle mt-0.5">info</span>
                                    <p>Free cancellation until 48 hours prior to arrival. All amenities and breakfast
                                        included.</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex justify-center items-center space-x-8 opacity-60 dark:opacity-40">
                            <div className="flex flex-col items-center">
                                <span
                                    className="material-symbols-outlined text-2xl text-[#1a1b21] dark:text-white">verified_user</span>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#1a1b21] dark:text-white">Secure Pay</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span
                                    className="material-symbols-outlined text-2xl text-[#1a1b21] dark:text-white">support_agent</span>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#1a1b21] dark:text-white">24/7 Concierge</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span
                                    className="material-symbols-outlined text-2xl text-[#1a1b21] dark:text-white">eco</span>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#1a1b21] dark:text-white">Green Stay</span>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}