const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  process.env.NEXT_PUBLIC_API ??
  ""
).replace(/\/+$/, "");

async function proxyMe(req: Request, method: "GET" | "PATCH") {
  try {
    if (!apiBaseUrl) {
      return Response.json(
        {
          error:
            "Missing API base URL. Set API_BASE_URL, NEXT_PUBLIC_BASE_URL, or NEXT_PUBLIC_API.",
        },
        { status: 500 },
      );
    }

    const authorization = req.headers.get("authorization");
    const requestBody = method === "PATCH" ? await req.text() : undefined;

    const res = await fetch(`${apiBaseUrl}/auth/me`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
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
