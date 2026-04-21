"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCcw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    const updateStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <Card className="w-full">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            {isOffline ? (
              <WifiOff className="h-5 w-5 text-amber-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            )}
            {isOffline ? "You are offline" : "Something went wrong"}
          </CardTitle>
          <CardDescription>
            {isOffline
              ? "Your internet connection looks unavailable. Please reconnect and retry."
              : "An unexpected error occurred while loading this page."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => unstable_retry()}>
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
