const publicApiRoot = (
  process.env.NEXT_PUBLIC_API ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""
).replace(/\/+$/, "");

const publicApiOrigin = publicApiRoot.replace(/\/api(?:\/v\d+)?$/i, "");

export function resolveMediaUrl(value: string | null | undefined): string {
  if (!value) return "";

  const normalized = value.trim();
  if (!normalized) return "";

  if (
    normalized.startsWith("data:") ||
    normalized.startsWith("blob:")
  ) {
    return normalized;
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    try {
      const absoluteUrl = new URL(normalized);
      // If backend stored a full uploads URL, rewrite it through frontend /uploads proxy
      // so it works across environments and avoids remote image host restrictions.
      if (absoluteUrl.pathname.startsWith("/uploads/")) {
        return `${absoluteUrl.pathname}${absoluteUrl.search}`;
      }
      return normalized;
    } catch {
      return normalized;
    }
  }

  // For relative media paths from backend (e.g. uploads/file.png),
  // use the frontend /uploads proxy so host/protocol stay correct in all envs.
  const relativePath = normalized.startsWith("/")
    ? normalized.slice(1)
    : normalized;
  if (relativePath.startsWith("uploads/")) {
    return `/${relativePath}`;
  }

  if (!publicApiOrigin) {
    return normalized.startsWith("/") ? normalized : `/${normalized}`;
  }

  return normalized.startsWith("/")
    ? `${publicApiOrigin}${normalized}`
    : `${publicApiOrigin}/${normalized}`;
}
