import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { openModal } from "store/modal/modal.slice";
import {
  useGetClassifierDataQuery,
  useDeleteClassifierDataMutation,
} from "store/classifiers/classifierData.api";

import ServerSideTable from "components/Table/ServerSideTable";
import { MODAL_STATE } from "components/Modal";
import withDeleteDialog from "components/HOC/withDeleteDialog";

const Data = ({ classifierId, columns, onOpenDeleteDialog }) => {
  const dispatch = useDispatch();
  const requestParamsTable = useSelector((state) => state.requestParamsTable);

  const { data = {}, isLoading } = useGetClassifierDataQuery({
    classifierId,
    params: requestParamsTable,
  });

  const [deleteClassifierData] = useDeleteClassifierDataMutation();

  const onView = (id) => {
    openModalClassifierData(id, MODAL_STATE.IS_VIEW);
  };
  const onEdit = (id) => {
    openModalClassifierData(id, MODAL_STATE.IS_EDIT);
  };

  const openModalClassifierData = (id, modalState) => {
    const initialValues = data.entries.find((item) => item.id === id);
    dispatch(
      openModal({
        modalName: "classifier-data",
        modalState,
        data: { id, initialValues },
      })
    );
  };

  const onDelete = (id) => {
    onOpenDeleteDialog(() => dispatch(deleteClassifierData(id)));
  };

  return (
    <>
      <ServerSideTable
        total={data?.total}
        columns={columns}
        data={data?.entries}
        loading={isLoading}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default withDeleteDialog(Data);
