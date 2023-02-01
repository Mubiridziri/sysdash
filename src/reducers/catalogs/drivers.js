import { isLoaded } from "actions";
import { LOAD_DRIVERS } from "actions/catalogs/drivers/types";

const initialState = { entries: [], total: 0, loading: false };

const drivers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_DRIVERS: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_DRIVERS, true): {
      const newState = {
        ...state,
        total: payload.total,
        entries: payload.entries,
        loading: false,
      };
      return newState;
    }
    case isLoaded(LOAD_DRIVERS, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default drivers;
