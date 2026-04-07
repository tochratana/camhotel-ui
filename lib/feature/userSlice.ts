import {
  clearStoredBasicToken,
  setStoredBasicToken,
} from "@/lib/admin-auth";
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  UserResponse,
} from "@/types/auth";
import { fakeStoreApi } from "./api";

function getAccessToken(payload: unknown): string | null {
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

export const authApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginCredentials>({
      queryFn: async (credentials, _api, _extraOptions, baseQuery) => {
        const loginResult = await baseQuery({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        });

        if (loginResult.error) {
          return { error: loginResult.error };
        }

        const token = getAccessToken(loginResult.data);
        if (!token) {
          return {
            error: {
              status: 500,
              data: { message: "Login succeeded but access token is missing." },
            },
          } as never;
        }

        setStoredBasicToken(token);

        const meResult = await baseQuery({
          url: "/auth/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (meResult.error) {
          clearStoredBasicToken();
          return { error: meResult.error };
        }

        return { data: meResult.data as ApiResponse<AuthResponse> };
      },
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<ApiResponse<UserResponse>, RegisterPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        clearStoredBasicToken();
        return { data: undefined };
      },
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<ApiResponse<AuthResponse>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApi;

export const { useRegisterMutation } = authApi;
