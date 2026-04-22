function getApiBaseUrl(): string {
  const rawValue = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
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

function getSetCookieHeaders(headers: Headers): string[] {
  const maybeHeaders = headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof maybeHeaders.getSetCookie === "function") {
    return maybeHeaders.getSetCookie().filter((value) => value.length > 0);
  }

  const setCookie = headers.get("set-cookie");
  return setCookie ? [setCookie] : [];
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

    const responseHeaders = new Headers();
    for (const cookie of getSetCookieHeaders(res.headers)) {
      responseHeaders.append("set-cookie", cookie);
    }

    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify(payload ?? { success: true }), {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Login proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
