import AuthGuard from "@/components/auth/AuthGuard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-background pt-28 px-6 pb-20">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </AuthGuard>
  );
}
