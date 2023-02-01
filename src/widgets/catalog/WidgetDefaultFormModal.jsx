import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "actions/modals";

import Modal, { MODAL_STATE } from "components/Modal";
import DefaultForm from "components/Form";

import { getTitleModal } from "helpers/modal";

const WidgetDefaultFormModal = ({
  modalName,
  fields,
  createAction,
  updateAction,
  loadFetchDataById,
  renderInitialValuesForm,
  initialValuesForm,
  onEdit,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const isView = useSelector(
    (state) => state.modals[modalName] === MODAL_STATE.IS_VIEW
  );
  const isEdit = useSelector(
    (state) => state.modals[modalName] === MODAL_STATE.IS_EDIT
  );
  const data = useSelector((state) => state.modals.data);

  const handleClose = useCallback(
    () => dispatch(closeModal(modalName)),
    [dispatch, modalName]
  );

  return (
    <Modal modalName={modalName} title={getTitleModal(isView, isEdit)}>
      <DefaultForm
        id={data?.id}
        fields={fields}
        onEdit={onEdit}
        isView={isView}
        isEdit={isEdit}
        readOnly={readOnly}
        createAction={createAction}
        updateAction={updateAction}
        loadFetchDataById={loadFetchDataById}
        initialValuesForm={data?.initialValues}
        renderInitialValuesForm={renderInitialValuesForm}
        onSuccess={handleClose}
      />
    </Modal>
  );
};

export default WidgetDefaultFormModal;
