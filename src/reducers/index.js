import { combineReducers } from "redux";

import modals from "./modals";
import requestParams from "./requestParams";
import checkedCheckboxes from "./checkboxes";
import group from "./group";
import externalSystems from "./catalogs/externalSystems";
import logs from "./catalogs/logs";
import metrics from "./catalogs/metrics";

const appReducer = combineReducers({
  modals,
  externalSystems,
  logs,
  metrics,
  requestParams,
  checkedCheckboxes,
  group,
});

export default appReducer;
