import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  clearStoredBasicToken,
  getStoredBasicToken,
  setStoredBasicToken,
} from "@/lib/admin-auth";

// Use Next.js route handlers as a BFF proxy so the browser does not call
// backend domains directly.
const normalizedBaseUrl = (
  process.env.NEXT_PUBLIC_API_PROXY_BASE_URL ?? "/api/v1"
).replace(/\/+$/, "");

function getAccessTokenFromPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as {
    accessToken?: unknown;
    data?: {
      accessToken?: unknown;
      token?: unknown;
    };
    token?: unknown;
  };

  if (typeof data.accessToken === "string") {
    return data.accessToken;
  }

  if (typeof data.data?.accessToken === "string") {
    return data.data.accessToken;
  }

  if (typeof data.data?.token === "string") {
    return data.data.token;
  }

  if (typeof data.token === "string") {
    return data.token;
  }

  return null;
}

function getRequestUrl(args: string | FetchArgs): string {
  return typeof args === "string" ? args : args.url;
}

function shouldSkipRefresh(url: string): boolean {
  const normalizedUrl = url.toLowerCase();
  return (
    normalizedUrl.includes("/auth/login") ||
    normalizedUrl.includes("/auth/register") ||
    normalizedUrl.includes("/auth/refresh") ||
    normalizedUrl.includes("/auth/logout")
  );
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: normalizedBaseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getStoredBasicToken();
    if (token) {
      const hasAuthScheme = /^(Bearer|Basic)\s/i.test(token);
      headers.set("Authorization", hasAuthScheme ? token : `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const status =
    typeof result.error?.status === "number" ? result.error.status : null;
  const requestUrl = getRequestUrl(args);
  const hasToken = Boolean(getStoredBasicToken());

  const shouldRefresh =
    status === 401 &&
    hasToken &&
    !shouldSkipRefresh(requestUrl);

  if (!shouldRefresh) {
    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: "/auth/refresh",
      method: "POST",
    },
    api,
    extraOptions,
  );

  const nextAccessToken = refreshResult.data
    ? getAccessTokenFromPayload(refreshResult.data)
    : null;

  if (!nextAccessToken) {
    clearStoredBasicToken();
    return result;
  }

  setStoredBasicToken(nextAccessToken);
  result = await rawBaseQuery(args, api, extraOptions);
  return result;
};

export const fakeStoreApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
