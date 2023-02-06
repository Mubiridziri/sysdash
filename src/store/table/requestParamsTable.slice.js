import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginationParams: { page: 1, limit: 10 },
  filterParams: {},
  sortParams: {},
};

export const requestParamsTable = createSlice({
  name: "requestParamsTable",
  initialState,
  reducers: {
    setPaginationParams: (state, action) => {
      state.paginationParams = action.payload;
    },
    setFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
    setSortParams: (state, action) => {
      state.sortParams = action.payload;
    },
    resetParams: (state) => {
      state = initialState;
    },
  },
});

export const {
  setPaginationParams,
  setFilterParams,
  setSortParams,
  resetParams,
} = requestParamsTable.actions;

export default requestParamsTable.reducer;
