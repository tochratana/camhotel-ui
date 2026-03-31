export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-[60] overflow-hidden bg-background">
            {children}
        </div>
    );
}
