"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { clearStoredBasicToken } from "@/lib/auth";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthToken();
  const hasToken = Boolean(token);

  const { data, error, isLoading, isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (!hasToken) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hasToken, pathname, router]);

  useEffect(() => {
    if (!error) return;

    const status = (error as { status?: number }).status;
    if (status === 401 || status === 403) {
      clearStoredBasicToken();
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [error, pathname, router]);

  if (!hasToken || isLoading || isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Verifying session...
      </div>
    );
  }

  return <>{children}</>;
}
