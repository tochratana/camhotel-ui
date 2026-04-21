"use client";

import "./globals.css";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <title>Application Error | CamHotel</title>
        <main className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-destructive/10 p-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">Unexpected application error</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A critical error happened while rendering the app shell. Please try
            again.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="inline-flex h-9 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Go Home
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
