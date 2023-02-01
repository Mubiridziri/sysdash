import * as types from "./types";

export const loadExternalSystems = (values) => ({
  type: types.LOAD_EXTERNAL_SYSTEMS,
  payload: values,
});

export const createExternalSystem = (values, meta) => ({
  type: types.CREATE_EXTERNAL_SYSTEM,
  payload: values,
  meta,
});

export const updateExternalSystem = (id, values, meta) => ({
  type: types.UPDATE_EXTERNAL_SYSTEM,
  payload: { values, id },
  meta,
});
