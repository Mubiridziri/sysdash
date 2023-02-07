import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRequestParamsApi } from "helpers/requestParams";

const URL = "/api/v1/logs";

export const logsApi = createApi({
  reducerPath: "logs/api",
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getLogs: build.query({
      query: ({ serviceId, params }) => ({
        url: `${URL}/${serviceId}`,
        params: getRequestParamsApi(params),
      }),
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;
