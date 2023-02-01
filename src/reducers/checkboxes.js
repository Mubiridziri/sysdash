import { SET_CHECKED_CHECKBOXES } from "actions/checkboxes/types";

const initialState = {
  entries: {},
};

const checkedCheckboxes = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHECKED_CHECKBOXES: {
      const newState = { ...state, entries: payload };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default checkedCheckboxes;
