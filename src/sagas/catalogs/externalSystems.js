import { call } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/catalogs/externalSystems";
import { TEXT_ERROR } from "constants/errors";

export function* loadExternalSystems({ type, payload }) {
  const loadExternalSystems = yield call(services.loadExternalSystems, payload);
  if (loadExternalSystems && !loadExternalSystems.error) {
    yield dispatchSuccess(type, loadExternalSystems);
  } else yield dispatchFailed(type);
}

export function* createExternalSystem({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const createdExternalSystem = yield call(
    services.createExternalSystem,
    payload
  );

  if (
    Object.keys(createdExternalSystem).length &&
    !createdExternalSystem.error
  ) {
    yield dispatchSuccess(type, createdExternalSystem);
    resolve();
  } else {
    yield dispatchFailed(type);
    reject(
      createdExternalSystem.error ? createdExternalSystem.error : TEXT_ERROR
    );
  }
}

export function* updateExternalSystem({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const updatedExternalSystem = yield call(
    services.updateExternalSystem,
    payload
  );
  if (
    Object.keys(updatedExternalSystem).length &&
    !updatedExternalSystem.error
  ) {
    yield dispatchSuccess(type, updatedExternalSystem);
    resolve();
  } else {
    yield dispatchFailed(type);
    reject(
      updatedExternalSystem.error ? updatedExternalSystem.error : TEXT_ERROR
    );
  }
}
