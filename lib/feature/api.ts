import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredBasicToken } from "@/lib/admin-auth";

// Use Next.js route handlers as a BFF proxy so the browser does not call
// backend domains directly.
const normalizedBaseUrl = (
  process.env.NEXT_PUBLIC_API_PROXY_BASE_URL ?? "/api/v1"
).replace(/\/+$/, "");

export const fakeStoreApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: normalizedBaseUrl,
    prepareHeaders: (headers) => {
      const token = getStoredBasicToken();
      if (token) {
        const hasAuthScheme = /^(Bearer|Basic)\s/i.test(token);
        headers.set("Authorization", hasAuthScheme ? token : `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
