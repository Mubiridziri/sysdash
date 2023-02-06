import { call, select, put } from "redux-saga/effects";

import { dispatchSuccess, dispatchFailed } from "actions";
import * as services from "services/classifiers";
import { TEXT_ERROR } from "constants/errors";

export function* loadClassifiers({ type, payload }) {
  const classifiers = yield call(services.loadClassifiers, payload);
  if (classifiers && !classifiers.error) {
    yield dispatchSuccess(type, classifiers);
  } else yield dispatchFailed(type);
}

export function* createClassifier({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const createdClassifier = yield call(services.createClassifier, payload);

  if (Object.keys(createdClassifier).length && !createdClassifier.error) {
    yield dispatchSuccess(type, createdClassifier);
    resolve({ classifierId: createdClassifier.id });
  } else {
    yield dispatchFailed(type);
    reject(createdClassifier.error ? createdClassifier.error : TEXT_ERROR);
  }
}

export function* updateClassifier({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const updatedClassifier = yield call(services.updateClassifier, payload);
  if (Object.keys(updatedClassifier).length && !updatedClassifier.error) {
    yield dispatchSuccess(type, updatedClassifier);
    resolve();
  } else {
    yield dispatchFailed(type);
    reject(updatedClassifier.error ? updatedClassifier.error : TEXT_ERROR);
  }
}

export function* deleteClassifier({ type, payload }) {
  const deletedClassifier = yield call(services.deleteClassifier, payload);
  if (deletedClassifier.ok && !deletedClassifier.error) {
    yield dispatchSuccess(type, payload);
  } else {
    yield dispatchFailed(type, deletedClassifier.error);
  }
}

export function* loadClassifierData({ type, payload }) {
  const classifierData = yield call(services.loadClassifierData, payload);
  if (classifierData && !classifierData.error) {
    yield dispatchSuccess(type, classifierData);
  } else yield dispatchFailed(type);
}

export function* createClassifierData({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const createdClassifierData = yield call(
    services.createClassifierData,
    payload
  );

  if (
    Object.keys(createdClassifierData).length &&
    !createdClassifierData.error
  ) {
    resolve();
  } else {
    yield dispatchFailed(type);
    reject(
      createdClassifierData.error ? createdClassifierData.error : TEXT_ERROR
    );
  }
}

export function* updateClassifierData({
  type,
  payload,
  meta: { resolve, reject },
}) {
  const updatedClassifierData = yield call(
    services.updateClassifierData,
    payload
  );
  if (
    Object.keys(updatedClassifierData).length &&
    !updatedClassifierData.error
  ) {
    yield dispatchSuccess(type, updatedClassifierData);
    resolve();
  } else {
    yield dispatchFailed(type);
    reject(
      updatedClassifierData.error ? updatedClassifierData.error : TEXT_ERROR
    );
  }
}

export function* deleteClassifierData({ type, payload }) {
  const deletedClassifierData = yield call(
    services.deleteClassifierData,
    payload
  );
  if (deletedClassifierData.ok && !deletedClassifierData.error) {
    yield dispatchSuccess(type, payload);
  } else {
    yield dispatchFailed(type, deletedClassifierData.error);
  }
}
