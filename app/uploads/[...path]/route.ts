import { RouteContext } from "@/types/routeType";

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
    // const targetUrl = buildTargetUrl(path, req.url);
    const headers = buildForwardHeaders(req);

    const upstreamResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API}/${path.join("/")}`,
      {
        method: req.method,
        headers,
        cache: "no-store",
        redirect: "manual",
      },
    );

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: upstreamResponse.headers,
    });
  } catch (error) {
    console.error("Uploads proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request, context: RouteContext) {
  return proxyMedia(req, context);
}

export async function HEAD(req: Request, context: RouteContext) {
  return proxyMedia(req, context);
}
