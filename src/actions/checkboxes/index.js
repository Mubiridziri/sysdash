import * as types from "./types";

export const setCheckedCheckboxes = (values) => ({
  type: types.SET_CHECKED_CHECKBOXES,
  payload: values,
});
