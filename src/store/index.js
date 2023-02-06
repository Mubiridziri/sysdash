import { configureStore } from "@reduxjs/toolkit";

// slice
import modalReducer from "./modal/modal.slice";
import requestParamsTableReducer from "./table/requestParamsTable.slice";
import requestParamsListReducer from "./list/requestParamsList.slice";
import checkboxesTableReducer from "./table/checkboxesTable.slice";

// api
import { externalSystemsApi } from "./externalSystems/externalSystems.api";
import { logsApi } from "./externalSystems/logs.api";
import { metricsApi } from "./externalSystems/metrics.api";
import { classifiersApi } from "./classifiers/classifiers.api";
import { classifierDataApi } from "./classifiers/classifierData.api";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    requestParamsTable: requestParamsTableReducer,
    requestParamsList: requestParamsListReducer,
    checkboxesTable: checkboxesTableReducer,
    [externalSystemsApi.reducerPath]: externalSystemsApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [classifiersApi.reducerPath]: classifiersApi.reducer,
    [classifierDataApi.reducerPath]: classifierDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      externalSystemsApi.middleware,
      logsApi.middleware,
      metricsApi.middleware,
      classifiersApi.middleware,
      classifierDataApi.middleware
    ),
});
