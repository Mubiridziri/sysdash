import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FORM_ERROR } from "final-form";
import { Field, Form } from "react-final-form";
import { Box, Card, CardContent } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Input from "components/FormFields/Input";
import LoadingButton from "components/LoagingButton";
import Button from "components/Button";
import StackButton from "components/StackButton";
import FormHelperText from "components/FormHelperText";
import LoadingBlock from "components/LoadingBlock";
import withAlert from "components/HOC/withAlert";
import InputLabel from "components/InputLabel";
import InputLabelWithHelp from "components/InputLabelWithHelp";
import Icon from "components/Icon";

import { formatOnlyNumber } from "helpers/formatField";
import { parseNumber } from "helpers/parse";
import { required } from "helpers/formValidators";

import {
  SUCCESS_SAVE_MESSAGE,
  SUCCESS_COPY_MESSAGE,
} from "constants/alertMessages";

const GeneralForm = ({
  id,
  isEdit,
  loading,
  initialValues,
  createAction,
  updateAction,
  onOpenAlert,
  path,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    if (isEdit) {
      return new Promise((resolve) => {
        dispatch(
          updateAction(id, values, {
            resolve: () => {
              resolve();
              onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
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
          resolve: ({ serviceId }) => {
            resolve();
            onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
            history.push(`${path}/${serviceId}`);
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
                  maxHeight: `calc(100vh - ${id ? 234 : 172}px)`,
                  overflow: "auto",
                  padding: "10px",
                }}
              >
                <Card
                  sx={{
                    mb: 1,
                    borderRadius: 4,
                  }}
                >
                  <CardContent>
                    <Box component="div" sx={{ mb: 1, fontWeight: 700 }}>
                      Информация
                    </Box>
                    <InputLabel label="Наименование" />
                    <Field name="title" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      )}
                    </Field>
                    <InputLabel label="Описание" />
                    <Field name="description" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          sx={{
                            "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                              p: "13.5px 10px !important",
                            },
                            "& .MuiInputBase-input.MuiInputBase-inputSizeSmall":
                              {
                                p: "0 0 10px 0 !important",
                              },
                          }}
                        />
                      )}
                    </Field>
                    <InputLabelWithHelp
                      label="Адрес"
                      iconName="help"
                      tooltipTitle="Укажите адрес сервера, на котором находится эта внешняя система."
                    />
                    <Field name="address" validate={required}>
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ mb: 0 }}
                        />
                      )}
                    </Field>
                  </CardContent>
                </Card>
                <Card sx={{ mb: 1, borderRadius: 4 }}>
                  <CardContent>
                    <Box component="div" sx={{ mb: 1, fontWeight: 700 }}>
                      Архивирование
                    </Box>
                    <InputLabel label="Период архивирования (дн)" />

                    <Field
                      name="archivingPeriod"
                      format={formatOnlyNumber}
                      parse={parseNumber}
                      validate={required}
                    >
                      {({ input, meta }) => (
                        <Input
                          input={input}
                          meta={meta}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ mb: 0 }}
                        />
                      )}
                    </Field>
                  </CardContent>
                </Card>
                {id ? (
                  <Card sx={{ borderRadius: 4 }}>
                    <CardContent>
                      <InputLabel label="Токен" />
                      <Field name="token">
                        {({ input, meta }) => (
                          <CopyToClipboard
                            text={initialValues?.token ?? ""}
                            onCopy={() => {
                              onOpenAlert("success", SUCCESS_COPY_MESSAGE);
                            }}
                          >
                            <Input
                              input={input}
                              meta={meta}
                              variant="outlined"
                              size="small"
                              fullWidth
                              InputProps={{
                                disabled: true,
                                endAdornment: <Icon name="copy" />,
                              }}
                              sx={{
                                input: { cursor: "pointer" },
                                "& .MuiInputBase-adornedEnd.MuiInputBase-sizeSmall:hover":
                                  {
                                    background: (theme) =>
                                      theme.palette.success.light,
                                  },
                              }}
                            />
                          </CopyToClipboard>
                        )}
                      </Field>
                    </CardContent>
                  </Card>
                ) : null}
              </Box>
            </LoadingBlock>
            <StackButton>
              <>
                <LoadingButton
                  disabled={pristine || !validSaveBtn}
                  loading={submitting}
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="small"
                >
                  Применить
                </LoadingButton>
                <Button
                  disabled={pristine || submitting}
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
  initialValues: {},
  isEdit: false,
};

export default withAlert(GeneralForm);
