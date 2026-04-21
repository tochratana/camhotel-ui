"use client";

import Link from "next/link";
import { RefreshCcw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-amber-100 p-2 text-amber-700">
          <WifiOff className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold">No Internet Connection</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You appear to be offline. Please check your network and try again.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" onClick={() => window.location.reload()}>
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
