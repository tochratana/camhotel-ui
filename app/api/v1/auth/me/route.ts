function getApiBaseUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
}

async function proxyMe(req: Request, method: "GET" | "PATCH") {
  try {
    const apiBaseUrl = getApiBaseUrl();
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

    return Response.json(payload ?? {}, { status: res.status });
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
