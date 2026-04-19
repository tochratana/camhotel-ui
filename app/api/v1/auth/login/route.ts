import { cookies } from "next/headers";

function getApiBaseUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
}

function extractAccessToken(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const asRecord = payload as Record<string, unknown>;
  const nestedData =
    asRecord.data && typeof asRecord.data === "object"
      ? (asRecord.data as Record<string, unknown>)
      : null;

  return typeof asRecord.accessToken === "string"
    ? asRecord.accessToken
    : typeof nestedData?.accessToken === "string"
      ? nestedData.accessToken
      : typeof asRecord.token === "string"
        ? asRecord.token
        : typeof nestedData?.token === "string"
          ? nestedData.token
          : null;
}

function extractErrorMessage(payload: unknown): string {
  if (payload && typeof payload === "object" && "message" in payload) {
    const maybeMessage = (payload as Record<string, unknown>).message;
    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
  }
  return "Login request failed";
}

export async function POST(req: Request) {
  try {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      return Response.json(
        { error: "NEXT_PUBLIC_API is not configured" },
        { status: 500 },
      );
    }

    const forwardHeaders = new Headers(req.headers);
    forwardHeaders.delete("host");
    forwardHeaders.delete("connection");
    forwardHeaders.delete("content-length");
    forwardHeaders.set("content-type", "application/json");

    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: forwardHeaders,
      body: await req.text(),
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as unknown;

    if (!res.ok) {
      return Response.json(
        { error: extractErrorMessage(payload) },
        { status: res.status },
      );
    }

    const accessToken = extractAccessToken(payload);

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
