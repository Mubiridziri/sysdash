import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { resetParams } from "store/requestParamsTable/requestParamsTable.slice";
import { useGetClassifiersQuery } from "store/classifiers/classifiers.api";
import {
  useCreateClassifierDataMutation,
  useUpdateClassifierDataMutation,
} from "store/classifiers/classifierData.api";

import Panel from "components/Panel";
import List from "components/List";
import FilterPopover from "components/Filter/FilterPopover";

import { LIGHT_THEME } from "constants/themes";
import { CLASSIFIER_DATA_COLUMNS, MESSAGES_COLUMNS } from "constants/columns";
import Filter from "components/Filter";
import GeneralForm from "./GeneralForm";
import Data from "./Data";
import IconButton from "components/IconButton";
import { MODAL_STATE } from "components/Modal";
import { openModal } from "store/modal/modal.slice";
import FormModal from "components/FormModal";
import withAlert from "components/HOC/withAlert";

export const PATH = "/classifiers";

const VISIBLE_FILTER = ["data"];

const CLASSIFIERS_GROUP = [
  { id: "general", label: "Общее" },
  { id: "data", label: "Данные" },
];

const ClassifiersWidget = ({ isCreate, onOpenAlert }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { classifierId, tabKey } = useParams();

  const filterParams = useSelector(
    (state) => state.requestParamsTable.filterParams
  );

  const { data = {}, isLoading } = useGetClassifiersQuery();
  const [createClassifierData] = useCreateClassifierDataMutation();
  const [updateClassifierData] = useUpdateClassifierDataMutation();

  React.useEffect(() => {
    dispatch(resetParams());
  }, [dispatch, tabKey]);

  const onAdd = () => {
    history.push(`${PATH}/create`);
  };

  const onAddClassifierData = () => {
    dispatch(
      openModal({
        modalName: "classifier-data",
        modalState: MODAL_STATE.OPENED,
      })
    );
  };

  console.log("tabKey", tabKey);

  const handleClickItem = (id) => {
    const newTabKey = tabKey ?? "general";
    history.push(`${PATH}/${id}/${newTabKey}`);
    dispatch(resetParams());
  };

  const handleChangePagination = () => {
    history.push(PATH);
  };

  const renderData = (values = []) => {
    return values.map((item) => ({
      ...item,
      title: item.name,
    }));
  };

  const renderTab = () => {
    switch (tabKey) {
      case "general":
        const classifiers = data?.entries || [];
        const currentClassifier = classifiers.find(
          (item) => item.id === Number(classifierId)
        );
        return (
          <GeneralForm
            id={classifierId}
            initialValues={currentClassifier}
            path={PATH}
            onOpenAlert={onOpenAlert}
            isEdit
          />
        );
      case "data":
        return (
          <Data classifierId={classifierId} columns={CLASSIFIER_DATA_COLUMNS} />
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isCreate) {
      return <GeneralForm path={PATH} onOpenAlert={onOpenAlert} />;
    }
    if (classifierId) {
      return (
        <>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <ToggleButtonGroup
                color="primary"
                value={tabKey}
                exclusive
                aria-label="externalSystems"
              >
                {CLASSIFIERS_GROUP.map((item) => (
                  <ToggleButton
                    key={item.id}
                    value={item.id}
                    component={NavLink}
                    to={`${PATH}/${classifierId}/${item.id}`}
                    sx={{ width: 150 }}
                  >
                    {item.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            {VISIBLE_FILTER.includes(tabKey) ? (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  height: "38px",
                  borderRadius: "7px",
                  bgcolor: (theme) =>
                    theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#333333",
                }}
              >
                <IconButton
                  name="add"
                  title="Создать"
                  color="secondary"
                  size="small"
                  onClick={onAddClassifierData}
                />
                <Filter
                  fields={CLASSIFIER_DATA_COLUMNS}
                  filterParams={filterParams}
                />
              </Stack>
            ) : null}
          </Box>
          {renderTab()}
        </>
      );
    }
    return <Box component="div">Выберите систему</Box>;
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Box
          component="div"
          sx={{ flex: "0 0 30%", maxHeight: "100%", overflow: "hidden" }}
        >
          <Panel>
            <List
              total={data?.total}
              data={renderData(data?.entries)}
              loading={isLoading}
              onClick={handleClickItem}
              subheader="Классификаторы"
              activeItem={classifierId}
              onAdd={onAdd}
              disabledAddButton={Boolean(isCreate)}
              handleChangePagination={handleChangePagination}
            />
          </Panel>
        </Box>
        <Box
          component="div"
          sx={{
            flex: "1 0 calc(100% - 30% - 16px)",
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          <Panel>{renderContent()}</Panel>
        </Box>
      </Stack>
      <FormModal
        modalName="classifier-data"
        fields={CLASSIFIER_DATA_COLUMNS}
        createAction={(values) =>
          createClassifierData({ classifierId, values })
        }
        updateAction={updateClassifierData}
      />
    </>
  );
};

export default withAlert(ClassifiersWidget);
