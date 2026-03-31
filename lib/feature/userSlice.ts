import { clearStoredBasicToken, setStoredBasicToken, toBasicToken } from "@/lib/auth";
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  UserResponse,
} from "@/types/auth";
import { fakeStoreApi } from "./api";

export const authApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginCredentials>({
      queryFn: async (credentials, _api, _extraOptions, baseQuery) => {
        const token = toBasicToken(credentials.email, credentials.password);
        const result = await baseQuery({
          url: "/auth/me",
          method: "GET",
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        setStoredBasicToken(token);
        return { data: result.data as ApiResponse<AuthResponse> };
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
