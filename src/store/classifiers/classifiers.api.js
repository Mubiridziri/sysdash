import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  renderProvidesTags,
  renderCreateInvalidatesTags,
  renderUpdateInvalidatesTags,
  renderDeleteInvalidatesTags,
} from "helpers/createApi";
import { getRequestParamsApi } from "helpers/requestParams";

const TAG_TYPE = "Classifiers";
const URL = "/api/v1/classifiers";

export const classifiersApi = createApi({
  reducerPath: "classifiers/api",
  tagTypes: [TAG_TYPE],
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getClassifiers: build.query({
      query: (params) => ({
        url: URL,
        params: getRequestParamsApi(params),
      }),
      providesTags: (result) => renderProvidesTags(result, TAG_TYPE),
    }),
    createClassifier: build.mutation({
      query: (values) => ({
        url: URL,
        method: "POST",
        body: values,
      }),
      invalidatesTags: () => renderCreateInvalidatesTags(TAG_TYPE),
    }),
    updateClassifier: build.mutation({
      query: ({ id, values }) => ({
        url: `${URL}/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: (result, error, arg) =>
        renderUpdateInvalidatesTags(arg, TAG_TYPE),
    }),
    deleteClassifier: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => renderDeleteInvalidatesTags(TAG_TYPE),
    }),
  }),
});

export const {
  useGetClassifiersQuery,
  useCreateClassifierMutation,
  useUpdateClassifierMutation,
  useDeleteClassifierMutation,
} = classifiersApi;
