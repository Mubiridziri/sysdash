import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "store/modal/modal.slice";

import Modal, { MODAL_STATE } from "components/Modal";
import Form from "components/Form";

import { getTitleModal } from "helpers/modal";
import withAlert from "components/HOC/withAlert";

const FormModal = ({ modalName, ...props }) => {
  const dispatch = useDispatch();

  const isView = useSelector(
    (state) => state.modal[modalName] === MODAL_STATE.IS_VIEW
  );
  const isEdit = useSelector(
    (state) => state.modal[modalName] === MODAL_STATE.IS_EDIT
  );
  const data = useSelector((state) => state.modal.data);

  const handleClose = useCallback(
    () => dispatch(closeModal({ modalName })),
    [dispatch, modalName]
  );

  return (
    <Modal modalName={modalName} title={getTitleModal(isView, isEdit)}>
      <Form
        id={data?.id}
        initialValues={data?.initialValues}
        isView={isView}
        isEdit={isEdit}
        onSuccess={handleClose}
        {...props}
      />
    </Modal>
  );
};

export default withAlert(FormModal);
