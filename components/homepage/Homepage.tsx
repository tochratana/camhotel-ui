import Image from "next/image";
import {ChevronDown, ConciergeBell, Mail, MapPin, Phone, Utensils} from "lucide-react";
import {roomCard} from "@/data/roomCard";
import RoomCard from "@/components/homepage/RoomCard";

export default function Homepage() {
    return (
        <main className="bg-background min-h-screen font-sans selection:bg-[#dce1ff] dark:selection:bg-blue-900/50">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz59i7Cb4S5Pgd5Y4_GeLXk8Ue3HN6sxYdWnkKI0C1CaSnUPVJR17SWDR4KQiGQCGpJB5iEH8wZlpf7hdSQIxnSHoyFRTh-q2MoQ46K2Ad1E-mM27NmYpUKU27eFJbMasZvxc7DP7XPhNdKyluxELTY02cMoPmhUf8SyEpZOPzoGFOAdIdHDRjA9L9B9apEwbNPldjF6d5rxBtaNLVyYImCghrBftSIiNfE11oiFNqWn1ntDVtEwtvh-9UUTVvJ0Ruop8lqTrg1K0"
                        className="w-full h-full object-cover"
                        alt="Lobby"
                        width={100}
                        height={400}
                    />
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Your Premium <span className="text-[#dce1ff]">Stay Awaits</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Experience architectural elegance and curated hospitality at CamHotel. Every detail designed for
                        your ultimate comfort.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#rooms"
                           className="w-full sm:w-auto bg-white dark:bg-blue-500 text-[#00236f] dark:text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#dce1ff] dark:hover:bg-blue-400 transition-colors shadow-xl">
                            Explore Rooms
                        </a>
                        <span className="text-white/80 text-xs tracking-widest uppercase">Login to Book Your Stay</span>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="text-white w-8 h-8"/>
                </div>
            </header>

            {/* About Section */}
            <section id="about" className="py-24 px-8 bg-background">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGKCYAGgmC9djnyY2gXdUFO5mpIrsJE0XKLzZbvxU8z-0S1ddkt_b14rMHw-Ic-FIQreXF69ouPiP9LsJUU97x4kEjElUXXVKXXRdTtKs9Pr3MdhaGy6f7i7exOYZqSolarkTJ8IcNEI-MmAx3Rr6Y21YCTcPzwX9O7Hcwa7fBsiTYP0Q48f0nOiAXhUaxcHyKdudqAjVdyfmRz5CeDN8un29JGoz8XUwZooye0OPBHW-BdCyvQxJDji8x18Z95fn6J7Wl1-_PGB0"
                                className="w-full h-full object-cover" alt="Heritage" width={100} height={100}/>
                        </div>
                        <div
                            className="absolute -bottom-6 -right-6 bg-[#1e3a8a] dark:bg-blue-600 p-8 rounded-xl shadow-xl hidden lg:block">
                            <p className="text-white font-bold text-4xl italic">35+</p>
                            <p className="text-[#dce1ff] dark:text-blue-200 text-xs uppercase tracking-widest">Years of
                                Excellence</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span
                                className="text-[#00236f] dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">Our Heritage</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                A Legacy of <br/>Refined Hospitality
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            Founded on the principles of discretion and architectural beauty, CamHotel has been the
                            sanctuary for discerning travelers for over three decades.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div className="space-y-2">
                                <ConciergeBell className="text-[#00236f] dark:text-blue-400 w-8 h-8"/>
                                <h4 className="font-bold text-slate-900 dark:text-white">Bespoke Concierge</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Personalized attention to your
                                    every request,
                                    24/7.</p>
                            </div>
                            <div className="space-y-2">
                                <Utensils className="text-[#00236f] dark:text-blue-400 w-8 h-8"/>
                                <h4 className="font-bold text-slate-900 dark:text-white">Fine Dining</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">World-class culinary
                                    experiences crafted by master
                                    chefs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rooms Section */}
            <section id="rooms" className="py-24 px-8 bg-section-alt-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <span
                                className="text-[#4b1c00] dark:text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">Accommodations</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">Curated
                                Sanctuaries</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm italic">Booking available after
                            login</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                            roomCard.map((item, index) => (
                                <RoomCard
                                    key={index}
                                    title={item.title}
                                    tag={item.tag}
                                    image={item.image}
                                    description={item.description}
                                    isVip={item.isVip}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-8 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="bg-card-bg rounded-2xl shadow-sm dark:shadow-[#0c0e1a]/50 flex flex-col lg:flex-row overflow-hidden border border-card-border">
                        <div className="lg:w-1/3 bg-[#1e3a8a] dark:bg-blue-800 p-12 text-white">
                            <h2 className="font-extrabold text-3xl mb-8">Get in Touch</h2>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-[#dce1ff] dark:text-blue-300"/>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-widest uppercase mb-1">Location</h4>
                                        <p className="text-sm text-white/80">1224 Hospitality Lane, CA 90210</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone className="text-[#dce1ff] dark:text-blue-300"/>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-widest uppercase mb-1">Reservations</h4>
                                        <p className="text-sm text-white/80">+1 (555) 800-HOTEL</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Mail className="text-[#dce1ff] dark:text-blue-300"/>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-widest uppercase mb-1">Email</h4>
                                        <p className="text-sm text-white/80">concierge@camhotel.premium</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-2/3 p-12">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    className="w-full bg-input-bg dark:text-white border-none rounded-lg p-4 focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    placeholder="Full Name"/>
                                <input
                                    className="w-full bg-input-bg dark:text-white border-none rounded-lg p-4 focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    placeholder="Email Address"/>
                                <textarea
                                    className="col-span-2 w-full bg-input-bg dark:text-white border-none rounded-lg p-4 focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    rows={4} placeholder="How can we assist you?"></textarea>
                                <button
                                    className="bg-[#00236f] dark:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:bg-[#1e3a8a] dark:hover:bg-blue-500">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}