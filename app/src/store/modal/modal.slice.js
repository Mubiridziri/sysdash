import { createSlice } from "@reduxjs/toolkit";
import { MODAL_STATE } from "components/Modal";

const initialState = {};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalName, modalState, data } = action.payload;
      if (data) {
        state[modalName] = modalState || MODAL_STATE.OPENED;
        state.data = data;
      } else {
        state[modalName] = modalState || MODAL_STATE.OPENED;
      }
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = MODAL_STATE.CLOSED;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
