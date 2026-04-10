import React from 'react';
import Image from "next/image";
import { LucideArrowRight, LucideDraftingCompass, LucidePencil } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-[#faf8ff] text-[#1a1b21] dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">

            <div className="pt-20">
                <section className="relative h-[60vh] md:h-204.75 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            className="w-full h-full object-cover"
                            alt="Stunning architectural interior of a luxury hotel lobby"
                            width={100}
                            height={400}
                            unoptimized={true}
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-[#00236f]/30 backdrop-brightness-75 dark:bg-slate-900/50"></div>
                    </div>
                    <div className="relative z-10 text-center max-w-4xl px-6">
                        <p className="uppercase tracking-[0.2em] text-white/80 mb-4 text-sm font-bold">Est. 1924</p>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tighter">
                            The Architectural Curator
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                            Where historic grandeur meets a curated modern perspective. Discover the story behind CamHotel.
                        </p>
                    </div>
                </section>

                {/* Our Heritage Section */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-[#faf8ff] dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="text-[#6e2c00] dark:text-[#f39461] text-sm font-bold uppercase tracking-widest">Our Heritage</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#00236f] dark:text-blue-300 mt-2">A Century of Elegance</h2>
                            </div>
                            <div className="space-y-6 text-[#444651] dark:text-slate-300 leading-relaxed">
                                <p>
                                    Founded in 1924, the CamHotel building began as a civic landmark designed by the renowned architects of the &#34;Gilded Age&#34;. Its Neo-Classical façade served as a beacon of progress and sophistication for decades.
                                </p>
                                <p>
                                    In 2018, we undertook a meticulous four-year restoration, preserving the original limestone detailing and soaring coffered ceilings while integrating a bespoke structural framework that defines modern hospitality.
                                </p>
                            </div>
                            <div className="pt-4">
                                <div className="flex items-center space-x-4 border-l-4 border-[#1e3a8a] dark:border-blue-400 pl-6 py-2">
                                    <span className="text-3xl md:text-4xl font-bold text-[#00236f] dark:text-blue-300">100+</span>
                                    <span className="uppercase tracking-wider text-[#444651] dark:text-slate-300 text-sm">Years of <br />Shared History</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 relative">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Image
                                    className="rounded-xl shadow-lg sm:mt-12 h-64 sm:h-96 w-full object-cover"
                                    alt="Vintage hotel facade"
                                    width={100}
                                    height={400}
                                    unoptimized={true}
                                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1964&auto=format&fit=crop"
                                />
                                <Image
                                    className="rounded-xl shadow-lg h-64 sm:h-96 w-full object-cover hidden sm:block"
                                    alt="Classical stonework"
                                    width={100}
                                    height={400}
                                    unoptimized={true}
                                    src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl hidden lg:block max-w-xs border border-slate-100 dark:border-slate-700">
                                <p className="text-[#444651] dark:text-slate-300 italic text-sm">
                                    &#34;We didn&#39;t just renovate a building; we awakened a sleeping giant of architectural history.&#34;
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Philosophy Section (Bento Grid) */}
                <section className="py-16 md:py-24 bg-[#f4f3fa] dark:bg-slate-900 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span className="text-[#6e2c00] dark:text-[#f39461] text-sm font-bold uppercase tracking-widest">Our Philosophy</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#00236f] dark:text-blue-300 mt-2">Curating the Unforgettable</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Bento Item 1 */}
                            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 md:p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-[#1e3a8a] dark:text-blue-400 text-4xl mb-6 block">
                                        <LucideDraftingCompass size={48} />
                                    </span>
                                    <h3 className="text-2xl font-bold text-[#00236f] dark:text-blue-300 mb-4">Intentional Space</h3>
                                    <p className="text-[#444651] dark:text-slate-300 leading-relaxed">
                                        Every piece of furniture, every lighting fixture, and every texture has been curated to create a sense of belonging. Our design philosophy rejects the sterile in favor of the soulful, ensuring each guest experience feels uniquely hand-crafted.
                                    </p>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <div className="bg-[#dce1ff] dark:bg-slate-700 p-4 rounded-lg flex-1">
                                        <span className="block font-bold text-[#00164e] dark:text-blue-200">Bespoke Decor</span>
                                        <span className="text-xs text-[#264191] dark:text-blue-300 uppercase">Hand-selected Art</span>
                                    </div>
                                    <div className="bg-[#dce1ff] dark:bg-slate-700 p-4 rounded-lg flex-1">
                                        <span className="block font-bold text-[#111a37] dark:text-blue-200">Natural Light</span>
                                        <span className="text-xs text-[#3d4565] dark:text-blue-300 uppercase">Optimized Flow</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bento Item 2 */}
                            <div className="bg-linear-to-br from-[#1e3a8a] to-[#00236f] dark:from-blue-900 dark:to-slate-800 p-8 md:p-10 rounded-xl text-white flex flex-col justify-center relative overflow-hidden">
                                <h3 className="text-2xl font-bold mb-4 relative z-10">The Human Touch</h3>
                                <p className="opacity-90 mb-6 relative z-10">Service is our second language. We anticipate needs through intuitive curation, moving beyond standard concierge services to true lifestyle management.</p>
                                <span className="material-symbols-outlined text-8xl absolute -bottom-4 -right-4 opacity-10">concierge</span>
                            </div>

                            {/* Bento Item 3 */}
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <Image
                                    className="w-full h-48 object-cover rounded-lg mb-6"
                                    alt="Artfully arranged table setting"
                                    width={100}
                                    height={400}
                                    unoptimized={true}
                                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2027&auto=format&fit=crop"
                                />
                                <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300 mb-2">Sensory Detail</h4>
                                <p className="text-[#444651] dark:text-slate-300 text-sm">From custom ambient scents to high-fidelity acoustic damping, we curate for all five senses.</p>
                            </div>

                            {/* Bento Item 4 */}
                            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="order-2 md:order-1">
                                    <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300 mb-2">Sustainable Legacy</h4>
                                    <p className="text-[#444651] dark:text-slate-300 text-sm">Our curation extends to our impact. We prioritize local artisans, zero-waste kitchens, and intelligent energy management systems hidden within our historic bones.</p>
                                </div>
                                <Image
                                    className="w-full h-40 object-cover rounded-lg order-1 md:order-2"
                                    alt="Lush green interior courtyard"
                                    width={100}
                                    height={400}
                                    unoptimized={true}
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Message from Founder */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-white dark:bg-slate-950 overflow-hidden">
                    <div className="max-w-5xl mx-auto relative">
                        <span className="material-symbols-outlined text-9xl md:text-[10rem] absolute -top-12 md:-top-16 -left-6 md:-left-12 opacity-5 dark:opacity-10 text-[#00236f] dark:text-blue-500">format_quote</span>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
                            <div className="w-56 h-56 md:w-80 md:h-80 shrink-0 relative">
                                <Image
                                    className="w-full h-full object-cover rounded-full border-8 border-[#eeedf4] dark:border-slate-800 shadow-2xl"
                                    alt="Portrait of Julian Cambridge"
                                    width={100}
                                    height={400}
                                    unoptimized={true}
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                />
                                <div className="absolute -bottom-2 md:-bottom-4 right-4 bg-[#4b1c00] dark:bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined">
                                        <LucidePencil size={20} />
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-6 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-[#00236f] dark:text-blue-300">A Note from Julian Cambridge</h2>
                                <p className="text-lg md:text-xl text-[#444651] dark:text-slate-300 italic leading-relaxed">
                                    &#34;True luxury isn&#39;t found in what you see, but in what you feel. We created CamHotel to be a gallery of moments—a place where the architecture speaks and the service listens. We are not just hosts; we are curators of your journey.&#34;
                                </p>
                                <div>
                                    <p className="font-bold text-[#00236f] dark:text-blue-400 uppercase tracking-widest text-sm">Founder & Creative Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Vision Section */}
                <section className="py-16 md:py-24 bg-[#00236f] dark:bg-blue-950 text-white px-6">
                    <div className="max-w-7xl mx-auto text-center space-y-12">
                        <div className="max-w-2xl mx-auto">
                            <span className="text-[#90a8ff] text-sm font-bold uppercase tracking-widest">The Vision</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-white">Future of Hospitality</h2>
                            <p className="mt-6 text-[#b6c4ff] leading-relaxed">
                                We are expanding our curation beyond these walls. The future of CamHotel lies in integrating seamless technology with timeless human connection, creating a global network of architectural sanctuaries.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm text-left">
                                <h3 className="text-xl font-bold mb-4 text-white">Global Heritage</h3>
                                <p className="text-sm text-white/70">Expanding to five new historic capitals by 2030, restoring forgotten landmarks to their former glory.</p>
                            </div>
                            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm text-left">
                                <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                                <p className="text-sm text-white/70">Using predictive technology to personalize guest stays before they even check in.</p>
                            </div>
                            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm text-left">
                                <h3 className="text-xl font-bold mb-4 text-white">Curator Academy</h3>
                                <p className="text-sm text-white/70">Training the next generation of hospitality leaders in the art of architectural storytelling.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                            <div className="max-w-xl">
                                <span className="text-[#6e2c00] dark:text-[#f39461] text-sm font-bold uppercase tracking-widest">Our Team</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#00236f] dark:text-blue-300 mt-2">The Hands Behind the Curation</h2>
                            </div>
                            <button className="text-[#00236f] dark:text-blue-400 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                                Join Our Team <span className="material-symbols-outlined">
                                    <LucideArrowRight size={20} />  
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Team Member 1 */}
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl mb-4 h-72 md:h-80">
                                    <Image
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Elena Rossi"
                                        width={100}
                                        height={400}
                                        unoptimized={true}
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                                    />
                                    <div className="absolute inset-0 bg-[#00236f]/80 dark:bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-white text-sm leading-tight">Expert in 19th-century restoration and modern urban planning.</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300">Elena Rossi</h4>
                                <p className="text-[#444651] dark:text-slate-400 text-sm uppercase tracking-wider">Chief Architect</p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl mb-4 h-72 md:h-80">
                                    <Image
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Marcus Vane"
                                        width={100}
                                        height={400}
                                        unoptimized={true}
                                        src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1984&auto=format&fit=crop"
                                    />
                                    <div className="absolute inset-0 bg-[#00236f]/80 dark:bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-white text-sm leading-tight">Curating gastronomic experiences that reflect local history.</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300">Marcus Vane</h4>
                                <p className="text-[#444651] dark:text-slate-400 text-sm uppercase tracking-wider">Culinary Curator</p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl mb-4 h-72 md:h-80">
                                    <Image
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Sarah Chen"
                                        width={100}
                                        height={400}
                                        unoptimized={true}
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                                    />
                                    <div className="absolute inset-0 bg-[#00236f]/80 dark:bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-white text-sm leading-tight">Sourcing unique regional artifacts for every guest suite.</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300">Sarah Chen</h4>
                                <p className="text-[#444651] dark:text-slate-400 text-sm uppercase tracking-wider">Art & Decor Lead</p>
                            </div>

                            {/* Team Member 4 */}
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl mb-4 h-72 md:h-80">
                                    <Image
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="David Thorne"
                                        width={100}
                                        height={400}
                                        unoptimized={true}
                                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop"
                                    />
                                    <div className="absolute inset-0 bg-[#00236f]/80 dark:bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-white text-sm leading-tight">Dedicated to high-precision service and guest advocacy.</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#00236f] dark:text-blue-300">David Thorne</h4>
                                <p className="text-[#444651] dark:text-slate-400 text-sm uppercase tracking-wider">Experience Manager</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>)}
