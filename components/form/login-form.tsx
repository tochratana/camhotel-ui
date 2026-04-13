"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardPathByRole, normalizeRole } from "@/lib/admin-auth";
import { useLoginMutation } from "@/lib/feature/userSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function getErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) {
    return "Invalid email or password. Please try again.";
  }

  const payload = error as {
    data?: { message?: unknown; error?: unknown };
    message?: unknown;
  };

  if (typeof payload.data?.message === "string") {
    return payload.data.message;
  }

  if (typeof payload.data?.error === "string") {
    return payload.data.error;
  }

  if (typeof payload.message === "string") {
    return payload.message;
  }

  return "Invalid email or password. Please try again.";
}

export default function LoginForm() {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const role = normalizeRole(result?.data?.role?.name);
      if (!role) {
        setServerError("Role is missing in login response.");
        return;
      }

      const redirect =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;
      const hasSafeRedirect =
        typeof redirect === "string" &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//");

      router.replace(hasSafeRedirect ? redirect : getDashboardPathByRole(role));
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full rounded-2xl border border-white/80 bg-white/92 shadow-2xl shadow-slate-900/10 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/88 dark:shadow-black/45">
      <CardHeader className="space-y-3 px-8 pt-8 pb-4 text-center">
        <div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1f3b93] text-white shadow-lg shadow-[#1f3b93]/30 dark:bg-blue-600 dark:shadow-blue-950/50">
          <Building2 className="h-6 w-6" />
        </div>
        <CardTitle className="text-4xl font-extrabold tracking-tight text-[#1f3b93] dark:text-blue-300">
          CamHotel
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
          Premium Management Portal
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {serverError ? (
            <div className="rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-700/50 dark:bg-rose-950/35 dark:text-rose-300">
              {serverError}
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <Input
                id="email"
                type="email"
                placeholder="admin@camhotel.com"
                autoComplete="email"
                disabled={isLoading}
                className="h-11 border-slate-200 bg-slate-100/95 pl-10 text-[15px] focus-visible:ring-[#1f3b93]/25 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-400/30"
                {...register("email")}
              />
            </div>
            {errors.email ? (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                Password
              </Label>
              {/* <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#1f3b93] hover:underline"
              >
                Forgot Password?
              </Link> */}
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                className="h-11 border-slate-200 bg-slate-100/95 pl-10 pr-10 text-[15px] focus-visible:ring-[#1f3b93]/25 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-400/30"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none dark:text-slate-400 dark:hover:text-slate-200"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errors.password.message}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full bg-[#1f3b93] text-base font-semibold text-white shadow-lg shadow-[#1f3b93]/30 hover:bg-[#18317b] dark:bg-blue-600 dark:shadow-blue-950/50 dark:hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Login
                <LogIn className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#1f3b93] hover:underline dark:text-blue-300">
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
