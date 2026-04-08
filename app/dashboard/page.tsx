"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDashboardPathByRole, normalizeRole } from "@/lib/admin-auth";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import { useAuthTokenState } from "@/lib/hooks/useAuthToken";

export default function DashboardPage() {
  const router = useRouter();
  const { token, isHydrated } = useAuthTokenState();
  const hasToken = Boolean(token);

  const { data, error, isLoading, isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !isHydrated || !hasToken,
  });

  useEffect(() => {
    if (!isHydrated) return;

    if (!hasToken) {
      router.replace("/login?redirect=%2Fdashboard");
      return;
    }

    const role = normalizeRole(data?.data?.role?.name);
    if (role) {
      router.replace(getDashboardPathByRole(role));
      return;
    }

    const status = (error as { status?: number } | undefined)?.status;
    if (status === 401 || status === 403) {
      router.replace("/login?redirect=%2Fdashboard");
    }
  }, [data, error, hasToken, isHydrated, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="sr-only">
        {isLoading || isFetching ? "Loading dashboard..." : "Redirecting..."}
      </span>
    </div>
  );
}
