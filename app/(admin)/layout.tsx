import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <main className="">
        <div className="mx-auto w-full">{children}</div>
      </main>
    </AuthGuard>
  );
}
