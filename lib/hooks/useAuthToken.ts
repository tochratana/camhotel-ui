"use client";

import { useEffect, useState } from "react";
import { AUTH_CHANGED_EVENT, getStoredBasicToken } from "@/lib/auth";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(() => getStoredBasicToken());

  useEffect(() => {
    const syncToken = () => {
      setToken(getStoredBasicToken());
    };

    syncToken();
    window.addEventListener("storage", syncToken);
    window.addEventListener(AUTH_CHANGED_EVENT, syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncToken);
    };
  }, []);

  return token;
}
