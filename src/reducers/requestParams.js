import {
  SET_PAGINATION,
  SET_PAGINATION_TREE_TABLE,
  SET_FILTER,
  SET_SORT,
  RESET_PARAMS,
  SET_SEARCH,
  SET_GROUP,
} from "actions/requestParams/types";

const initialState = {
  paginationParams: { page: 1, limit: 10 },
  paginationParamsTreeTable: { page: 1, limit: 100 },
  filterParams: {},
  sortParams: {},
  searchParams: {},
  groupParams: {},
};

const requestParams = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAGINATION: {
      const newState = { ...state, paginationParams: payload };
      return newState;
    }
    case SET_PAGINATION_TREE_TABLE: {
      const newState = { ...state, paginationParamsTreeTable: payload };
      return newState;
    }
    case SET_FILTER: {
      const newState = { ...state, filterParams: payload };
      return newState;
    }
    case SET_SORT: {
      const newState = { ...state, sortParams: payload };
      return newState;
    }
    case SET_SEARCH: {
      const newState = { ...state, searchParams: payload };
      return newState;
    }
    case SET_GROUP: {
      const newState = { ...state, groupParams: payload };
      return newState;
    }
    case RESET_PARAMS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default requestParams;
