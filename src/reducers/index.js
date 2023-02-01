import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import modals from "./modals";
import requestParams from "./requestParams";
import checkedCheckboxes from "./checkboxes";
import group from "./group";
import externalSystems from "./catalogs/externalSystems";

const appReducer = combineReducers({
  form,
  modals,
  externalSystems,
  requestParams,
  checkedCheckboxes,
  group,
});

export default appReducer;
