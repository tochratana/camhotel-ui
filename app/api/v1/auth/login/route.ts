import { LoginResponse } from "@/types/auth";

import { cookies } from "next/headers";

function getApiBaseUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
}

export async function POST(req: Request) {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const targetUrl = `${apiBaseUrl}/auth/login`;

    // Forward headers (especially important if there are specific client headers)
    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("connection");
    headers.delete("content-length");
    headers.set("Content-Type", "application/json");

    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: await req.text(),
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as any;

    if (!res.ok) {
      const message =
        payload && typeof payload.message === "string"
          ? payload.message
          : "Login request failed";
      return Response.json({ error: message }, { status: res.status });
    }

    // Comprehensive token extraction
    const accessToken =
      typeof payload?.accessToken === "string"
        ? payload.accessToken
        : typeof payload?.data?.accessToken === "string"
          ? payload.data.accessToken
          : typeof payload?.token === "string"
            ? payload.token
            : typeof payload?.data?.token === "string"
              ? payload.data.token
              : null;

    if (accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("better-auth.session_data", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return Response.json(payload ?? { success: true }, { status: res.status });
  } catch (error) {
    console.error("Login proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
