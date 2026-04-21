"use client";

import { useEffect, useRef, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [showOnlineNotice, setShowOnlineNotice] = useState(false);
  const noticeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      setShowOnlineNotice(true);

      if (noticeTimeoutRef.current) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
      noticeTimeoutRef.current = window.setTimeout(() => {
        setShowOnlineNotice(false);
      }, 3000);
    };

    const onOffline = () => {
      setIsOnline(false);
      setShowOnlineNotice(false);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (noticeTimeoutRef.current) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  const visible = !isOnline || showOnlineNotice;
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm shadow-lg backdrop-blur",
          isOnline
            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
            : "border-amber-300 bg-amber-50 text-amber-800",
        )}
      >
        <div className="inline-flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
          <span>
            {isOnline
              ? "Back online. Connection restored."
              : "You are offline. Some features may not work."}
          </span>
        </div>
        {!isOnline ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-7"
          >
            Retry
          </Button>
        ) : null}
      </div>
    </div>
  );
}
