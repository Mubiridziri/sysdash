import React from "react";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  useCreateExternalSystemMutation,
  useUpdateExternalSystemMutation,
} from "store/externalSystems/externalSystems.api";

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
import Card from "components/Card";
import CardTitle from "components/Card/CardTitle";
import InputTextArea from "components/FormFields/InputTextArea";
import ContainerGeneralForm from "./ContainerGeneralForm";

import { formatOnlyNumber } from "helpers/formatField";
import { parseNumber } from "helpers/parse";
import { required } from "helpers/formValidators";

import {
  SUCCESS_SAVE_MESSAGE,
  SUCCESS_COPY_MESSAGE,
} from "constants/alertMessages";

const GeneralForm = ({ id, isEdit, initialValues, onOpenAlert, path }) => {
  const history = useHistory();

  const [createExternalSystem, { data = {}, isLoading: isLoadingCreate }] =
    useCreateExternalSystemMutation();
  const [updateExternalSystem, { isLoading: isLoadingUpdate }] =
    useUpdateExternalSystemMutation();

  const onSubmit = async (values) => {
    if (isEdit) {
      await updateExternalSystem({ id, values })
        .unwrap()
        .then(() => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
        })
        .catch(() => {});
    } else {
      await createExternalSystem(values)
        .unwrap()
        .then(() => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
          history.push(`${path}/${data.id}/general`);
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
            <LoadingBlock isLoading={isLoadingCreate || isLoadingUpdate}>
              <ContainerGeneralForm isEdit={Boolean(id)}>
                <Card>
                  <CardTitle title="Информация" />
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
                      <InputTextArea
                        input={input}
                        meta={meta}
                        variant="outlined"
                        size="small"
                        fullWidth
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
                </Card>
                <Card>
                  <CardTitle title="Архивирование" />
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
                </Card>
                {Boolean(id) ? (
                  <Card sxCard={{ mb: 0 }}>
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
                              mb: 0,
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
                  </Card>
                ) : null}
              </ContainerGeneralForm>
            </LoadingBlock>
            <StackButton>
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
