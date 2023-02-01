import { isLoaded } from "actions";
import { LOAD_LOGS } from "actions/catalogs/logs/types";

const initialState = { entries: [], total: 0, loading: false };

const logs = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_LOGS: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_LOGS, true): {
      const newState = {
        ...state,
        total: payload.total,
        entries: payload.entries,
        loading: false,
      };
      return newState;
    }
    case isLoaded(LOAD_LOGS, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default logs;
