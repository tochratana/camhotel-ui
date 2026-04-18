function getApiBaseUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_API ?? "";
  return rawValue.replace(/\/+$/, "");
}

export async function POST(req: Request) {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const targetUrl = `${apiBaseUrl}/auth/register`;

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

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        payload && typeof payload.message === "string"
          ? payload.message
          : "Register request failed";
      return Response.json({ error: message }, { status: res.status });
    }

    return Response.json(payload ?? {}, { status: res.status });
  } catch (error) {
    console.error("Register proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
