import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: {},
};

export const checkboxesTable = createSlice({
  name: "checkboxesTable",
  initialState,
  reducers: {
    setCheckedCheckboxes: (state, action) => {
      state.entries = action.payload;
    },
  },
});

export const { setCheckedCheckboxes } = checkboxesTable.actions;

export default checkboxesTable.reducer;
