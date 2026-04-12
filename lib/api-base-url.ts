const rawApiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  ""
).trim();

function getNormalizedApiBaseUrl(): string {
  return rawApiBaseUrl.replace(/\/+$/, "");
}

export function buildApiUrl(path: string, search = ""): string {
  const baseUrl = getNormalizedApiBaseUrl();

  if (!baseUrl) {
    throw new Error(
      "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API.",
    );
  }

  const normalizedPath = path.replace(/^\/+/, "");
  const normalizedSearch = search
    ? search.startsWith("?")
      ? search
      : `?${search}`
    : "";

  return normalizedPath
    ? `${baseUrl}/${normalizedPath}${normalizedSearch}`
    : `${baseUrl}${normalizedSearch}`;
}
