import * as types from "./types";

export const loadDrivers = (values) => ({
  type: types.LOAD_DRIVERS,
  payload: values,
});
