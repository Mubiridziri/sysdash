import { isLoaded } from "actions";
import {
  LOAD_CLASSIFIERS,
  CREATE_CLASSIFIER,
  UPDATE_CLASSIFIER,
  DELETE_CLASSIFIER,
  LOAD_CLASSIFIER_DATA,
} from "actions/classifiers/types";

const initialState = {
  entries: [],
  total: 0,
  loading: false,
  classifierData: {
    entries: [],
    total: 0,
    loading: false,
  },
};

const classifiers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_CLASSIFIERS: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(LOAD_CLASSIFIERS, true): {
      const newState = {
        ...state,
        total: payload.total,
        entries: payload.entries,
        loading: false,
      };
      return newState;
    }
    case isLoaded(LOAD_CLASSIFIERS, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case CREATE_CLASSIFIER: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(CREATE_CLASSIFIER, true): {
      const createdClassifier = payload;
      const newState = {
        ...state,
        total: state.total + 1,
        entries: [createdClassifier, ...state.entries],
        loading: false,
      };
      return newState;
    }
    case isLoaded(CREATE_CLASSIFIER, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case UPDATE_CLASSIFIER: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(UPDATE_CLASSIFIER, true): {
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === payload.id ? payload : entry
        ),
        loading: false,
      };
    }
    case isLoaded(UPDATE_CLASSIFIER, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case DELETE_CLASSIFIER: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case isLoaded(DELETE_CLASSIFIER, true): {
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== payload),
        total: state.total - 1,
        loading: false,
      };
    }
    case isLoaded(DELETE_CLASSIFIER, false): {
      const newState = { ...state, loading: false };
      return newState;
    }
    case LOAD_CLASSIFIER_DATA: {
      const newState = {
        ...state,
        classifiersData: {
          ...state.classifierData,
          loading: true,
        },
      };
      return newState;
    }
    case isLoaded(LOAD_CLASSIFIER_DATA, true): {
      const newState = {
        ...state,
        classifierData: {
          ...state.classifierData,
          total: payload.total,
          entries: payload.entries,
        },
      };
      return newState;
    }
    case isLoaded(LOAD_CLASSIFIER_DATA, false): {
      const newState = {
        ...state,
        classifiersData: {
          ...state.classifierData,
          loading: false,
        },
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default classifiers;
