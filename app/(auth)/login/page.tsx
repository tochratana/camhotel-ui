"use client";

import {Suspense, useState} from "react";
import {useLoginMutation} from "@/lib/feature/userSlice";
import {Eye, EyeOff, Loader2, LogIn, Mail, Lock} from "lucide-react";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent/>
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [login, {isLoading}] = useLoginMutation();

    const [form, setForm] = useState({email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await login({email: form.email, password: form.password}).unwrap();
            const redirectTo = searchParams.get("redirect") || "/";
            router.push(redirectTo);
        } catch (err: unknown) {
            const error = err as { data?: { message?: string }; status?: number };
            if (error?.status === 401) {
                setError("Invalid email or password.");
            } else if (error?.data?.message) {
                setError(error.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <main className="h-screen flex font-sans overflow-hidden">
            {/* Left: Image panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz59i7Cb4S5Pgd5Y4_GeLXk8Ue3HN6sxYdWnkKI0C1CaSnUPVJR17SWDR4KQiGQCGpJB5iEH8wZlpf7hdSQIxnSHoyFRTh-q2MoQ46K2Ad1E-mM27NmYpUKU27eFJbMasZvxc7DP7XPhNdKyluxELTY02cMoPmhUf8SyEpZOPzoGFOAdIdHDRjA9L9B9apEwbNPldjF6d5rxBtaNLVyYImCghrBftSIiNfE11oiFNqWn1ntDVtEwtvh-9UUTVvJ0Ruop8lqTrg1K0"
                    alt="CamHotel Lobby"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00236f]/80 via-[#1e3a8a]/60 to-transparent"/>
                <div className="relative z-10 flex flex-col justify-end p-16">
                    <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                        Welcome<br/>Back
                    </h2>
                    <p className="text-white/80 text-lg max-w-md leading-relaxed">
                        Sign in to access your bookings, manage reservations, and enjoy premium hospitality.
                    </p>
                </div>
            </div>

            {/* Right: Login form */}
            <div
                className="flex-1 flex items-center justify-center px-6 py-20 bg-background dark:bg-[#0c0e1a]">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link href="/"
                          className="inline-block text-3xl font-bold tracking-tighter text-[#00236f] dark:text-blue-300 mb-2">
                        CamHotel
                    </Link>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                        Sign in to your account
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-10">
                        Don&apos;t have an account?{" "}
                        <Link href="/register"
                              className="text-[#00236f] dark:text-blue-400 font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>

                    {/* Error banner */}
                    {error && (
                        <div
                            className="mb-6 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email"
                                   className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"/>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#161929] border border-slate-200 dark:border-[#2d3154] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password"
                                   className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"/>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-[#161929] border border-slate-200 dark:border-[#2d3154] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#00236f] to-[#1e3a8a] dark:from-blue-500 dark:to-blue-700 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4"/>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-[#2d3154]"/>
                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-[#2d3154]"/>
                    </div>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/"
                              className="text-[#00236f] dark:text-blue-400 font-semibold hover:underline">
                            ← Back to Home
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
