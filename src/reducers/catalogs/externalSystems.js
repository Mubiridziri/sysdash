import { isLoaded } from "actions";
import {
  LOAD_EXTERNAL_SYSTEMS,
  CREATE_EXTERNAL_SYSTEM,
  UPDATE_EXTERNAL_SYSTEM,
} from "actions/catalogs/externalSystems/types";

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
    case CREATE_EXTERNAL_SYSTEM: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(CREATE_EXTERNAL_SYSTEM, true): {
      const createdExternalSystem = payload;
      const newState = {
        ...state,
        total: state.total + 1,
        entries: [createdExternalSystem, ...state.entries],
        loading: false,
      };
      return newState;
    }
    case isLoaded(CREATE_EXTERNAL_SYSTEM, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case UPDATE_EXTERNAL_SYSTEM: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(UPDATE_EXTERNAL_SYSTEM, true): {
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === payload.id ? payload : entry
        ),
        loading: false,
      };
    }
    case isLoaded(UPDATE_EXTERNAL_SYSTEM, false): {
      const newState = { ...state, loading: false };
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default externalSystems;
