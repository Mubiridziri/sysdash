import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRequestParamsApi } from "helpers/requestParams";

const URL = "/api/v1/metrics";

export const metricsApi = createApi({
  reducerPath: "metrics/api",
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getMetrics: build.query({
      query: ({ serviceId, params }) => ({
        url: `${URL}/${serviceId}`,
        params: getRequestParamsApi(params),
      }),
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
