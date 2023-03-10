import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useGetExternalSystemsQuery } from "store/externalSystems/externalSystems.api";
import { resetParams } from "store/table/requestParamsTable.slice";

import Panel from "components/Panel";
import List from "components/List";

import GeneralForm from "./GeneralForm";
import Logs from "./Logs";
import Metrics from "./Metrics";

import { MESSAGES_COLUMNS } from "constants/columns";
import Filter from "components/Filter";
import withAlert from "components/HOC/withAlert";

export const PATH = "/external_systems";

const VISIBLE_FILTER = ["logs", "metrics"];

const EXTERNAL_SYSTEMS_GROUP = [
  { id: "general", label: "Общее" },
  { id: "logs", label: "Логи" },
  { id: "metrics", label: "Метрики" },
  { id: "system", label: "Система" },
];

const ExternalSystemsWidget = ({ isCreate, onOpenAlert }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { serviceId, tabKey } = useParams();

  const filterParams = useSelector(
    (state) => state.requestParamsTable.filterParams
  );
  const requestParamsList = useSelector((state) => state.requestParamsList);

  const { data = {}, isFetching } = useGetExternalSystemsQuery(requestParamsList);

  React.useEffect(() => {
    dispatch(resetParams());
  }, [dispatch, tabKey]);

  const onAdd = () => {
    history.push(`${PATH}/create`);
  };

  const handleClickItem = (id) => {
    const newTabKey = tabKey ?? "general";
    history.push(`${PATH}/${id}/${newTabKey}`);
    dispatch(resetParams());
  };

  const handleChangePagination = () => {
    history.push(PATH);
  };

  const renderTab = () => {
    switch (tabKey) {
      case "general":
        const externalSystems = data?.entries || [];
        const currentExternalSystem = externalSystems.find(
          (item) => item.id === Number(serviceId)
        );
        return (
          <GeneralForm
            id={serviceId}
            initialValues={currentExternalSystem}
            path={PATH}
            onOpenAlert={onOpenAlert}
            isEdit
          />
        );
      case "logs":
        return (
          <Logs serviceId={serviceId} columns={MESSAGES_COLUMNS[tabKey]} />
        );
      case "metrics":
        return (
          <Metrics serviceId={serviceId} columns={MESSAGES_COLUMNS[tabKey]} />
        );
      case "system":
        return "В разработке";
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isCreate) {
      return <GeneralForm path={PATH} onOpenAlert={onOpenAlert} />;
    }
    if (serviceId) {
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
                {EXTERNAL_SYSTEMS_GROUP.map((item) => (
                  <ToggleButton
                    key={item.id}
                    value={item.id}
                    component={NavLink}
                    to={`${PATH}/${serviceId}/${item.id}`}
                    sx={{ width: 150 }}
                  >
                    {item.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            {VISIBLE_FILTER.includes(tabKey) ? (
              <Box component="div">
                <Filter
                  filterParams={filterParams}
                  fields={MESSAGES_COLUMNS[tabKey]}
                />
              </Box>
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
              data={data?.entries}
              loading={isFetching}
              onClick={handleClickItem}
              subheader="Внешние системы"
              activeItem={serviceId}
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
    </>
  );
};

export default withAlert(ExternalSystemsWidget);
