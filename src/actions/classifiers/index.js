import * as types from "./types";

export const loadClassifiers = (values) => ({
  type: types.LOAD_CLASSIFIERS,
  payload: values,
});

export const createClassifier = (values, meta) => ({
  type: types.CREATE_CLASSIFIER,
  payload: values,
  meta,
});

export const updateClassifier = (id, values, meta) => ({
  type: types.UPDATE_CLASSIFIER,
  payload: { id, values },
  meta,
});

export const deleteClassifier = (id) => ({
  type: types.DELETE_CLASSIFIER,
  payload: id,
});

export const loadClassifierData = (values) => ({
  type: types.LOAD_CLASSIFIER_DATA,
  payload: values,
});

export const createClassifierData = (classifierId, values, meta) => ({
  type: types.CREATE_CLASSIFIER_DATA,
  payload: { classifierId, values },
  meta,
});

export const updateClassifierData = (classifierDataId, values, meta) => ({
  type: types.UPDATE_CLASSIFIER_DATA,
  payload: { classifierDataId, values },
  meta,
});

export const deleteClassifierData = (classifierDataId) => ({
  type: types.DELETE_CLASSIFIER_DATA,
  payload: classifierDataId,
});
