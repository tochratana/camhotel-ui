import { LoginResponse } from "@/types/auth";

import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: await req.text(),
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as LoginResponse;

    if (!res.ok) {
      const message =
        payload && typeof payload.message === "string"
          ? payload.message
          : "Login request failed";
      return Response.json({ error: message }, { status: res.status });
    }

    const accessToken =
      typeof payload?.accessToken === "string"
        ? payload.accessToken
        : typeof payload?.data?.accessToken === "string"
          ? payload.data.accessToken
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
