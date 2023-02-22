import React from "react";
import { Field, Form } from "react-final-form";
import { Box } from "@mui/material";

import Input from "components/FormFields/Input";
import LoadingButton from "components/LoagingButton";
import Button from "components/Button";
import StackButton from "components/StackButton";
import FormHelperText from "components/FormHelperText";
import AsyncSelect from "components/FormFields/AsyncSelect";
import DatepickerReactFinalForm from "components/FormFields/Datepicker/DatepickerReactFinalForm";
import Select from "components/FormFields/Select";

import { parseNumber } from "helpers/parse";
import { getFieldProps } from "helpers/form";
import { SUCCESS_SAVE_MESSAGE } from "constants/alertMessages";
import { STYLE_CONTENT_FORM } from "constants/styles";
import { formatOnlyNumber } from "helpers/formatField";

const DefaultForm = ({
  id,
  isView,
  isEdit,
  initialValues,
  createAction,
  updateAction,
  onSuccess,
  fields,
  onOpenAlert,
}) => {
  const onSubmit = async (values) => {
    if (isEdit) {
      await updateAction({ id, values })
        .unwrap()
        .then(() => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
          onSuccess();
        })
        .catch(() => {});
    } else {
      await createAction(values)
        .unwrap()
        .then(() => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
          onSuccess();
        })
        .catch(() => {});
    }
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
            <Box component="div" sx={STYLE_CONTENT_FORM}>
              {fields.map(({ id, label, field = {} }) => {
                const fieldProps = getFieldProps(field);
                switch (field.type) {
                  case "asyncselect":
                    return (
                      <Field key={id} name={id} {...fieldProps}>
                        {({ input, meta }) => (
                          <AsyncSelect
                            input={input}
                            meta={meta}
                            label={label}
                            loadOptions={field.loadOptions}
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
                        format={formatOnlyNumber}
                        {...field}
                      >
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            component={Input}
                            label={label}
                            variant="outlined"
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
                      <Field key={id} name={id} {...fieldProps}>
                        {({ input, meta }) => (
                          <DatepickerReactFinalForm
                            type={field.type}
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
                      <Field key={id} name={id} {...fieldProps}>
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            label={label}
                            variant="outlined"
                            fullWidth
                            options={field.options}
                            disabled={isView}
                          />
                        )}
                      </Field>
                    );
                  default:
                    return (
                      <Field key={id} name={id} {...fieldProps}>
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
            {!isView ? (
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
            ) : null}
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
  initialValues: {},
  isView: false,
  isEdit: false,
  readOnly: false,
};

export default DefaultForm;
