import * as types from "./types";

export const loadExternalSystems = (values) => ({
  type: types.LOAD_EXTERNAL_SYSTEMS,
  payload: values,
});
