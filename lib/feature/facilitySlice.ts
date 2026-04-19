import { fakeStoreApi } from "@/lib/feature/api";
import { ApiResponse, FileMetadataResponse } from "@/types/auth";
import { FacilitiesData } from "@/types/hotel";

export const facilityApi = fakeStoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFacilities: builder.query<ApiResponse<FacilitiesData[]>, void>({
      query: () => "/facilities",
      providesTags: ["Auth"],
    }),
    updateFacility: builder.mutation<ApiResponse<FacilitiesData>, FacilitiesData>({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/facilities/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    uploadFile: builder.mutation<ApiResponse<FileMetadataResponse>, FormData>({
      query: (payload) => ({
        url: "/files/upload/simple",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useUpdateFacilityMutation,
  useUploadFileMutation,
} = facilityApi;
