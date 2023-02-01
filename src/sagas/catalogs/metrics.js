import { call } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/catalogs/metrics";

export function* loadMetrics({ type, payload }) {
  const loadMetrics = yield call(services.loadMetrics, payload);
  if (loadMetrics && !loadMetrics.error) {
    yield dispatchSuccess(type, loadMetrics);
  } else yield dispatchFailed(type);
}
