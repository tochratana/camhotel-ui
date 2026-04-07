import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredBasicToken } from "@/lib/admin-auth";

const normalizedBaseUrl = (process.env.NEXT_PUBLIC_API ?? "").replace(
  /\/+$/,
  "",
);

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
