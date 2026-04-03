import Image from "next/image";

export default function FacilityBlock() {
    return (
        <>
            <div
                className="min-h-screen bg-[#faf8ff] dark:bg-input-bg text-[#1a1b21] dark:text-[#eeedf4] font-sans selection:bg-[#b6c4ff] selection:text-[#00164e] transition-colors duration-300">
                {/* Navigation */}
                <main className="pt-32 pb-16">
                    {/* Hero Section */}
                    <header className="max-w-7xl mx-auto px-8 mb-16 md:mb-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-2xl">
              <span
                  className="text-xs uppercase tracking-[0.2em] text-[#757682] dark:text-[#c5c5d3] mb-4 block font-bold">
                Exquisite Living
              </span>
                                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-[#00236f] dark:text-[#dce1ff] leading-tight">
                                    World-Class <br/> Facilities.
                                </h1>
                            </div>
                            <div className="max-w-xs">
                                <p className="text-[#444651] dark:text-[#c5c5d3] leading-relaxed border-l-2 border-[#d0d8ff] pl-4">
                                    A curated ecosystem of luxury, designed to facilitate your peace of mind and provide
                                    unparalleled comfort.
                                </p>
                            </div>
                        </div>
                    </header>

                    <section className="max-w-7xl mx-auto px-8 space-y-24">
                        {/* 1. Accommodations - Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                            <div
                                className="md:col-span-7 aspect-16/10 md:aspect-video overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
                                <Image
                                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"
                                    className="w-full h-full object-cover"
                                    alt="Room"
                                    width={100}
                                    height={400}
                                />
                            </div>
                            <div className="md:col-span-5 space-y-6">
                                <span
                                    className="text-xs font-bold uppercase tracking-widest text-[#6e2c00] dark:text-[#ffb691]">Accommodations</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1b21] dark:text-white">Luxurious
                                    Sanctuaries</h2>
                                <p className="text-[#444651] dark:text-[#c5c5d3] text-lg">Our rooms feature Italian
                                    marble, custom linens, and smart-room technology.</p>
                                <div className="flex flex-wrap gap-3">
                                    {['king_bed', 'King Size', 'nest_remote_comfort_sensor', 'Smart Controls'].map((text, i) => i % 2 === 0 && (
                                        <div key={text}
                                             className="flex items-center gap-2 bg-[#eeedf4] dark:bg-[#6D7698] px-4 py-2 rounded-lg">
                                            <span
                                                className="material-symbols-outlined text-[#1e3a8a] dark:text-[#b6c4ff]">{text}</span>
                                            <span
                                                className="text-sm font-medium">{['King Size', 'Smart Controls'][i / 2]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Infinity Pool - Full Width Card */}
                        <div className="relative rounded-3xl overflow-hidden h-112.5 md:h-137.5 group shadow-2xl">
                            <Image
                                src="https://arystorephone.com/wp-content/uploads/2024/09/iphone-16-pink.jpg"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt="Pool"
                                width={100}
                                height={400}
                            />
                            <div
                                className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-end md:items-center p-8 md:p-16">
                                <div className="max-w-lg text-white space-y-4">
                                    <span className="text-xs uppercase tracking-widest opacity-70">Leisure</span>
                                    <h2 className="text-4xl md:text-6xl font-bold">Infinity Skyline Pool</h2>
                                    <p className="text-slate-300 text-lg hidden sm:block">Experience the city from above
                                        in our temperature-controlled rooftop pool.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
                            <div className="md:col-span-4 p-8 rounded-xl flex flex-col justify-center bg-card-bg">
                                <span
                                    className="text-xs uppercase tracking-widest text-[#6e2c00] font-bold mb-4">Gastronomy</span>
                                <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">Fine Dining
                                    Excellence</h2>
                                <p className=" leading-relaxed mb-8">
                                    Experience a culinary journey led by world-renowned chefs at our Michelin-starred
                                    restaurant &apos;The Azure&apos;.
                                </p>
                                <button
                                    className="flex items-center gap-2 font-bold hover:translate-x-2 transition-all text-text-card-footer">
                                    Reserve a Table <span className="material-symbols-outlined text-text-card-footer">arrow_forward</span>
                                </button>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-2 gap-4">
                                <div className="rounded-xl overflow-hidden shadow-sm aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600"
                                        alt="Dish"
                                        width={100}
                                        height={400}
                                        className="w-full h-full object-cover"/>
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-sm aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&q=80&w=600"
                                        alt="Restaurant"
                                        width={100}
                                        height={400}
                                        className="w-full h-full object-cover"/>
                                </div>
                            </div>
                        </div>

                        {/* 3. Concierge - 3 Column Grid */}
                        <div
                            className="bg-[#f4f3fa] dark:bg-[#6D7698] rounded-3xl p-10 md:p-16 border border-transparent dark:border-slate-700">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold dark:text-white">Exceptional Service</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                {[
                                    {
                                        icon: 'commute',
                                        title: 'Private Chauffeur',
                                        desc: 'Luxury fleet for your transit.'
                                    },
                                    {
                                        icon: 'event_available',
                                        title: 'Event Planning',
                                        desc: 'Exclusive access to city venues.'
                                    },
                                    {
                                        icon: 'room_service',
                                        title: '24/7 Service',
                                        desc: 'Personalized attention anytime.'
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="text-center group">
                                        <div
                                            className="w-16 h-16 bg-[#dce1ff] dark:bg-[#4059aa] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#00236f] dark:text-white group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                        </div>
                                        <h3 className="font-bold text-xl mb-2 dark:text-white">{item.title}</h3>
                                        <p className="text-sm text-[#444651] dark:text-[#c5c5d3] leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>)
}