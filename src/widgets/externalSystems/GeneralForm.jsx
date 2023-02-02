import React from "react";
import { useDispatch } from "react-redux";
import { FORM_ERROR } from "final-form";
import { Field, Form } from "react-final-form";
import { Box, Card, CardContent, InputLabel } from "@mui/material";

import Input from "components/FormFields/Input";
import LoadingButton from "components/LoagingButton";
import Button from "components/Button";
import StackButton from "components/StackButton";
import FormHelperText from "components/FormHelperText";
import LoadingBlock from "components/LoadingBlock";
import { required } from "helpers/formValidators";

const GeneralForm = ({
  id,
  isView,
  isEdit,
  loading,
  initialValues,
  createAction,
  updateAction,
  onSuccess,
  onEdit,
  readOnly,
}) => {
  const dispatch = useDispatch();

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
              <Box
                component="div"
                sx={{
                  maxHeight: `calc(100vh - ${id ? 234 : 170}px)`,
                  overflow: "auto",
                  padding: "10px",
                }}
              >
                <Card raised sx={{ mb: 1, borderRadius: 4 }}>
                  <CardContent>
                    <Box component="div" sx={{ mb: 1, fontWeight: 700 }}>
                      Информация
                    </Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      Наименование
                    </InputLabel>
                    <Field name="title" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            disabled: isView,
                          }}
                        />
                      )}
                    </Field>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      Описание
                    </InputLabel>
                    <Field name="description" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            disabled: isView,
                          }}
                        />
                      )}
                    </Field>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      Адрес
                    </InputLabel>
                    <Field name="address" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            disabled: isView,
                          }}
                          sx={{ mb: 0 }}
                        />
                      )}
                    </Field>
                  </CardContent>
                </Card>
                <Card raised sx={{ mb: 1, borderRadius: 4 }}>
                  <CardContent>
                    <Box component="div" sx={{ mb: 1, fontWeight: 700 }}>
                      Архивирование
                    </Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      {"Период архивирования (дн)"}
                    </InputLabel>
                    <Field name="archivingPeriod" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            disabled: isView,
                          }}
                          sx={{ mb: 0 }}
                        />
                      )}
                    </Field>
                  </CardContent>
                </Card>
                <Card raised sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: 18,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      Токен
                    </InputLabel>
                    <Field name="token">
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            disabled: true,
                          }}
                          sx={{ mb: 0 }}
                        />
                      )}
                    </Field>
                  </CardContent>
                </Card>
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

GeneralForm.defaultProps = {
  fields: [],
  onSuccess: () => {},
  initialValues: {},
  isView: false,
  isEdit: false,
  readOnly: false,
};

export default GeneralForm;
