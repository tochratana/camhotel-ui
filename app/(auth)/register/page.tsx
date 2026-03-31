"use client";

import {useState} from "react";
import {useRegisterMutation} from "@/lib/feature/userSlice";
import {Eye, EyeOff, Loader2, UserPlus, Mail, Lock, User} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();

    const [form, setForm] = useState({fullName: "", email: "", password: "", confirmPassword: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            }).unwrap();
            router.push("/login");
        } catch (err: unknown) {
            const error = err as { data?: { message?: string }; status?: number };
            if (error?.status === 409) {
                setError("An account with this email already exists.");
            } else if (error?.data?.message) {
                setError(error.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <main className="h-screen flex font-sans overflow-hidden">
            {/* Left: Register form */}
            <div
                className="flex-1 flex items-center justify-center px-6 py-20 bg-background dark:bg-[#0c0e1a]">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link href="/"
                          className="inline-block text-3xl font-bold tracking-tighter text-[#00236f] dark:text-blue-300 mb-2">
                        CamHotel
                    </Link>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                        Create your account
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-10">
                        Already have an account?{" "}
                        <Link href="/login"
                              className="text-[#00236f] dark:text-blue-400 font-semibold hover:underline">
                            Sign in
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
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName"
                                   className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"/>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#161929] border border-slate-200 dark:border-[#2d3154] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                        </div>

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
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 characters"
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

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword"
                                   className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"/>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-[#161929] border border-slate-200 dark:border-[#2d3154] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00236f] dark:focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4"/>
                                    Create Account
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

            {/* Right: Image panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGKCYAGgmC9djnyY2gXdUFO5mpIrsJE0XKLzZbvxU8z-0S1ddkt_b14rMHw-Ic-FIQreXF69ouPiP9LsJUU97x4kEjElUXXVKXXRdTtKs9Pr3MdhaGy6f7i7exOYZqSolarkTJ8IcNEI-MmAx3Rr6Y21YCTcPzwX9O7Hcwa7fBsiTYP0Q48f0nOiAXhUaxcHyKdudqAjVdyfmRz5CeDN8un29JGoz8XUwZooye0OPBHW-BdCyvQxJDji8x18Z95fn6J7Wl1-_PGB0"
                    alt="CamHotel Heritage"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#00236f]/80 via-[#1e3a8a]/60 to-transparent"/>
                <div className="relative z-10 flex flex-col justify-end p-16">
                    <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                        Join Our<br/>Community
                    </h2>
                    <p className="text-white/80 text-lg max-w-md leading-relaxed">
                        Create an account to unlock exclusive rates, manage bookings, and enjoy a seamless hospitality
                        experience.
                    </p>
                </div>
            </div>
        </main>
    );
}