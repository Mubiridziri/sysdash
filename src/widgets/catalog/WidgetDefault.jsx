import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openModal } from "actions/modals";

import { MODAL_STATE } from "components/Modal";

import WidgetContent from "widgets/catalog/WidgetContent";
import WidgetDefaultFormModal from "widgets/catalog/WidgetDefaultFormModal";

import { INITIAL_VALUES_STATE_PAGE } from "constants/request";

const WidgetDefault = ({
  widgetKey,
  widgetTitle,
  reducerKey,
  modalName,
  columns,
  fields,
  url,
  loadData,
  createAction,
  updateAction,
  deleteAction,
  loadFetchDataById,
  renderInitialValuesForm,
  readOnly,
  withExport,
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state[reducerKey]);

  useEffect(() => {
    dispatch(loadData(INITIAL_VALUES_STATE_PAGE));
  }, [dispatch, loadData]);

  const onAdd = () => {
    dispatch(openModal(modalName, MODAL_STATE.OPENED));
  };

  const onView = (id) => {
    dispatch(openModal(modalName, MODAL_STATE.IS_VIEW, id));
  };
  const onEdit = (id) => {
    dispatch(openModal(modalName, MODAL_STATE.IS_EDIT, id));
  };
  const onDelete = (id) => {
    dispatch(deleteAction(id));
  };

  return (
    <>
      <WidgetContent
        widgetKey={widgetKey}
        columns={columns}
        data={data}
        onAdd={onAdd}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        title={widgetTitle}
        loadData={loadData}
        url={url}
        withExport={withExport}
        readOnly={readOnly}
      />
      <WidgetDefaultFormModal
        modalName={modalName}
        fields={fields.length ? fields : columns}
        createAction={createAction}
        updateAction={updateAction}
        loadFetchDataById={loadFetchDataById}
        renderInitialValuesForm={renderInitialValuesForm}
        onEdit={onEdit}
        readOnly={readOnly}
      />
    </>
  );
};

WidgetDefault.defaultProps = {
  columns: [],
  fields: [],
  withExport: true,
};

export default WidgetDefault;
