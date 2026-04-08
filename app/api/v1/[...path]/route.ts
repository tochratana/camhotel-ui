const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  process.env.NEXT_PUBLIC_API ??
  ""
).replace(/\/+$/, "");

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function buildTargetUrl(path: string[], requestUrl: string): string {
  const sourceUrl = new URL(requestUrl);
  const targetPath = path.join("/");
  const separator = targetPath ? "/" : "";
  return `${apiBaseUrl}${separator}${targetPath}${sourceUrl.search}`;
}

function buildForwardHeaders(req: Request): Headers {
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  return headers;
}

async function handleProxy(req: Request, context: RouteContext): Promise<Response> {
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

    const { path } = await context.params;
    const targetUrl = buildTargetUrl(path, req.url);
    const headers = buildForwardHeaders(req);

    const method = req.method.toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD" && method !== "OPTIONS";

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: upstreamResponse.headers,
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function POST(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function PUT(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function PATCH(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function DELETE(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function OPTIONS(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}

export async function HEAD(req: Request, context: RouteContext) {
  return handleProxy(req, context);
}
