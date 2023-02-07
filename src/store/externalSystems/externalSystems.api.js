import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  renderProvidesTags,
  renderCreateInvalidatesTags,
  renderUpdateInvalidatesTags,
} from "helpers/createApi";
import { getRequestParamsApi } from "helpers/requestParams";
import { BASE_URL } from "constants/baseUrl";

const TAG_TYPE = "ExternalSystems";
const URL = "/api/v1/services";

export const externalSystemsApi = createApi({
  reducerPath: "externalSystems/api",
  tagTypes: [TAG_TYPE],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getExternalSystems: build.query({
      query: (params) => ({
        url: URL,
        params: getRequestParamsApi(params),
      }),
      providesTags: (result) => renderProvidesTags(result, TAG_TYPE),
    }),
    createExternalSystem: build.mutation({
      query: (values) => ({
        url: URL,
        method: "POST",
        body: values,
      }),
      invalidatesTags: () => renderCreateInvalidatesTags(TAG_TYPE),
    }),
    updateExternalSystem: build.mutation({
      query: ({ id, values }) => ({
        url: `${URL}/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: (result, error, arg) =>
        renderUpdateInvalidatesTags(arg, TAG_TYPE),
    }),
  }),
});

export const {
  useGetExternalSystemsQuery,
  useCreateExternalSystemMutation,
  useUpdateExternalSystemMutation,
} = externalSystemsApi;
