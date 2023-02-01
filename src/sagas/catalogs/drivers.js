import { call } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/catalogs/drivers";

export function* loadDrivers({ type, payload }) {
  const drivers = yield call(services.loadDrivers, payload);
  if (drivers && !drivers.error) {
    yield dispatchSuccess(type, drivers);
  } else yield dispatchFailed(type);
}
