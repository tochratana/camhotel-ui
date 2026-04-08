import { fakeStoreApi } from "@/lib/feature/api";
import type { ApiResponse, UserResponse } from "@/types/auth";
import type {
  ApiPageResponse,
  BookingResponse,
  BookingsQuery,
  PaginationQuery,
  RoomResponse,
  RoomStatus,
  RoomTypeResponse,
  RoomsQuery,
  UpdateBookingStatusPayload,
  UpdateRoomStatusPayload,
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

export const hotelApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<ApiPageResponse<RoomResponse>, RoomsQuery | void>({
      query: (params) =>
        withQuery("/rooms", {
          keyword: params?.keyword,
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          roomTypeId: params?.roomTypeId,
          capacity: params?.capacity,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          floorNumber: params?.floorNumber,
          status: params?.status,
          amenities: params?.amenities,
          checkInDate: params?.checkInDate,
          checkOutDate: params?.checkOutDate,
          sortBy: params?.sortBy,
          sortDirection: params?.sortDirection,
        }),
      providesTags: ["Auth"],
    }),
    getRoomById: builder.query<ApiResponse<RoomResponse>, number>({
      query: (id) => `/rooms/${id}`,
      providesTags: ["Auth"],
    }),
    getRoomTypes: builder.query<
      ApiPageResponse<RoomTypeResponse>,
      PaginationQuery | void
    >({
      query: (params) =>
        withQuery("/room-types", {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
        }),
      providesTags: ["Auth"],
    }),
    getAllBookings: builder.query<
      ApiPageResponse<BookingResponse>,
      BookingsQuery | void
    >({
      query: (params) =>
        withQuery("/bookings", {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          status: params?.status,
        }),
      providesTags: ["Auth"],
    }),
    getMyBookings: builder.query<
      ApiPageResponse<BookingResponse>,
      PaginationQuery | void
    >({
      query: (params) =>
        withQuery("/bookings/me", {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
        }),
      providesTags: ["Auth"],
    }),
    getUsers: builder.query<ApiPageResponse<UserResponse>, PaginationQuery | void>({
      query: (params) =>
        withQuery("/users", {
          pageNumber: params?.page ?? 0,
          pageSize: params?.size ?? 10,
        }),
      providesTags: ["Auth"],
    }),
    updateBookingStatus: builder.mutation<
      ApiResponse<BookingResponse>,
      UpdateBookingStatusPayload
    >({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Auth"],
    }),
    updateRoomStatus: builder.mutation<ApiResponse<RoomResponse>, UpdateRoomStatusPayload>(
      {
        query: ({ id, status }) => ({
          url: `/rooms/${id}/status`,
          method: "PATCH",
          body: { status } satisfies { status: RoomStatus },
        }),
        invalidatesTags: ["Auth"],
      },
    ),
    getBookingPolicy: builder.query<ApiResponse<{ cancellationWindowHours: number }>, void>(
      {
        query: () => "/booking-policy",
        providesTags: ["Auth"],
      },
    ),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useGetRoomTypesQuery,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetUsersQuery,
  useUpdateBookingStatusMutation,
  useUpdateRoomStatusMutation,
  useGetBookingPolicyQuery,
} = hotelApi;
