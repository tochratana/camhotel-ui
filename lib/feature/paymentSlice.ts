import { fakeStoreApi } from "@/lib/feature/api";
import { ApiResponse } from "@/types/auth";
import { 
  ApiPageResponse, 
  PaymentResponse, 
  PaymentsQuery, 
  UpdatePaymentPayload, 
  UpdatePaymentStatusPayload 
} from "@/types/hotel";

function withQuery(path: string, params?: Record<string, unknown>) {
  if (!params) return path;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export const paymentApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<ApiPageResponse<PaymentResponse>, PaymentsQuery | void>({
      query: (params) =>
        withQuery("/payments", {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          status: params?.status,
          keyword: params?.keyword,
        }),
      providesTags: ["Auth"],
    }),
    getPaymentById: builder.query<ApiResponse<PaymentResponse>, number>({
      query: (id) => `/payments/${id}`,
      providesTags: ["Auth"],
    }),
    getPaymentByBookingId: builder.query<ApiResponse<PaymentResponse>, number>({
      query: (bookingId) => `/payments/booking/${bookingId}`,
      providesTags: ["Auth"],
    }),
    getPaymentStats: builder.query<ApiResponse<{ totalAmount: number }>, void>({
      query: () => "/payments/stats",
      providesTags: ["Auth"],
    }),
    createPayment: builder.mutation<ApiResponse<PaymentResponse>, UpdatePaymentPayload>({
      query: (payload) => ({
        url: "/payments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    updatePaymentStatus: builder.mutation<ApiResponse<PaymentResponse>, UpdatePaymentStatusPayload>({
      query: ({ id, paymentStatus }) => ({
        url: `/payments/${id}/status`,
        method: "PUT",
        body: { paymentStatus },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentByBookingIdQuery,
  useGetPaymentStatsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentStatusMutation,
} = paymentApi;
