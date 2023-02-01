import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import modals from "./modals";
import requestParams from "./requestParams";
import checkedCheckboxes from "./checkboxes";
import group from "./group";
import drivers from "./catalogs/drivers";

const appReducer = combineReducers({
  form,
  modals,
  drivers,
  requestParams,
  checkedCheckboxes,
  group,
});

export default appReducer;
