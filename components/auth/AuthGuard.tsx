"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppRole,
  clearStoredBasicToken,
  getDashboardPathByRole,
  normalizeRole,
} from "@/lib/admin-auth";
import { useAuthTokenState } from "@/lib/hooks/useAuthToken";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
};

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isHydrated } = useAuthTokenState();
  const hasToken = Boolean(token);

  const { data, error, isLoading, isFetching } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !isHydrated || !hasToken,
    },
  );

  useEffect(() => {
    if (!isHydrated) return;
    if (!hasToken) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hasToken, isHydrated, pathname, router]);

  useEffect(() => {
    if (!error) return;

    const status = (error as { status?: number }).status;
    if (status === 401 || status === 403) {
      clearStoredBasicToken();
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [error, pathname, router]);

  const userRole = normalizeRole(data?.data?.role?.name);
  const hasRoleRestriction = Array.isArray(allowedRoles) && allowedRoles.length > 0;
  const hasUnauthorizedRole =
    hasRoleRestriction &&
    userRole !== null &&
    !allowedRoles.includes(userRole);

  useEffect(() => {
    if (!hasUnauthorizedRole || !userRole) return;
    router.replace(getDashboardPathByRole(userRole));
  }, [hasUnauthorizedRole, router, userRole]);

  if (!isHydrated || !hasToken || isLoading || isFetching) {
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

  if (hasUnauthorizedRole) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
