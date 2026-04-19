"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";

type InquiryForm = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const initialInquiryForm: InquiryForm = {
  fullName: "",
  email: "",
  subject: "General Inquiry",
  message: "",
};

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_TO_NAME = process.env.NEXT_PUBLIC_EMAILJS_TO_NAME;

const faqItems = [
  {
    q: "What is the standard check-in and check-out time?",
    a: "Check-in begins at 3:00 PM and check-out is at 12:00 PM. Early check-in or late check-out can be requested via our concierge desk subject to availability.",
  },
  {
    q: "Do you offer airport shuttle services?",
    a: "Yes, we provide luxury private transfers from Metropolitan International Airport. Please contact our VIP services team at least 24 hours in advance.",
  },
  {
    q: "Are pets allowed at CamHotel?",
    a: "We are a pet-friendly establishment. Specific 'Pet Suites' are available with custom amenities for your companions.",
  },
  {
    q: "Can I cancel my reservation without penalty?",
    a: "Cancellations made 48 hours prior to arrival are fully refundable for most booking tiers.",
  },
];

export default function Contact() {
  const [form, setForm] = useState<InquiryForm>(initialInquiryForm);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex((prev) => (prev === index ? -1 : index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage({ type: "idle", message: "" });

    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      const msg = "Please fill in your full name, email, and message.";
      setSubmitMessage({
        type: "error",
        message: msg,
      });
      toast.error(msg);
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const msg = "Email service is not configured yet. Please contact support.";
      setSubmitMessage({
        type: "error",
        message: msg,
      });
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: EMAILJS_TO_NAME,
          from_name: form.fullName,
          user_name: form.fullName,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject,
          inquiry_subject: form.subject,
          message: form.message,
          inquiry_message: form.message,
          sent_at: new Date().toISOString(),
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setForm(initialInquiryForm);
      const msg = "Inquiry sent successfully. Our team will contact you soon.";
      setSubmitMessage({
        type: "success",
        message: msg,
      });
      toast.success(msg);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      const msg = "Failed to send inquiry. Please try again in a moment.";
      setSubmitMessage({
        type: "error",
        message: msg,
      });
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  font-sans text-[#1a1b21] dark:text-[#f1f0f7] transition-colors duration-300">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 py-14 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-both">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 block">
                Connect With Us
              </span>
              <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight text-[#1a1b21] dark:text-white">
                Experience the art of{" "}
                <span className="text-[#1e3a8a] dark:text-[#90a8ff]">
                  curated hospitality.
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Whether you&apos;re planning a bespoke getaway or managing a
                corporate event, our concierge team is standing by to ensure
                every detail of your stay in the Azure District is perfected.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="h-24 w-1 bg-[#1e3a8a] dark:bg-[#b6c4ff] opacity-20"></div>
            </div>
          </div>

          {/* Bento Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            {/* Contact Form Card */}
            <div className="lg:col-span-7 bg-white dark:bg-input-bg rounded-xl p-10 shadow-sm border border-slate-100 dark:border-white/5">
              <h2 className="text-2xl font-bold mb-8 dark:text-white">
                Send an Inquiry
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Keo Menglong"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none dark:text-white placeholder:dark:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="keomenglong@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none dark:text-white placeholder:dark:text-slate-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none appearance-none"
                  >
                    <option className="dark:bg-[#6D7698]">
                      General Inquiry
                    </option>
                    <option className="dark:bg-[#6D7698]">
                      Reservation Assistance
                    </option>
                    <option className="dark:bg-[#6D7698]">
                      Event Planning
                    </option>
                    <option className="dark:bg-[#6D7698]">VIP Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="How can we assist you today?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-[#6D7698]/10 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4059aa] dark:focus:ring-[#b6c4ff] transition-all outline-none resize-none text-slate-400 placeholder:dark:text-slate-400 dark:text-white"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-br from-[#00236f] to-[#1e3a8a] dark:from-[#b6c4ff] dark:to-[#90a8ff] text-white dark:text-[#00164e] px-8 py-4 rounded-xl font-bold w-full md:w-auto hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>

                {submitMessage.type !== "idle" && (
                  <p
                    className={`text-sm ${
                      submitMessage.type === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {submitMessage.message}
                  </p>
                )}
              </form>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Address Card */}
              <div className="bg-[#1e3a8a] dark:bg-[#1e3a8a] text-white rounded-xl p-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="mb-4 opacity-80 text-3xl">
                    <MapPin />
                  </div>
                  <h3 className="text-xl font-bold mb-2">The Azure District</h3>
                  <p className="text-blue-200 dark:text-[#b6c4ff] font-light leading-relaxed">
                    442 Sapphire Avenue, Suite 100
                    <br />
                    Azure Hospitality Quarter
                    <br />
                    Metropolitan City, AZ 88210
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500 text-[10rem]">
                  🏢
                </div>
              </div>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#f4f3fa] dark:bg-input-bg rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 text-xl">
                    <Phone />
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Phone
                  </span>
                  <p className="text-sm font-bold dark:text-white">
                    +1 (800) CAM-HTL
                  </p>
                </div>
                <div className="bg-[#f4f3fa] dark:bg-input-bg rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[#1e3a8a] dark:text-[#b6c4ff] mb-3 text-xl">
                    <Mail />
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Email
                  </span>
                  <p className="text-sm font-bold dark:text-white">
                    stay@camhotel.com
                  </p>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="rounded-xl overflow-hidden grow min-h-60 relative border dark:border-white/5 bg-slate-200 dark:bg-input-bg">
                <iframe
                  title="CamHotel Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.5335955304004!2d104.89882211247486!3d11.585255988569518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1sen!2skh!4v1776573010380!5m2!1sen!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <section className="mt-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold tracking-tight mb-4 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Find quick answers to common questions about reservations,
                  amenities, and guest services.
                </p>
                <Link
                  href="#"
                  className="text-[#1e3a8a] dark:text-[#b6c4ff] font-bold flex items-center gap-2 group"
                >
                  View Full Support Center
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 gap-4">
                {faqItems.map((faq, idx) => {
                  const isActive = activeFaqIndex === idx;
                  return (
                    <article
                      key={faq.q}
                      className={`p-6 rounded-xl border transition-all ${isActive
                        ? "bg-[#eeedf4] dark:bg-input-bg border-l-4 border-l-[#1e3a8a] dark:border-l-[#b6c4ff] border-transparent dark:border-white/5"
                        : "bg-[#f4f3fa] dark:bg-input-bg border-transparent dark:border-white/5"}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-start justify-between gap-4 text-left"
                        aria-expanded={isActive}
                        aria-controls={`faq-answer-${idx}`}
                      >
                        <h4 className="font-bold text-lg dark:text-white">
                          {faq.q}
                        </h4>
                        <ChevronDown
                          className={`h-5 w-5 mt-1 shrink-0 text-[#1e3a8a] dark:text-[#b6c4ff] transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        id={`faq-answer-${idx}`}
                        className={`grid transition-all duration-300 ease-out ${isActive ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] mt-0"}`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
