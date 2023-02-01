import * as types from "./types";

export const loadLogs = (id, values) => ({
  type: types.LOAD_LOGS,
  payload: { id, values },
});
