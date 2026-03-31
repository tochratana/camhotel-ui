import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredBasicToken } from "@/lib/auth";

const normalizedBaseUrl = (process.env.NEXT_PUBLIC_API ?? "").replace(/\/+$/, "");

export const fakeStoreApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: normalizedBaseUrl,
    prepareHeaders: (headers) => {
      const token = getStoredBasicToken();
      if (token) {
        headers.set("Authorization", `Basic ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
