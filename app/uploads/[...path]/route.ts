import { RouteContext } from "@/types/routeType";

function getApiOrigin(): string {
  const rawApiBase =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API ??
    "";

  const normalizedApiBase = rawApiBase.replace(/\/+$/, "");
  if (!normalizedApiBase) {
    return "";
  }

  return normalizedApiBase.replace(/\/api(?:\/v\d+)?$/i, "");
}

function buildForwardHeaders(req: Request): Headers {
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  return headers;
}

async function proxyMedia(
  req: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const { path } = await context.params;
    const apiOrigin = getApiOrigin();
    if (!apiOrigin) {
      return Response.json(
        { error: "API origin is not configured. Set API_BASE_URL or NEXT_PUBLIC_API." },
        { status: 500 },
      );
    }

    const mediaPath = path.join("/");
    const targetUrl = `${apiOrigin}/uploads/${mediaPath}`;
    const headers = buildForwardHeaders(req);

    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      cache: "no-store",
      redirect: "manual",
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: upstreamResponse.headers,
    });
  } catch (error) {
    console.error("Uploads proxy error:", error);
    return Response.json(
      { error: "Uploads proxy failed. Please verify backend uploads endpoint is reachable." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, context: RouteContext) {
  return proxyMedia(req, context);
}

export async function HEAD(req: Request, context: RouteContext) {
  return proxyMedia(req, context);
}
