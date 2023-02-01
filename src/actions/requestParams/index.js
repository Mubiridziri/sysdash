import * as types from "./types";

export const setPagination = (values) => ({
  type: types.SET_PAGINATION,
  payload: values,
});

export const setPaginationTreeTable = (values) => ({
  type: types.SET_PAGINATION_TREE_TABLE,
  payload: values,
});

export const setFilter = (values) => ({
  type: types.SET_FILTER,
  payload: values,
});

export const setSort = (values) => ({
  type: types.SET_SORT,
  payload: values,
});

export const setSearch = (values) => ({
  type: types.SET_SEARCH,
  payload: values,
});

export const setGroup = (values) => ({
  type: types.SET_GROUP,
  payload: values,
});

export const resetParams = () => ({
  type: types.RESET_PARAMS,
});
