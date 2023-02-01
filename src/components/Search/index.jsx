import React from "react";
import { reduxForm, Field } from "redux-form";
import { Stack } from "@mui/material";

import Button from "components/Button";
import LoadingButton from "components/LoagingButton";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "actions/requestParams";
import InputSearch from "components/FormFields/InputSearch";

const Search = ({
  loadData,
  disabled,
  handleSubmit,
  submitting,
  pristine,
  reset,
}) => {
  const dispatch = useDispatch();

  const requestParams = useSelector((state) => state.requestParams);

  const { paginationParams, filterParams, sortParams, searchParams } =
    requestParams;

  const onSubmit = (values) => {
    dispatch(setSearch({}));
    const newSearchValues = { ...values, search: values.search.trim() };
    dispatch(
      loadData({
        ...paginationParams,
        ...sortParams,
        ...newSearchValues,
        ...filterParams,
      })
    );
    dispatch(setSearch(newSearchValues));
  };

  const onReset = () => {
    reset();
    if (Object.keys(searchParams).length) {
      dispatch(
        loadData({ ...paginationParams, ...sortParams, ...filterParams })
      );
      dispatch(setSearch({}));
    }
  };

  const disabledResetButton = () => {
    if (Object.keys(searchParams).length) {
      return false;
    }
    return pristine || submitting;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <Field
          name="search"
          component={InputSearch}
          variant="outlined"
          sx={{ m: 0 }}
          disabled={disabled}
        />
        <LoadingButton
          disabled={pristine}
          loading={submitting}
          variant="contained"
          type="submit"
          color="primary"
          size="small"
        >
          Применить
        </LoadingButton>
        <Button
          disabled={disabledResetButton()}
          variant="outlined"
          size="small"
          color="inherit"
          onClick={onReset}
        >
          Сброс
        </Button>
      </Stack>
    </form>
  );
};

export default reduxForm({
  form: "search-form",
  onSubmit: () => {},
})(Search);
