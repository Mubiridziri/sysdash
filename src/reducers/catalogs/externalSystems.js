import { isLoaded } from "actions";
import { LOAD_EXTERNAL_SYSTEMS } from "actions/catalogs/externalSystems/types";

const initialState = { entries: [], total: 0, loading: false };

const externalSystems = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_EXTERNAL_SYSTEMS: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_EXTERNAL_SYSTEMS, true): {
      const newState = {
        ...state,
        total: payload.total,
        entries: payload.entries,
        loading: false,
      };
      return newState;
    }
    case isLoaded(LOAD_EXTERNAL_SYSTEMS, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default externalSystems;
