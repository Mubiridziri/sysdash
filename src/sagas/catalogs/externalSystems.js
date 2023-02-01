import { call } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/catalogs/externalSystems";

export function* loadExternalSystems({ type, payload }) {
  const loadExternalSystems = yield call(services.loadExternalSystems, payload);
  if (loadExternalSystems && !loadExternalSystems.error) {
    yield dispatchSuccess(type, loadExternalSystems);
  } else yield dispatchFailed(type);
}
