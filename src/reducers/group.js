import { isLoaded } from "actions";
import { LOAD_GROUP_DATA, LOAD_GROUP_ENTRY_DATA } from "actions/group/types";

const initialState = {
  total: 0,
  entries: [],
  loading: false,
  entryTotal: 0,
  entry: [],
  entryLoading: false,
};

const group = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_GROUP_DATA: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_GROUP_DATA, true): {
      const newState = {
        ...state,
        loading: false,
        total: payload.total,
        entries: payload.entries,
      };
      return newState;
    }
    case isLoaded(LOAD_GROUP_DATA, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case LOAD_GROUP_ENTRY_DATA: {
      const newState = { ...state, entryLoading: true };
      return newState;
    }
    case isLoaded(LOAD_GROUP_ENTRY_DATA, true): {
      const newState = {
        ...state,
        entryLoading: false,
        entryTotal: payload.total,
        entry: payload.entries,
      };
      return newState;
    }
    case isLoaded(LOAD_GROUP_ENTRY_DATA, false): {
      const newState = { ...state, entryLoading: false };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default group;
