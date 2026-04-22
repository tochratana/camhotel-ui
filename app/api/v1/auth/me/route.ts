function getApiBaseUrl(): string {
  const rawValue = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
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

function copyResponseHeaders(upstreamHeaders: Headers): Headers {
  const responseHeaders = new Headers();

  for (const [key, value] of upstreamHeaders.entries()) {
    if (key.toLowerCase() === "set-cookie") {
      continue;
    }
    responseHeaders.set(key, value);
  }

  for (const cookie of getSetCookieHeaders(upstreamHeaders)) {
    responseHeaders.append("set-cookie", cookie);
  }

  return responseHeaders;
}

async function proxyMe(req: Request, method: "GET" | "PATCH") {
  try {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      return Response.json(
        { error: "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API." },
        { status: 500 },
      );
    }

    const targetUrl = `${apiBaseUrl}/auth/me`;

    // Forward all headers from the client to the backend
    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("connection");
    headers.delete("content-length");

    // Ensure Content-Type is set for PATCH
    if (method === "PATCH") {
      headers.set("Content-Type", "application/json");
    }

    const requestBody = method === "PATCH" ? await req.text() : undefined;

    const res = await fetch(targetUrl, {
      method,
      headers,
      body: requestBody,
      cache: "no-store",
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        payload && typeof payload.message === "string"
          ? payload.message
          : "Failed to fetch user data";
      return Response.json({ error: message }, { status: res.status });
    }

    const responseHeaders = copyResponseHeaders(res.headers);
    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify(payload ?? {}), {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Me proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return proxyMe(req, "GET");
}

export async function PATCH(req: Request) {
  return proxyMe(req, "PATCH");
}
