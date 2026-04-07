import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full">{children}</div>
      </main>
    </AuthGuard>
  );
}
