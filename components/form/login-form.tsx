"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardPathByRole, normalizeRole } from "@/lib/admin-auth";
import { useLoginMutation } from "@/lib/feature/userSlice";

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
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

// ─── Component ─────────────────────────────────────────────────────────────────

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
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

      router.replace(getDashboardPathByRole(role));
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Server-side error banner */}
            {serverError && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {serverError}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
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
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                checked={watch("rememberMe")}
                onCheckedChange={(checked) =>
                  setValue("rememberMe", checked === true)
                }
                disabled={isLoading}
                id="rememberMe"
              />
              <Label
                htmlFor="rememberMe"
                className="cursor-pointer text-sm font-normal"
              >
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
