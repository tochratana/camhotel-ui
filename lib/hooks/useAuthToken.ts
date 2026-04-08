"use client";

import { useSyncExternalStore } from "react";
import { AUTH_CHANGED_EVENT, getStoredBasicToken } from "@/lib/admin-auth";

function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGED_EVENT, callback);
  };
}

function subscribeToHydration() {
  return () => {};
}

export function useAuthToken() {
  return useSyncExternalStore(
    subscribeToAuthChanges,
    getStoredBasicToken,
    () => null,
  );
}

export function useAuthTokenState() {
  const token = useAuthToken();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return { token, isHydrated };
}
