/* import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
 */

import { configureStore } from "@reduxjs/toolkit";

// slice
import modalReducer from "./modal/modal.slice";
import requestParamsTableReducer from "./requestParamsTable/requestParamsTable.slice";

// api
import { externalSystemsApi } from "./externalSystems/externalSystems.api";
import { logsApi } from "./externalSystems/logs.api";
import { metricsApi } from "./externalSystems/metrics.api";
import { classifiersApi } from "./classifiers/classifiers.api";
import { classifierDataApi } from "./classifiers/classifierData.api";

export const store = configureStore({
  reducer: {
    requestParamsTable: requestParamsTableReducer,
    modal: modalReducer,
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
