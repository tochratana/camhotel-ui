import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-muted p-2 text-muted-foreground">
          <SearchX className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/rooms">
              <Compass className="h-4 w-4" />
              Browse Rooms
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
