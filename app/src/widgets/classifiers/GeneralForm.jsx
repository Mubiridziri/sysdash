import React from "react";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";

import {
  useCreateClassifierMutation,
  useUpdateClassifierMutation,
  useDeleteClassifierMutation,
} from "store/classifiers/classifiers.api";

import Input from "components/FormFields/Input";
import LoadingButton from "components/LoagingButton";
import Button from "components/Button";
import StackButton from "components/StackButton";
import FormHelperText from "components/FormHelperText";
import LoadingBlock from "components/LoadingBlock";
import InputLabel from "components/InputLabel";
import Card from "components/Card";
import CardTitle from "components/Card/CardTitle";
import ContainerGeneralForm from "./ContainerGeneralForm";

import {
  SUCCESS_SAVE_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
} from "constants/alertMessages";

import { required } from "helpers/formValidators";

const GeneralForm = ({
  id,
  path,
  isEdit,
  initialValues,
  onOpenAlert,
  onOpenDeleteDialog,
}) => {
  const history = useHistory();

  const [createClassifier, { isLoading: isLoadingCreate }] =
    useCreateClassifierMutation();
  const [updateClassifier, { isLoading: isLoadingUpdate }] =
    useUpdateClassifierMutation();
  const [deleteClassifier] = useDeleteClassifierMutation();

  const onSubmit = async (values) => {
    if (isEdit) {
      await updateClassifier({ id, values })
        .unwrap()
        .then(() => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
        })
        .catch(() => {});
    } else {
      await createClassifier(values)
        .unwrap()
        .then((data) => {
          onOpenAlert("success", SUCCESS_SAVE_MESSAGE);
          history.push(`${path}/${data.id}/general`);
        })
        .catch(() => {});
    }
  };

  const onDelete = () => {
    onOpenDeleteDialog(
      async () =>
        await deleteClassifier(id)
          .unwrap()
          .then(() => {
            onOpenAlert("success", SUCCESS_DELETE_MESSAGE);
            history.push(path);
          })
          .catch(() => {})
    );
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
                <Card sxCard={{ mb: 0 }}>
                  <CardTitle title="Информация" />
                  <InputLabel label="Наименование" />
                  <Field name="name" validate={required}>
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
              {isEdit ? (
                <Button
                  disabled={submitting}
                  variant="outlined"
                  size="small"
                  onClick={onDelete}
                  color="inherit"
                >
                  Удалить
                </Button>
              ) : null}
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

export default GeneralForm;
