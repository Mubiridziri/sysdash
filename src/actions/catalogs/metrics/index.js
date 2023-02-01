import * as types from "./types";

export const loadMetrics = (id, values) => ({
  type: types.LOAD_METRICS,
  payload: { id, values },
});
