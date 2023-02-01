import { OPEN_MODAL, CLOSE_MODAL } from "actions/modals/types";
import { MODAL_STATE } from "components/Modal";

const initialState = {};

const modals = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL: {
      const { modalName, modalState } = payload;
      if (payload.data) {
        return {
          ...state,
          [modalName]: modalState || MODAL_STATE.OPENED,
          data: payload.data,
        };
      }
      return {
        ...state,
        [modalName]: modalState || MODAL_STATE.OPENED,
      };
    }
    case CLOSE_MODAL: {
      const { modalName } = payload;
      return {
        ...state,
        [modalName]: MODAL_STATE.CLOSED,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default modals;
