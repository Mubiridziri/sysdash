import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginationParams: { page: 1, limit: 25 },
};

export const requestParamsList = createSlice({
  name: "requestParamsList",
  initialState,
  reducers: {
    setPaginationParams: (state, action) => {
      state.paginationParams = action.payload;
    },
    resetParams: (state) => {
      state = initialState;
    },
  },
});

export const { setPaginationParams, resetParams } = requestParamsList.actions;

export default requestParamsList.reducer;
