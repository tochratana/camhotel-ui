"use client"
import Link from "next/link";

export default function Contact() {
    return (
        <div
            className="min-h-screen  font-sans text-[#1a1b21] dark:text-[#f1f0f7] transition-colors duration-300">
            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-8 py-14">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
              <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 block">
                Connect With Us
              </span>
                            <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight text-[#1a1b21] dark:text-white">
                                Experience the art of <span className="text-[#1e3a8a] dark:text-[#90a8ff]">curated hospitality.</span>
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Whether you&apos;re planning a bespoke getaway or managing a corporate event, our
                                concierge
                                team is standing by to ensure every detail of your stay in the Azure District is
                                perfected.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="h-24 w-1 bg-[#1e3a8a] dark:bg-[#b6c4ff] opacity-20"></div>
                        </div>
                    </div>

                    {/* Bento Contact Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

                        {/* Contact Form Card */}
                        <div
                            className="lg:col-span-7 bg-white dark:bg-input-bg rounded-xl p-10 shadow-sm border border-slate-100 dark:border-white/5">
                            <h2 className="text-2xl font-bold mb-8 dark:text-white">Send an Inquiry</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full
                                            Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none dark:text-white placeholder:dark:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email
                                            Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none dark:text-white placeholder:dark:text-slate-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Subject</label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none appearance-none">
                                        <option className="dark:bg-[#6D7698]">General Inquiry</option>
                                        <option className="dark:bg-[#6D7698]">Reservation Assistance</option>
                                        <option className="dark:bg-[#6D7698]">Event Planning</option>
                                        <option className="dark:bg-[#6D7698]">VIP Services</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we assist you today?"
                                        className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none resize-none text-slate-400 placeholder:dark:text-slate-400 dark:text-white"
                                    ></textarea>
                                </div>
                                <button
                                    className="bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-[#b6c4ff] dark:to-[#90a8ff] text-white dark:text-[#00164e] px-8 py-4 rounded-xl font-bold w-full md:w-auto hover:opacity-90 transition-opacity">
                                    Submit Request
                                </button>
                            </form>
                        </div>

                        {/* Info Column */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Address Card */}
                            <div
                                className="bg-[#1e3a8a] dark:bg-[#1e3a8a] text-white rounded-xl p-8 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="mb-4 opacity-80 text-3xl">📍</div>
                                    <a href="https://maps.app.goo.gl/LZzbpBTiZct84tsE7" target="_blank">
                                        <h3 className="text-xl font-bold mb-2">Institute of Science and Technology
                                            Advanced Development</h3>
                                        <p className="text-blue-200 dark:text-[#b6c4ff] font-light leading-relaxed">
                                            No. 40, Street 273,
                                            Sangkat Boeung Kak I,
                                            <br/>
                                            Khan Toul Kork,
                                            Phnom Penh, Cambodia
                                        </p>
                                    </a>
                                </div>
                                <div
                                    className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500 text-[10rem]">
                                    🏢
                                </div>
                            </div>

                            {/* Quick Links Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div
                                    className="bg-[#f4f3fa] dark:bg-input-bg rounded-xl p-6 flex flex-col items-center justify-center text-center">
                                    <div className="text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 text-xl">📞</div>
                                    <span
                                        className="text-[0.6rem] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Phone</span>
                                    <a href="tel:093-990-910" target="_blank">
                                        <p className="text-sm font-bold dark:text-white">+(855) 93-990-910</p>
                                    </a>
                                </div>
                                <div
                                    className="bg-[#f4f3fa] dark:bg-input-bg rounded-xl p-6 flex flex-col items-center justify-center text-center">
                                    <div className="text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 text-xl">✉️</div>
                                    <span
                                        className="text-[0.6rem] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Email</span>
                                    <a href="mailto:info.istad@gmail.com">
                                        <p className="text-sm font-bold dark:text-white">info.istad@gmail.com</p>
                                    </a>
                                </div>
                            </div>

                            {/* Live Google Map */}
                            <div
                                className="bg-slate-200 dark:bg-input-bg rounded-xl overflow-hidden grow min-h-60 relative border dark:border-white/5 shadow-inner">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.5335482521355!2d104.89974919987002!3d11.585259369306556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1sen!2skh!4v1776542810074!5m2!1sen!2skh"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="ISTAD Location"
                                    className="absolute inset-0"
                                ></iframe>
                                <div
                                    className="absolute bottom-4 left-4 bg-white/90 dark:bg-input-bg/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg pointer-events-none">
                                    <p className="text-[0.65rem] font-extrabold text-[#1e3a8a] dark:text-[#b6c4ff] flex items-center gap-2 uppercase tracking-wider">
                                        <span>🧭</span> Real-time Direction Enabled
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQs Section */}
                    <section className="mt-24">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold tracking-tight mb-4 dark:text-white">Frequently Asked
                                    Questions</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">Find quick answers to common
                                    questions about reservations, amenities, and guest services.</p>
                                <Link href="#"
                                      className="text-[#1e3a8a] dark:text-[#b6c4ff] font-bold flex items-center gap-2 group">
                                    View Full Support Center
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 gap-4">
                                {[
                                    {
                                        q: "What is the standard check-in and check-out time?",
                                        a: "Check-in begins at 3:00 PM and check-out is at 12:00 PM. Early check-in or late check-out can be requested via our concierge desk subject to availability."
                                    },
                                    {
                                        q: "Do you offer airport shuttle services?",
                                        a: "Yes, we provide luxury private transfers from Metropolitan International Airport. Please contact our VIP services team at least 24 hours in advance."
                                    },
                                    {
                                        q: "Are pets allowed at CamHotel?",
                                        a: "We are a pet-friendly establishment. Specific 'Pet Suites' are available with custom amenities for your companions."
                                    },
                                    {
                                        q: "Can I cancel my reservation without penalty?",
                                        a: "Cancellations made 48 hours prior to arrival are fully refundable for most booking tiers."
                                    }
                                ].map((faq, idx) => (
                                    <div key={idx}
                                         className={`p-6 rounded-xl border border-transparent dark:border-white/5 transition-colors ${idx === 0 ? 'bg-[#eeedf4] dark:bg-input-bg border-l-4 border-l-[#1e3a8a] dark:border-l-[#b6c4ff]' : 'bg-[#f4f3fa] dark:bg-input-bg'}`}>
                                        <h4 className="font-bold text-lg mb-2 dark:text-white">{faq.q}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    )
}