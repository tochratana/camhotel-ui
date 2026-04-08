const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  process.env.NEXT_PUBLIC_API ??
  ""
).replace(/\/+$/, "");

export async function POST(req: Request) {
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

    const res = await fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
