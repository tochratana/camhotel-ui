import AuthGuard from "@/components/auth/AuthGuard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <main className="">
        <div className="mx-auto w-full">{children}</div>
      </main>
    </AuthGuard>
  );
}
