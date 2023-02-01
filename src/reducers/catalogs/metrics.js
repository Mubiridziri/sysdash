import { isLoaded } from "actions";
import { LOAD_METRICS } from "actions/catalogs/metrics/types";

const initialState = { entries: [], total: 0, loading: false };

const metrics = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_METRICS: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_METRICS, true): {
      const newState = {
        ...state,
        total: payload.total,
        entries: payload.entries,
        loading: false,
      };
      return newState;
    }
    case isLoaded(LOAD_METRICS, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default metrics;
