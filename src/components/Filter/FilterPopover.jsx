import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { Popover, Box, Typography } from "@mui/material";

import Icon from "components/Icon";
import Button from "components/Button";
import LoadingButton from "components/LoagingButton";
import Input from "components/FormFields/Input";
import AsyncSelect from "components/FormFields/AsyncSelect";
import Select from "components/FormFields/Select";
import { DATE_RANGE } from "constants/filter";
import { parseNumber } from "helpers/parse";
import DatepickerReactFinalForm from "components/FormFields/Datepicker/DatepickerReactFinalForm";
import { isValidDate } from "helpers/formValidators";
import { setFilterParams } from "store/requestParamsTable/requestParamsTable.slice";

const FilterPopover = ({ fields, open, loadData, loadId, onClose }) => {
  const dispatch = useDispatch();
  const filterParams = useSelector(
    (state) => state.requestParamsTable.filterParams
  );

  const id = Boolean(open) ? "simple-popover" : undefined;

  const onSubmit = (values) => {
    dispatch(setFilterParams(values));
  };

  const onReset = (form) => {
    form.reset();
    if (Object.keys(filterParams).length) {
      dispatch(setFilterParams({}));
    }
  };

  const disabledResetButton = (pristine) => {
    if (Object.keys(filterParams).length) {
      return false;
    }
    return pristine;
  };

  return (
    <Popover
      id={id}
      open={Boolean(open)}
      anchorEl={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: 300,
          padding: "5px 10px 10px 10px",
        },
      }}
    >
      <Form initialValues={filterParams} onSubmit={onSubmit}>
        {({ handleSubmit, submitting, pristine, valid, form }) => {
          return (
            <>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: "5px",
                }}
              >
                <Typography>Фильтры</Typography>
                <Button
                  onClick={() => onReset(form)}
                  disabled={disabledResetButton(pristine)}
                >
                  Сбросить
                </Button>
              </Box>
              <form onSubmit={handleSubmit}>
                <Box
                  component="div"
                  sx={{
                    maxHeight: "calc(100vh - 350px)",
                    overflow: "auto",
                    padding: "7px",
                    "& > div:not(:last-child)": {
                      marginBottom: "20px",
                    },
                    "& > div:last-child": {
                      marginBottom: 0,
                    },
                  }}
                >
                  {fields.map((field) => {
                    switch (field?.filter?.type) {
                      case "asyncselect":
                        return (
                          <Field key={field.id} name={field.id}>
                            {({ input, meta }) => (
                              <AsyncSelect
                                input={input}
                                meta={meta}
                                label={field.label}
                                loadOptions={field.filter.loadOptions}
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{ mb: 0 }}
                                InputProps={{
                                  startAdornment: (
                                    <Icon
                                      name="search"
                                      color="action"
                                      fontSize="small"
                                      sx={{ width: 14, height: 14 }}
                                    />
                                  ),
                                }}
                              />
                            )}
                          </Field>
                        );
                      case "date":
                      case "datetime":
                      case "time":
                        return (
                          <>
                            {Object.keys(DATE_RANGE).map((key) => {
                              return (
                                <Field
                                  key={`${field.id}_${key}`}
                                  name={`${field.id}.${key}`}
                                  validate={isValidDate}
                                >
                                  {({ input, meta }) => (
                                    <DatepickerReactFinalForm
                                      type={field?.filter?.type}
                                      input={input}
                                      meta={meta}
                                      label={`${field.label} (${DATE_RANGE[key]})`}
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                    />
                                  )}
                                </Field>
                              );
                            })}
                          </>
                        );
                      case "select":
                        return (
                          <Field key={field.id} name={field.id}>
                            {({ input, meta }) => (
                              <Select
                                input={input}
                                meta={meta}
                                label={field.label}
                                variant="outlined"
                                fullWidth
                                size="small"
                                options={field.filter.options}
                                icon={
                                  <Icon
                                    name="search"
                                    color="action"
                                    fontSize="small"
                                    sx={{ width: 14, height: 14 }}
                                  />
                                }
                              />
                            )}
                          </Field>
                        );
                      case "number":
                        return (
                          <Field
                            key={field.id}
                            name={field.id}
                            parse={parseNumber}
                          >
                            {({ input, meta }) => (
                              <Input
                                input={input}
                                meta={meta}
                                component={Input}
                                label={field.label}
                                variant="outlined"
                                type="number"
                                size="small"
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                    <Icon
                                      name="search"
                                      color="action"
                                      fontSize="small"
                                      sx={{ width: 14, height: 14 }}
                                    />
                                  ),
                                }}
                              />
                            )}
                          </Field>
                        );
                      default:
                        return (
                          <Field key={field.id} name={field.id}>
                            {({ input, meta }) => (
                              <Input
                                input={input}
                                meta={meta}
                                label={field.label}
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                    <Icon
                                      name="search"
                                      color="action"
                                      fontSize="small"
                                      sx={{ width: 14, height: 14 }}
                                    />
                                  ),
                                }}
                              />
                            )}
                          </Field>
                        );
                    }
                  })}
                </Box>
                <Box component="div" sx={{ pt: "10px" }}>
                  <LoadingButton
                    disabled={pristine || !valid}
                    loading={submitting}
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="small"
                  >
                    Применить
                  </LoadingButton>
                </Box>
              </form>
            </>
          );
        }}
      </Form>
    </Popover>
  );
};

export default FilterPopover;
