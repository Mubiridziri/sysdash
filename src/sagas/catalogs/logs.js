import { call } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/catalogs/logs";

export function* loadLogs({ type, payload }) {
  const loadLogs = yield call(services.loadLogs, payload);
  if (loadLogs && !loadLogs.error) {
    yield dispatchSuccess(type, loadLogs);
  } else yield dispatchFailed(type);
}
