import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  renderProvidesTags,
  renderCreateInvalidatesTags,
  renderUpdateInvalidatesTags,
} from "helpers/createApi";
import { getRequestParamsApi } from "helpers/requestParams";
import { BASE_URL } from "constants/baseUrl";

const TAG_TYPE = "ClassifierData";
const URL = "api/v1/classifiers/data";

export const classifierDataApi = createApi({
  reducerPath: "classifierData/api",
  tagTypes: [TAG_TYPE],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getClassifierData: build.query({
      query: ({ classifierId, params }) => ({
        url: `${URL}/${classifierId}`,
        params: getRequestParamsApi(params),
      }),
      providesTags: (result) => renderProvidesTags(result, TAG_TYPE),
    }),
    createClassifierData: build.mutation({
      query: ({ classifierId, values }) => ({
        url: `${URL}/${classifierId}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: () => renderCreateInvalidatesTags(TAG_TYPE),
    }),
    updateClassifierData: build.mutation({
      query: ({ id, values }) => ({
        url: `${URL}/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: (result, error, arg) =>
        renderUpdateInvalidatesTags(arg, TAG_TYPE),
    }),
    deleteClassifierData: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => renderCreateInvalidatesTags(TAG_TYPE),
    }),
  }),
});

export const {
  useGetClassifierDataQuery,
  useCreateClassifierDataMutation,
  useUpdateClassifierDataMutation,
  useDeleteClassifierDataMutation,
} = classifierDataApi;
