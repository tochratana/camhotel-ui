import AuthGuard from "@/components/auth/AuthGuard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full">{children}</div>
      </main>
    </AuthGuard>
  );
}
