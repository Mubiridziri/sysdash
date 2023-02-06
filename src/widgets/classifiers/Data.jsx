import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { openModal } from "store/modal/modal.slice";
import { useGetClassifierDataQuery } from "store/classifiers/classifierData.api";

import ServerSideTable from "components/Table/ServerSideTable";
import { MODAL_STATE } from "components/Modal";
import FormModal from "components/FormModal";
import { CLASSIFIER_DATA_COLUMNS } from "constants/columns";

const Data = ({ classifierId, columns }) => {
  const dispatch = useDispatch();
  const requestParamsTable = useSelector((state) => state.requestParamsTable);

  const { data = {}, isLoading } = useGetClassifierDataQuery({
    classifierId,
    params: requestParamsTable,
  });

  const onView = (id) => {
    dispatch(
      openModal({
        modalName: "classifier-data",
        modalState: MODAL_STATE.IS_VIEW,
        data: id,
      })
    );
  };
  const onEdit = (id) => {
    console.log('id', id)
    const initialValues = data.entries.find((item) => item.id === id);
    dispatch(
      openModal({
        modalName: "classifier-data",
        modalState: MODAL_STATE.IS_EDIT,
        data: { id, initialValues },
      })
    );
  };
  /* const onDeleteClassifierData = (id) => {
    dispatch(deleteAction(id));
  }; */

  return (
    <>
      <ServerSideTable
        total={data?.total}
        columns={columns}
        data={data?.entries}
        loading={isLoading}
        onView={onView}
        onEdit={onEdit}
      />
    </>
  );
};

export default Data;
