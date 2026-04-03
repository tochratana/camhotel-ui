import React from 'react';
import Image from "next/image";

export default function RoomListUser() {
    return (
        <div className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
            <div className="pt-24 pb-20">

                {/* Hero Header */}
                <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-[#d0d8ff] text-[#00164e] dark:bg-blue-900/50 dark:text-blue-200 rounded-full">
            Explore Accommodations
          </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#00236f] dark:text-blue-300 tracking-tight mb-6">
                        Our Sanctuaries
                    </h1>
                    <p className="max-w-2xl text-[#444651] dark:text-slate-300 text-lg leading-relaxed">
                        Discover a curated collection of spaces designed for rest, productivity, and inspiration. From cozy singles to expansive penthouses.
                    </p>
                </section>

                {/* Search & Filter Bar */}
                <section className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-[#c5c5d3]/30 dark:border-slate-800 flex flex-col lg:flex-row items-center gap-4">
                        <div className="relative w-full lg:flex-1">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757682] dark:text-slate-400">search</span>
                            <input
                                className="w-full pl-12 pr-4 py-4 bg-[#f4f3fa] dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white transition-all placeholder:text-[#757682]/60 dark:placeholder:text-slate-500 outline-none"
                                placeholder="Search by name or keyword..."
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative w-full md:w-48">
                                <select className="w-full appearance-none px-4 py-4 bg-[#f4f3fa] dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white font-medium cursor-pointer outline-none">
                                    <option>Room Type</option>
                                    <option>Single</option>
                                    <option>Double</option>
                                    <option>Suite</option>
                                    <option>Penthouse</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#757682] dark:text-slate-400">expand_more</span>
                            </div>

                            <div className="relative w-full md:w-56">
                                <select className="w-full appearance-none px-4 py-4 bg-[#f4f3fa] dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-[#00236f]/20 dark:focus:ring-blue-500/30 text-[#1a1b21] dark:text-white font-medium cursor-pointer outline-none">
                                    <option>Price Range</option>
                                    <option>$100 - $500</option>
                                    <option>$500 - $1000</option>
                                    <option>$1000+</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#757682] dark:text-slate-400">expand_more</span>
                            </div>

                            <button className="w-full md:w-auto px-8 py-4 bg-[#00236f] dark:bg-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:bg-[#1e3a8a] dark:hover:bg-blue-500 transition-all active:scale-95">
                                Find Room
                            </button>
                        </div>
                    </div>
                </section>

                {/* Room Grid */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Room Card 1 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Luxurious modern hotel penthouse"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Penthouse
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 42, Sky Loft</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">4.9</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">Panoramic views and bespoke furnishings for the discerning traveler.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">wifi</span> Wi-Fi</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">liquor</span> Mini Bar</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">king_bed</span> King</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$1,250</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Room Card 2 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Elegant hotel suite"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Executive Suite
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 12, Garden Wing</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">4.7</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">A tranquil escape featuring a private terrace and premium amenities.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">wifi</span> Wi-Fi</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">coffee_maker</span> Nespresso</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">bathtub</span> Spa Bath</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$450</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Room Card 3 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Sophisticated double room"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Double Deluxe
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 3, Urban Classic</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">4.5</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">Modern minimalism meets ultimate comfort for city explorers.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">wifi</span> Wi-Fi</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">tv</span> 4K TV</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">desk</span> Workspace</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$280</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Room Card 4 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Chic single hotel room"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Single Studio
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 5, Solo Haven</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">4.6</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">Intimate and efficient space perfect for solo business travelers.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">wifi</span> Wi-Fi</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">ac_unit</span> Climate</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">bed</span> Twin</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$175</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Room Card 5 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Expansive hotel suite"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Royal Suite
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 40, Crown Suite</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">5.0</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">A palatial experience featuring dedicated butler service and private dining.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">concierge</span> Butler</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">wine_bar</span> Cellar</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">spa</span> Sauna</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$2,400</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Room Card 6 */}
                        <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:border dark:border-slate-800 transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Light-filled hotel room with ocean view"
                                    width={100}
                                    height={400}
                                    src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#00236f] dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                    Ocean Double
                  </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[#1a1b21] dark:text-white group-hover:text-[#00236f] dark:group-hover:text-blue-400 transition-colors">Floor 7, Vista Blue</h3>
                                    <div className="flex items-center text-[#6e2c00] dark:text-amber-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-bold ml-1">4.8</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#444651] dark:text-slate-400 mb-4">Wake up to the sound of waves in our premium coastal-facing room.</p>
                                <div className="flex gap-4 mb-6 flex-wrap">
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">balcony</span> Balcony</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">waves</span> View</div>
                                    <div className="flex items-center text-[#757682] dark:text-slate-400 text-xs"><span className="material-symbols-outlined text-sm mr-1">king_bed</span> King</div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#eeedf4] dark:border-slate-800">
                                    <div>
                                        <span className="text-2xl font-extrabold text-[#00236f] dark:text-blue-300">$390</span>
                                        <span className="text-xs text-[#757682] dark:text-slate-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <button className="px-5 py-2.5 bg-[#e9e7ef] dark:bg-slate-800 text-[#00236f] dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-[#00236f] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>

                    </div>
                </section>

                {/* Pagination */}
                <section className="max-w-7xl mx-auto px-6 mt-16 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c5c5d3] dark:border-slate-700 text-[#1a1b21] dark:text-slate-300 hover:bg-[#e9e7ef] dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00236f] dark:bg-blue-600 text-white font-bold shadow-md">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1a1b21] dark:text-slate-300 hover:bg-[#e9e7ef] dark:hover:bg-slate-800 transition-colors">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1a1b21] dark:text-slate-300 hover:bg-[#e9e7ef] dark:hover:bg-slate-800 transition-colors">3</button>
                        <span className="px-2 text-[#757682] dark:text-slate-500">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1a1b21] dark:text-slate-300 hover:bg-[#e9e7ef] dark:hover:bg-slate-800 transition-colors">12</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c5c5d3] dark:border-slate-700 text-[#1a1b21] dark:text-slate-300 hover:bg-[#e9e7ef] dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </nav>
                </section>

            </div>
        </div>
    );
}