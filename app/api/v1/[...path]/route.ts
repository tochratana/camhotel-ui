import { RouteContext } from "@/types/routeType";

function getApiBaseUrl(): string {
  const rawValue =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API ??
    "";
  return rawValue.replace(/\/+$/, "");
}

function buildForwardHeaders(req: Request): Headers {
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  return headers;
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

async function handleProxy(
  req: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const { path } = await context.params;
    const sourceUrl = new URL(req.url);
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      return Response.json(
        { error: "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API." },
        { status: 500 },
      );
    }

    const targetUrl = `${apiBaseUrl}/${path.join("/")}${sourceUrl.search}`;
    const headers = buildForwardHeaders(req);

    const method = req.method.toUpperCase();
    const hasBody =
      method !== "GET" && method !== "HEAD" && method !== "OPTIONS";

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = copyResponseHeaders(upstreamResponse.headers);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return Response.json(
      { error: "API proxy request failed. Please verify backend server is reachable." },
      { status: 500 },
    );
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
