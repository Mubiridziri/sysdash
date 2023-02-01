import * as types from "./types";

export const openModal = (modalName, modalState, data) => ({
  type: types.OPEN_MODAL,
  payload: { modalName, modalState, data },
});

export const closeModal = (modalName) => ({
  type: types.CLOSE_MODAL,
  payload: { modalName },
});
