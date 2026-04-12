import { buildApiUrl } from "@/lib/api-base-url";

export async function POST(req: Request) {
  try {

    const res = await fetch(buildApiUrl("auth/register"), {
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
