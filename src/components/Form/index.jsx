import React from "react";
import { useDispatch } from "react-redux";
import { FORM_ERROR } from "final-form";
import { Field, Form } from "react-final-form";
import { Box } from "@mui/material";

import Input from "components/FormFields/Input";
import LoadingButton from "components/LoagingButton";
import Button from "components/Button";
import StackButton from "components/StackButton";
import FormHelperText from "components/FormHelperText";
import { STYLE_CONTENT_FORM } from "constants/styles";
import LoadingBlock from "components/LoadingBlock";
import AsyncSelect from "components/FormFields/AsyncSelect";
import { parseNumber } from "helpers/parse";
import DatepickerReactFinalForm from "components/FormFields/Datepicker/DatepickerReactFinalForm";
import Select from "components/FormFields/Select";

const DefaultForm = ({
  id,
  isView,
  isEdit,
  loadFetchDataById,
  initialValuesForm,
  renderInitialValuesForm,
  createAction,
  updateAction,
  onSuccess,
  onEdit,
  fields,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = React.useState(initialValuesForm);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (id && !initialValuesForm) fetchInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialValues = async () => {
    try {
      setLoading(true);
      const response = await loadFetchDataById(id);
      if (response.error) throw response;
      if (renderInitialValuesForm) {
        setInitialValues(renderInitialValuesForm(response));
      } else {
        setInitialValues(response);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values) => {
    if (isEdit) {
      return new Promise((resolve) => {
        dispatch(
          updateAction(id, values, {
            resolve: () => {
              resolve();
              onSuccess();
            },
            reject: (error) => {
              resolve({ [FORM_ERROR]: error });
            },
          })
        );
      });
    }
    return new Promise((resolve) => {
      dispatch(
        createAction(values, {
          resolve: () => {
            resolve();
            onSuccess();
          },
          reject: (error) => {
            resolve({ [FORM_ERROR]: error });
          },
        })
      );
    });
  };

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({
        handleSubmit,
        submitting,
        pristine,
        valid,
        form,
        submitError,
        dirtySinceLastSubmit,
      }) => {
        const validSaveBtn = valid || dirtySinceLastSubmit;
        return (
          <form onSubmit={handleSubmit}>
            <LoadingBlock isLoading={loading}>
              <Box component="div" sx={STYLE_CONTENT_FORM}>
                {fields.map(({ id, label, filter, ...field }) => {
                  switch (filter?.type) {
                    case "asyncselect":
                      return (
                        <Field key={id} name={id} {...field}>
                          {({ input, meta }) => (
                            <AsyncSelect
                              input={input}
                              meta={meta}
                              label={label}
                              loadOptions={filter.loadOptions}
                              variant="outlined"
                              fullWidth
                              disabled={isView}
                            />
                          )}
                        </Field>
                      );
                    case "number":
                      return (
                        <Field
                          name={id}
                          key={id}
                          parse={parseNumber}
                          {...field}
                        >
                          {({ input, meta }) => (
                            <Input
                              input={input}
                              meta={meta}
                              component={Input}
                              label={label}
                              variant="outlined"
                              type="number"
                              InputProps={{
                                disabled: isView,
                              }}
                              fullWidth
                            />
                          )}
                        </Field>
                      );
                    case "date":
                    case "datetime":
                    case "time":
                      return (
                        <Field key={id} name={id} validate={field.validate}>
                          {({ input, meta }) => (
                            <DatepickerReactFinalForm
                              type={filter?.type}
                              input={input}
                              meta={meta}
                              label={label}
                              variant="outlined"
                              fullWidth
                              disabled={isView}
                            />
                          )}
                        </Field>
                      );
                    case "select":
                      return (
                        <Field key={id} name={id} {...field}>
                          {({ input, meta }) => (
                            <Select
                              input={input}
                              meta={meta}
                              label={label}
                              variant="outlined"
                              fullWidth
                              options={filter.options}
                              disabled={isView}
                            />
                          )}
                        </Field>
                      );
                    default:
                      return (
                        <Field key={id} name={id} {...field}>
                          {({ input, meta }) => (
                            <Input
                              input={input}
                              meta={meta}
                              label={label}
                              variant="outlined"
                              fullWidth
                              InputProps={{
                                disabled: isView,
                              }}
                            />
                          )}
                        </Field>
                      );
                  }
                })}
              </Box>
            </LoadingBlock>
            <StackButton>
              <>
                <LoadingButton
                  disabled={pristine || !validSaveBtn || isView}
                  loading={submitting}
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="small"
                >
                  Применить
                </LoadingButton>
                <Button
                  disabled={isView || pristine || submitting}
                  variant="outlined"
                  size="small"
                  onClick={form.reset}
                  color="inherit"
                >
                  Сброс
                </Button>
              </>
            </StackButton>
            {submitError && !dirtySinceLastSubmit && (
              <FormHelperText error={submitError} />
            )}
          </form>
        );
      }}
    </Form>
  );
};

DefaultForm.defaultProps = {
  fields: [],
  onSuccess: () => {},
  initialValuesForm: {},
  isView: false,
  isEdit: false,
  readOnly: false,
};

export default DefaultForm;
