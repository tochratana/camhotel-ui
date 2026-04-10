const publicApiRoot = (
  process.env.NEXT_PUBLIC_API ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""
).replace(/\/+$/, "");

const publicApiOrigin = publicApiRoot.replace(/\/api(?:\/v\d+)?$/i, "");

export function resolveMediaUrl(value: string | null | undefined): string {
  if (!value) return "";

  const normalized = value.trim();
  if (!normalized) return "";

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("data:") ||
    normalized.startsWith("blob:")
  ) {
    return normalized;
  }

  if (!publicApiOrigin) {
    return normalized.startsWith("/") ? normalized : `/${normalized}`;
  }

  return normalized.startsWith("/")
    ? `${publicApiOrigin}${normalized}`
    : `${publicApiOrigin}/${normalized}`;
}
